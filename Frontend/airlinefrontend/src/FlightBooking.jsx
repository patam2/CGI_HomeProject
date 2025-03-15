import { useEffect, useState } from "react";
import { useParams } from "react-router";


function FlightBookGrid({ flightData, requirements }) {
    return (
        <div >
            {flightData && flightData.map((elem, index) => (
                <div className="row mb-2" key={index}>
                    {elem.map((seat, i) => {
                        return (
                            <div className="col" key={seat.seatNumber}>
                                {seat.seatNumber}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    );
}


export default function FlightBookingPage () {
    const [ticketCount, setTicketCount] = useState(1)
    const [sitTogether, setSitTogether] = useState(false)
    const [legRoom, setLegRoom] = useState(false)
    const [nearExit, setNearExit] = useState(false)
    const [flightData, setFlightData] = useState({planeSeating: {seats: []}})

    let flightId = useParams().flightId

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
        <div className="container">
            <div className="d-flex justify-content-between mb-3">
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

                    <input id="extralegroom" className="me-3" type="checkbox" ></input>

                </div>

                <div className="">
                    <label for="extralegroom" className="me-1">Rohkem jalaruumi </label>

                    <input id="extralegroom" className="me-3" type="checkbox"></input>

                </div>
                <div className="">
                    <label for="extralegroom" className="me-1">Väljapääsu juures </label>

                    <input id="emergency" type="checkbox" className="me-2"></input>
                </div>

            </div>
            <h3>
                Vali piletid plaanil
            </h3>
            <div className="row">
                <div className="col-6">
                    <FlightBookGrid flightData={flightData.planeSeating.seats} requirements={false}></FlightBookGrid>

                </div>
            </div>
        </div>
        
    )
}