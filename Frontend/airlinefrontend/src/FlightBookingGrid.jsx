import { useState, useEffect } from "react"


function isSublistInNestedArray(sublist, nestedArray) {
    return nestedArray.some(arr => 
      arr.length === sublist.length && 
      arr.every((val, index) => val === sublist[index])
    );
}


export default function FlightBookGrid({ flightData, requirements}) {
    const [seatsSuggested, setSuggestedSeats] = useState(Array())
    const [activeSeat, setActiveSeat] = useState(Array())
    const checkForSeatSuitability = (seat) => {
        if (seat.isTaken) {
            return false
        }
        else {
            if (seat.legRoom === "Normal" && requirements.legRoom === true) {
                return false
            }
            if (seat.closeToExit === false && requirements.closeToExit === true) {
                return false
            }
        }
        return true
    }
    useEffect(() => {


        const suggestseats = () => {
            setSuggestedSeats([]);
            
            if (!flightData) {
                return;
            }
            
            var newSuggestedSeats = [];
            
            for (let x = 0; x < requirements.ticketCount; x++) {
                seatSearch:
                for (let i = 0; i < flightData.length; i++) {
                    for (let j = 0; j < flightData[i].length; j++) {
                        if (checkForSeatSuitability(flightData[i][j]) && 
                            !isSublistInNestedArray([i, j], newSuggestedSeats)) {
                            
                                newSuggestedSeats.push([i, j]);
                                if (!requirements.sitTogether){
                                    break seatSearch
                                }
                        }
                    }
                }
            }
            var longest_streak = [0,-1] //index, length
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
        suggestseats()
        //console.log(seatsSuggested, requirements, activeSeat)
        },[flightData, requirements] 
    )

    const filterForSuggestedSeats = (arr) => {
        if (isSublistInNestedArray(arr, seatsSuggested)) {
            setActiveSeat(arr)
        }
        else {
            if (checkForSeatSuitability(flightData[arr[0]][arr[1]])) {
                const newSuggestedSeats = [...seatsSuggested]
                for (let selectedSeat = 0; selectedSeat < newSuggestedSeats.length; selectedSeat ++) {
                    console.log(arr,newSuggestedSeats[selectedSeat])
                    if (activeSeat[0] == newSuggestedSeats[selectedSeat][0] && activeSeat[1] == newSuggestedSeats[selectedSeat][1]) {
                        newSuggestedSeats.splice(selectedSeat, 1);
                        console.log('found')
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
        <div className="d-flex flex-row">
            {flightData && flightData.map((elem, i) => (
                <div className="row mb-2 flex-column p-3" key={i}>
                    {elem.map((seat, j) => {
                        return (
                            <div 
                                onClick={() => {filterForSuggestedSeats([i, j])}}
                                className={`col text-center pt-${j === 3 ? "3": "1"} ps-${seat.legRoom === "Extra" ? "2" : "0"}`} 
                                key={seat.seatNumber}
                            >
                                <div 
                                    className={`
                                        p-0 my-auto square rounded 
                                        ${seat.isTaken ? "taken-seat" : ""} 
                                        ${isSublistInNestedArray([i, j], seatsSuggested) ? "chosen-seat": ""}
                                        ${JSON.stringify([i, j]) == JSON.stringify(activeSeat) ? "selected-seat": "border"}
                                    `}
                                >
                                    <span className="d-flex justify-content-center align-items-center text-center align-middle h-100">
                                        {seat.seatNumber}
                                    </span>
                                    <div className="zero-width-height exit-row-display-bottom">
                                    {(seat.closeToExit && j===0) ? <img src="/bracket-square-svgrepo-com.svg" className="exit-row-display-bottom"></img>: <></>}

                                    </div> 

                                </div>
                            </div>
                        );
                    })}

                </div>
            ))}
        </div>
    );}
