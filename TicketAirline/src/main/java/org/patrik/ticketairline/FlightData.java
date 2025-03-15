package org.patrik.ticketairline;


import java.util.Map;

public class FlightData {
    public String departure;
    public String arrival;
    public String departureTime;
    public String flightTime;
    public String flightNumber;
    public String flightDate;
    public PlaneSeating planeSeating;
    public FlightData(String departure, String arrival, String departureTime, String flightTime, String flightNumber, String flightDate, Map output) {
        this.departure = departure;
        this.arrival = arrival;
        this.departureTime = departureTime;
        this.flightTime = flightTime;
        this.flightNumber = flightNumber;
        this.flightDate = flightDate;
        this.planeSeating = new PlaneSeating();
        output.put(flightNumber, this);
    }
}

