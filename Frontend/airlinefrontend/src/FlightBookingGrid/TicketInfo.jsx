import { bookSeats, getSeatInfo } from "./utils/seatUtils";
import { useNavigate } from "react-router";

export const TicketInfo = ({seatsSuggested, requirements, flightData, removeSuggestedSeat, flightPrice, flightId}) => {
    if (seatsSuggested.length === 0 || requirements.ticketCount !== seatsSuggested.length) {
        return null
    }

    var navigate = useNavigate()    
    const seatInfo = getSeatInfo(seatsSuggested, flightData);
    seatInfo.sort((a, b) => a.seatNumber - b.seatNumber)
    const cost = requirements.ticketCount * flightPrice;
    return (
        <>
            {seatInfo.map((seat, index) => (
                <div key={index} className="w-100 m-2 p-2 border rounded d-flex justify-content-between">
                    <span>
                        Pilet #{index+1}, istekoht nr. {seat.seatNumber}
                        {seat.closeToExit && <><br></br><b>Väljapääsu real</b></> }
                        {seat.legRoom === "Extra" && <><br></br><b>Ekstra jalaruum</b></>}
                    </span>
                    <button type="button" class="btn-close" 
                        onClick={(e) => removeSuggestedSeat([seatInfo.rowIndex, seatInfo.colIndex])} 
                        aria-label="Close">
                        
                    </button>
                </div>
            ))}
            <div className="w-100 m-2 p-2 border rounded d-flex justify-content-between align-middle">
                <span className="my-auto">
                    Kokku valitud <b>{requirements.ticketCount}</b> piletit, <b>{cost}€</b>.
                </span>
                <button onClick={() => bookSeats(flightId, seatInfo.map(seat => seat.seatNumber), navigate)} 
                    className="btn button border rounded">
                    Kinnitan kohad
                </button>
            </div>     
        </>
    )
}