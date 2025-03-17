import {useEffect, useState } from "react";
import { useParams } from "react-router";
import FlightBookGrid from "./FlightBookingGrid";


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
        <>
            <nav className='navbar bg-black mb-3'>
                <div className='container-fluid'>
                <a className="navbar-brand text-secondary" href='#'>FlyCGI - Pileti broneerimine</a>
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link text-secondary" aria-current="page" href="#">About us</a>
                    </li>
                    </ul>
                </div>
            </nav>
        <div className="container ">
            <h3>
                Vali piletid plaanil
            </h3>
                <div className="align-self-stretch d-flex col-md-6 flex-column justify-content-between">
                    <div className="d-flex justify-content-between">
                        <div>
                            <label for="seatpicker me-1">Piletite arv</label>
                            <select name="ticketCount" onChange={(e) => changeRequirements("ticketCount", Number(e.target.value))} value={requirements.ticketCount} id="ticketCount">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>

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
                                checked={requirements.closeToExit} 
                                onChange={()=> changeRequirements("closeToExit", !requirements.closeToExit)} 
                                className="me-2">
                                
                            </input>
                        </div>

                    </div>
                </div>
                

                <FlightBookGrid 
                    flightData={flightData.planeSeating.seats} 
                    requirements={requirements}
                    flightId={flightData.flightNumber}
                    flightPrice={flightData.flightPrice}
                    changeRequirements={changeRequirements}
                />
                </div>
        </>
    )
}