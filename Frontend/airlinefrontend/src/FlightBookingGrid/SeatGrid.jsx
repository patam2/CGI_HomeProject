import { isSublistInNestedArray } from "./utils/seatUtils";

export const SeatGrid = ({flightData, filterForSuggestedSeats, seatsSuggested, activeSeat}) => {
    return (
        <div className="d-flex">
            {flightData && flightData.map((elem, i) => (
                <div className="row mb-2 flex-column p-3" key={i}>
                    {elem.map((seat, j) => {
                        return (
                            <div 
                                onClick={() => {filterForSuggestedSeats([i, j])}}
                                className={`col text-center pt-${j === 3 ? "3": "1"} ${seat.legRoom === "Extra" ? "ps-2" : "ps-0"}`} 
                                key={seat.seatNumber}
                            >
                                <div 
                                    className={`
                                        p-0 my-auto square seat rounded 
                                        ${seat.isTaken ? "taken-seat" : ""} 
                                        ${seat.legRoom === "Extra" ? "extra-leg-room-seat" : ""}
                                        ${seat.closeToExit ? "near-exit" : ""} 
                                        ${isSublistInNestedArray([i, j], seatsSuggested) ? "chosen-seat": ""}
                                        ${JSON.stringify([i, j]) == JSON.stringify(activeSeat) ? "selected-seat": "border"}
                                    `}>
                                    <span className="d-flex justify-content-center align-items-center text-center align-middle h-100">
                                        {seat.seatNumber}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    )
} 

