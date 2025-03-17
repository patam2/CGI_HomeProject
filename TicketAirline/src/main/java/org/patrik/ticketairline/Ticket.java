package org.patrik.ticketairline;

public class Ticket {
    public String id;
    public  FlightData flightData;
    public String[] seatNrs;
    public Ticket(String id, FlightData flightData, String[] seatNrs) {
        this.id = id;
        this.flightData = flightData;
        this.seatNrs = seatNrs;
    }
}
