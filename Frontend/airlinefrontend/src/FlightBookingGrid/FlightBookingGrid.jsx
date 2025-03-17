import { useState, useEffect, useRef} from "react";

import { SeatGrid } from "./SeatGrid";
import { SeatLegend } from "./SeatingLegend";
import { TicketInfo } from "./TicketInfo";

import { suggestSeats } from "./utils/seatSuggestion";
import { isSublistInNestedArray, checkForSeatSuitability } from "./utils/seatUtils";


export default function FlightBookGrid({ flightData, requirements, flightPrice, flightId, changeRequirements}) {
    const [seatsSuggested, setSuggestedSeats] = useState(Array())
    const [activeSeat, setActiveSeat] = useState(Array())
    const isManualChange = useRef(false)


    useEffect(() => {
            if (!isManualChange.current && flightData.length > 0) {
                suggestSeats(
                    setSuggestedSeats,
                    flightData,
                    requirements,
                    setActiveSeat
                )
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
    
    
    //kontrollime, kas istet saab aktiivseks teha või uuele kohale viia
    const filterForSuggestedSeats = (arr) => {
        console.log(arr, seatsSuggested)
        //iste on juba "valitud", teeme lihtsalt aktiivseks
        if (isSublistInNestedArray(arr, seatsSuggested)) {
            setActiveSeat(arr)
        }
        else {
            //tõstame ringi ja kustutame vana ära
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
    