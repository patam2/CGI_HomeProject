export const suggestSeats = (seatGrid, requirements) => {
    //setSuggestedSeats([]);
    
    if (!seatGrid) {
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
}

export const filterForSuggestedSeats = (arr) => {
    if (isSublistInNestedArray(arr, seatsSuggested)) {
        setActiveSeat(arr)
    }
    else {
        if (checkForSeatSuitability(flightData[arr[0]][arr[1]]), true) {
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