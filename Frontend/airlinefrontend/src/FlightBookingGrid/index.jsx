import { useState, useRef } from "react"

export default function FlightBookGrid({ flightData, requirements, flightPrice, flightId, changeRequirements}) {
    const [seatsSuggested, setSuggestedSeats] = useState(Array())
    const [activeSeat, setActiveSeat] = useState(Array())
    const isManualChange = useRef(false)
    
}
