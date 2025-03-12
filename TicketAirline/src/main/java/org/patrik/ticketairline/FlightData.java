package org.patrik.ticketairline;


public class FlightData {
    public String departure;
    public String arrival;
    public String departureTime;
    public String flightTime;
    public String flightNumber;
    public String flightDate;

    public FlightData(String departure, String arrival, String departureTime, String flightTime, String flightNumber, String flightDate) {
        this.departure = departure;
        this.arrival = arrival;
        this.departureTime = departureTime;
        this.flightTime = flightTime;
        this.flightNumber = flightNumber;
        this.flightDate = flightDate;
    }
}
