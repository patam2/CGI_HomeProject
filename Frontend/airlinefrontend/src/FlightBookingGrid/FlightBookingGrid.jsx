import { useState, useEffect} from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";

import SeatLegend from "./SeatingLegend";

import { checkForSeatSuitability } from "./utils/seatUtils";
import { SeatGrid } from "./SeatGrid";
import { TicketInfo } from "./TicketInfo";
function isSublistInNestedArray(sublist, nestedArray) {
    return nestedArray.some(arr => 
      arr.length === sublist.length && 
      arr.every((val, index) => val === sublist[index])
    );
}



export default function FlightBookGrid({ flightData, requirements, flightPrice, flightId, changeRequirements}) {
    const [seatsSuggested, setSuggestedSeats] = useState(Array())
    const [activeSeat, setActiveSeat] = useState(Array())
    const isManualChange = useRef(false)

    const navigate = useNavigate()


    


    const suggestseats = () => {
        console.log('suggestseatscalled')
        setSuggestedSeats([]);
        
        if (!flightData) {
            return;
        }
        
        var newSuggestedSeats = [];
        
        for (let x = 0; x < requirements.ticketCount; x++) {
            seatSearch:
            for (let i = 0; i < flightData.length; i++) {
                for (let j = 0; j < flightData[i].length; j++) {
                    if (checkForSeatSuitability(flightData[i][j], false, requirements) && 
                        !isSublistInNestedArray([i, j], newSuggestedSeats)) {
                            newSuggestedSeats.push([i, j]);
                            if (!requirements.sitTogether){
                                break seatSearch
                            }
                    }
                }
            }
        }

        if (requirements.ticketCount > newSuggestedSeats.length) {
            //Piletisoov suurem kui kriteeriale vastavaid pileteid, otsime uuesti, aga seekord lihtsalt tühjasid istmeid.
            for (let x = 0; x < requirements.ticketCount-newSuggestedSeats.length; x++) {
                seatSearch:
                for (let i = 0; i < flightData.length; i++) {
                    for (let j = 0; j < flightData[i].length; j++) {
                        if (checkForSeatSuitability(flightData[i][j], true, requirements) && 
                            !isSublistInNestedArray([i, j], newSuggestedSeats)) {
                                newSuggestedSeats.push([i, j]);
                                if (requirements.ticketCount === newSuggestedSeats.length) {
                                    break seatSearch
                                }
                        }
                    }
                }
            }

        }

        var longest_streak = [0,-1] 
        var current_streak = [0,0]
        var last_obje = newSuggestedSeats[0]

        for (let i = 1; i < newSuggestedSeats.length; i ++) {
            var obje = newSuggestedSeats[i]
            if (obje[1] === last_obje[1] + 1 && obje[0] == obje[0]) {
                current_streak = [current_streak[0], current_streak[1]+1]
            }
            else {
                current_streak = [i,1]
            }
            if (longest_streak[1] < current_streak[1]) {
                longest_streak = current_streak
            }
            last_obje = obje
        } 
        if (longest_streak[1] >= requirements.ticketCount) {
            newSuggestedSeats = newSuggestedSeats.slice(longest_streak[0], longest_streak[0] + requirements.ticketCount)
        }
        else {
            newSuggestedSeats = newSuggestedSeats.slice(0, requirements.ticketCount)
        }
        setSuggestedSeats(newSuggestedSeats);
        setActiveSeat(newSuggestedSeats[newSuggestedSeats.length-1])
    };

    useEffect(() => {
            if (!isManualChange.current) {
                suggestseats()
            }
            
            isManualChange.current = false;
    
        },[flightData, requirements] 
    )

    const removeSuggestedSeat = (coordinates) => {
        isManualChange.current = true
        const newSuggestedSeats = seatsSuggested.filter(seat => 
            !(seat[0] === coordinates[0] && seat[1] === coordinates[1])
        );
        
        setSuggestedSeats(newSuggestedSeats);
        
        if (activeSeat[0] === coordinates[0] && activeSeat[1] === coordinates[1]) {
            if (newSuggestedSeats.length > 0) {
                setActiveSeat(newSuggestedSeats[newSuggestedSeats.length - 1]);
            } else {
                setActiveSeat([]);
            }
        }
        
        changeRequirements("ticketCount", requirements.ticketCount - 1);
    }
    
    

    const filterForSuggestedSeats = (arr) => {
        console.log(arr, seatsSuggested)
        if (isSublistInNestedArray(arr, seatsSuggested)) {
            setActiveSeat(arr)
        }
        else {
            console.log("aaa", flightData[arr[0]][arr[1]])
            if (checkForSeatSuitability(flightData[arr[0]][arr[1]], true, requirements)) {
                const newSuggestedSeats = [...seatsSuggested]
                for (let selectedSeat = 0; selectedSeat < newSuggestedSeats.length; selectedSeat ++) {
                    console.log(arr,newSuggestedSeats[selectedSeat])
                    if (activeSeat[0] == newSuggestedSeats[selectedSeat][0] && activeSeat[1] == newSuggestedSeats[selectedSeat][1]) {
                        newSuggestedSeats.splice(selectedSeat, 1);
                        break
                    }
                }
                newSuggestedSeats.push(arr)

                setSuggestedSeats(newSuggestedSeats)
                setActiveSeat(newSuggestedSeats[newSuggestedSeats.length-1])

            }
        }
    }

    const ATicketInfo = () => {
        const ticketDivs = [];
        const tix = []
        const ticketCoordinates = []
        if (seatsSuggested.length === 0 || requirements.ticketCount !== seatsSuggested.length) {
            return <></>
        }
        for (let i = 0; i < seatsSuggested.length; i++) {
            ticketCoordinates.push(seatsSuggested[i])
            tix.push(flightData[seatsSuggested[i][0]][seatsSuggested[i][1]])
        }
        tix.sort((a, b) => a.seatNumber - b.seatNumber)
        for (let j = 0; j < tix.length; j++) {
            ticketDivs.push(
                <div className="w-100 m-2 p-2 border rounded d-flex justify-content-between">
                    <span>Pilet #{j+1}, istekoht nr. {tix[j].seatNumber}
                         {tix[j].closeToExit ? <><br></br><b>Väljapääsu real</b></> : <></>}
                         {tix[j].legRoom === "Extra" ? <><br></br><b>Ekstra jalaruum</b></>: <></>}</span>
                    <button type="button" class="btn-close" onClick={(e) => removeSuggestedSeat(ticketCoordinates[j])} aria-label="Close"></button>
                </div>
            )
        }
        if (ticketDivs.length > 0) {
            ticketDivs.push(
                <div className="w-100 m-2 p-2 border rounded d-flex justify-content-between align-middle">
                    <span className="my-auto">Kokku valitud <b>{requirements.ticketCount}</b> piletit, <b>{requirements.ticketCount * flightPrice}€</b>.</span>
                    <button onClick={() => bookSeats(flightId, tix.map(seat => seat.seatNumber))} className="btn button border rounded">Kinnitan kohad</button>
                </div>                
            )
        }
        return (<>{ticketDivs}</> )
    }

    return (
        <div className="row">
            <div className="col-xl-8">
                <SeatGrid flightData={flightData} 
                        filterForSuggestedSeats={filterForSuggestedSeats} 
                        seatsSuggested={seatsSuggested}
                        activeSeat={activeSeat}
                ></SeatGrid>    
            
                <SeatLegend/>
        </div>
        <div className="col-xl-4">
            <TicketInfo
                seatsSuggested={seatsSuggested}
                requirements={requirements}
                flightData={flightData}
                removeSuggestedSeat={removeSuggestedSeat}
                flightPrice={flightPrice}
                flightId={flightId}
             />
         </div>
    </div>
    );}
    