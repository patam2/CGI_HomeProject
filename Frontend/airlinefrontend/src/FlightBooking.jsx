import { useEffect, useState } from "react";
import { useParams } from "react-router";


function FlightBookGrid({ flightData, requirements, changeRequirements}) {
    useEffect(() => {
        const suggestseats = () => {
            console.log(requirements )
        };
        suggestseats()

        },[requirements] 
    )


    return (
        <div className="d-flex flex-row">
            {flightData && flightData.map((elem, index) => (
                <div className="row mb-2 flex-column p-3" key={index}>
                    {elem.map((seat, i) => {
                        return (
                            <div className={`col text-center pt-${i === 3 ? "3": "1"} ps-${seat.legRoom === "Extra" ? "2" : "0"}`} key={seat.seatNumber}>
                                <div className={`p-0 my-auto border square rounded ${seat.isTaken ? "bg-danger" : ""}`}>
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
        nearExit: false,
        last_change: ""
    })
    const [flightData, setFlightData] = useState({planeSeating: {seats: []}})

    let flightId = useParams().flightId

    const changeRequirements = (changed, value) => {
        if ((changed === "legRoom" || changed === "nearExit") && (requirements.legRoom != requirements.nearExit)) {
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
                            <select className="me-3">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
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
                                checked={requirements.nearExit} 
                                onChange={()=> changeRequirements("nearExit", !requirements.nearExit)} 
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