package org.patrik.ticketairline;


import java.util.Map;

public class FlightData {
    public String departure;
    public String arrival;
    public String departureTime;
    public String flightTime;
    public String flightNumber;
    public String flightDate;
    public Integer flightPrice;
    public PlaneSeating planeSeating;
    public FlightData(String departure, String arrival, String departureTime, String flightTime, String flightNumber, String flightDate, Integer flightPrice, Map output) {
        this.departure = departure;
        this.arrival = arrival;
        this.departureTime = departureTime;
        this.flightTime = flightTime;
        this.flightNumber = flightNumber;
        this.flightDate = flightDate;
        this.planeSeating = new PlaneSeating();
        this.flightPrice = flightPrice;
        output.put(flightNumber, this);
    }
}

