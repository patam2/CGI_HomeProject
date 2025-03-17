import { useState, useEffect } from "react"
import { useParams} from "react-router";


export function TicketDisplayPage () {
    const [ticketData, setTicketData] = useState(null)
    const [seatMap, setSeatMap] = useState({})
    const ticketId = useParams().ticketId


    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(`${import.meta.env.VITE_API_URL}/api/tickets/${ticketId}`)
        ).json();
        var newSeatMap = {}
        for (let i = 0; i<data.flightData.planeSeating.seats.length; i ++) {
            for (let j = 0; j< data.flightData.planeSeating.seats[i].length; j++) {
                let seat = data.flightData.planeSeating.seats[i][j]
                newSeatMap[seat.seatNumber] = seat
            }
        }
        setTicketData(data)
        setSeatMap(newSeatMap)
        };
        
        dataFetch();
    }, []);
    
    if (ticketData == null){
        return <>Error</>
    }

    const tickets = []
    console.log(seatMap)
    for (let i = 0;i < ticketData.seatNrs.length; i++) {
        console.log(i, ticketData.seatNrs)
        let seat = seatMap[ticketData.seatNrs[i]]
        console.log(seat)
        tickets.push(
            <div className="col-md-6">
                <div className="card mb-3">
                    <div className="card-header">
                        Pilet number {i+1}
                    </div>
                    <div className="card-body d-flex">
                        
                        <div className="mx-2">
                            <div >
                                <b>Istekoht</b>
                            </div>
                            <div>
                                {seat.seatNumber}
                            </div>
                        </div>
                        <div className="mx-2">
                            <div>
                                <b>Kuupäev</b>
                            </div>
                            <div>
                                {ticketData.flightData.flightDate}
                            </div>
                        </div>
                        <div className="mx-2">
                            <div>
                                <b>Marsruut</b>
                            </div>
                            <div>
                                {ticketData.flightData.departure} - {ticketData.flightData.arrival}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div className="container">
        <div className="row">
            {tickets}
        </div>
        </div>
    )
}