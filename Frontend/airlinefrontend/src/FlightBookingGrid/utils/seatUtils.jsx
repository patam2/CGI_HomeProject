export function isSublistInNestedArray(sublist, nestedArray) {
    return nestedArray.some(arr => 
      arr.length === sublist.length && 
      arr.every((val, index) => val === sublist[index])
    );
}

/**
 * Vaatab, kas iste sobib vastavalt nõuetele.
 * @param {Object} seat 
 * @param {boolean} ignoreRequirements -- kas vaadata lihtsalt seda, kas iste on võetud.
 * @param {Object} requirements 
 * @returns {boolean} true, kui iste on saadaval
 */

export const checkForSeatSuitability = (seat, ignoreRequirements=false, requirements) => {
    if (seat.isTaken) {
        return false
    }
    if (ignoreRequirements) {
        return true
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

export const bookSeats = (flightId, seatList, navigate) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/flights/${flightId}/book`, {
        method: "POST",
        body: JSON.stringify({'flightNumbers': seatList}),
        headers: {"Content-Type": "application/json"}
    })
    .then((resp) => {
        if (resp.status === 200) {
            return resp.json();
        } else {
            throw new Error('Booking failed');
        }
    })
    .then((js) => {
        navigate("/tickets/" + js.uuid);
    })
    .catch(error => {
        console.error('Error booking seats:', error);
    });
};


export const getSeatInfo = (seatCoordinates, seatGrid) => {
    return seatCoordinates.map(([row, col]) => ({
      ...seatGrid[row][col],
      rowIndex: row,
      colIndex: col
    }));
};