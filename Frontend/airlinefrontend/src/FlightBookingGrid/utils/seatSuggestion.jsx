import { isSublistInNestedArray } from "./seatUtils";



export const optimizeForSittingTogether = (suggestedseats, ticketCount) => {
    var current_streak = [0,0] //suggestedseatsi index ja pikkus
    var longest_streak = [0, -1]
    var last_seat = suggestedseats[0]


    for (let i = 1; i < suggestedseats.length; i ++) {
        var next_after_last = suggestedseats[i] //[rowI, seatI]
        //Kontrollime kas istenumbrid on järjestikused ja samal real
        if (next_after_last[1] === (last_seat[1] + 1) && last_seat[0] === next_after_last[0]) {
            current_streak = [current_streak[0], current_streak[1]+1]
        }
        //Kui ei, siis lõpetame praeguse loenduse.
        else {
            current_streak = [i,1]
        }

        if (longest_streak[1] < current_streak[1]) {
            longest_streak = [...current_streak]
        } 

        //Kui oleme leidnud piisavalt järjestikuseid istumiskohti, returnime need.
        if (current_streak[1] === ticketCount) {
            return suggestedseats.slice(current_streak[0], current_streak[0] + ticketCount)
        }
        last_seat = next_after_last
    } 
    //kontrollime, et ei oleks viimane streak m'rkamata jaanud
    if (longest_streak[1] < current_streak[1]) {
        longest_streak = [...current_streak]
    } 
    //ja kui ei leidu, siis pakume ikka pikima streaki ja ylejaavad liikmed
    var new_suggestion = suggestedseats.slice(longest_streak[0], longest_streak[0]+longest_streak[1])
    
    
    suggestedseats.map((elem, i) => {
        if (!isSublistInNestedArray(elem, new_suggestion)) {
            if (new_suggestion.length < ticketCount) {
                new_suggestion.push(elem)
            }
        }

    })
    return new_suggestion
}

