import { useEffect, useState } from "react";
import { useParams } from "react-router";


function isSublistInNestedArray(sublist, nestedArray) {
    return nestedArray.some(arr => 
      arr.length === sublist.length && 
      arr.every((val, index) => val === sublist[index])
    );
}

function FlightBookGrid({ flightData, requirements, changeRequirements}) {
    const [seatsSuggested, setSuggestedSeats] = useState(Array())
    useEffect(() => {
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

        const suggestseats = () => {
            setSuggestedSeats([]);
            
            if (!flightData) {
                return;
            }
            
            const newSuggestedSeats = [];
            
            for (let x = 0; x < requirements.ticketCount; x++) {
                seatSearch:
                for (let i = 0; i < flightData.length; i++) {
                    for (let j = 0; j < flightData[i].length; j++) {
                        if (checkForSeatSuitability(flightData[i][j]) && 
                            !isSublistInNestedArray([i, j], newSuggestedSeats)) {
                            newSuggestedSeats.push([i, j]);
                            break seatSearch;
                        }
                    }
                }
            }
            
            setSuggestedSeats(newSuggestedSeats);
            console.log("Added seats:", newSuggestedSeats);
        };
        suggestseats()
        console.log(seatsSuggested, requirements)
        },[flightData, requirements] 
    )


    return (
        <div className="d-flex flex-row">
            {flightData && flightData.map((elem, i) => (
                <div className="row mb-2 flex-column p-3" key={i}>
                    {elem.map((seat, j) => {
                        return (
                            <div className={`col text-center pt-${j === 3 ? "3": "1"} ps-${seat.legRoom === "Extra" ? "2" : "0"}`} key={seat.seatNumber}>
                                <div className={
                                    `p-0 my-auto border square rounded ${seat.isTaken ? "taken-seat" : ""} 
                                    ${isSublistInNestedArray([i,j ], seatsSuggested) ? "chosen-seat": ""}`}>
                                    <span className="align-middle h-100">{seat.seatNumber}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    );
}


export default function FlightBookingPage () {
    const [requirements, setRequirements] = useState({
        ticketCount: 1,
        sitTogether: false,
        legRoom: false,
        closeToExit: false,
        last_change: ""
    })
    const [flightData, setFlightData] = useState({planeSeating: {seats: []}})

    let flightId = useParams().flightId

    const changeRequirements = (changed, value) => {
        if ((changed === "legRoom" || changed === "closeToExit") && (requirements.legRoom != requirements.closeToExit)) {
            if (!value){
                console.log('all good')
            }
            else {
                console.log('bad')
                return
            }          
        }
        setRequirements(
            requirements =>({
                ...requirements,
                [changed]: value,
                ["last_change"]: changed
            })
        )
    }

    const addTicket = (operation) => {
        if (operation === "add") {
            setRequirements(
                requirements =>({
                    ...requirements,
                    ["ticketCount"]: requirements.ticketCount + 1,
                    ["last_change"]: "ticketCount"
                })
            )
        }

        
    }

    useEffect(() => {
        const dataFetch = async () => {
          const data = await (
            await fetch(`${import.meta.env.VITE_API_URL}/api/flights/${flightId}`)
          ).json();
          setFlightData(data)
        };
    
        dataFetch();
      }, []);


    return (
        <div className="container ">
            <h3>
                Vali piletid plaanil
            </h3>
            <div className="row">
                <div className="align-self-stretch d-flex col-md-6 flex-column justify-content-between">
                    <div className="d-flex justify-content-between">
                        <div>
                            <label for="seatpicker me-1">Piletite arv</label>
                            <button onClick={() => {addTicket("add")}}>Lisa pilet</button>
                        </div>

                        <div className="">
                            <label for="extralegroom" className="me-1">Soovin koos istuda </label>

                            <input 
                                id="extralegroom" 
                                onChange={()=> changeRequirements("sitTogether", !requirements.sitTogether)} 
                                className="me-3"
                                checked={requirements.sitTogether} 
                                 type="checkbox" >
                                
                            </input>

                        </div>

                        <div className="">
                            <label for="extralegroom" className="me-1">Rohkem jalaruumi </label>

                            <input 
                                id="extralegroom"
                                onChange={()=> changeRequirements("legRoom", !requirements.legRoom)} 
                                className="me-3"
                                checked={requirements.legRoom}  
                                type="checkbox">
                            </input>

                        </div>
                        <div className="">
                            <label for="extralegroom" className="me-1">Väljapääsu juures </label>

                            <input 
                                id="emergency" 
                                type="checkbox" 
                                checked={requirements.closeToExit} 
                                onChange={()=> changeRequirements("closeToExit", !requirements.closeToExit)} 
                                className="me-2">
                                
                            </input>
                        </div>

                    </div>



                </div>
                <div>
                    <FlightBookGrid 
                        flightData={flightData.planeSeating.seats} 
                        requirements={
                            requirements}
                    >

                    </FlightBookGrid>
                </div>
            </div>
        </div>
        
    )
}