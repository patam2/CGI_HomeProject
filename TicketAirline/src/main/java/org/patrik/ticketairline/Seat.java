package org.patrik.ticketairline;

public class Seat {
    public String seatNumber;
    public String seatType;
    public String legRoom;
    public Boolean closeToExit;
    public Seat(String seatNumber, String seatType, String legRoom, Boolean closeToExit) {
        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.legRoom = legRoom;
        this.closeToExit = closeToExit;
    }
}