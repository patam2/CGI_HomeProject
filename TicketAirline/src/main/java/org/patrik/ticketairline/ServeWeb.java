package org.patrik.ticketairline;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.patrik.ticketairline.FlightData;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import java.util.UUID;


@RestController
public class ServeWeb {


    Map<String, FlightData> flightMap = new HashMap<>();
    Map<String, Ticket> ticketMap = new HashMap<>();
    ObjectMapper objectMapper = new ObjectMapper();
    FlightData[] allFlights =
            {
                    new FlightData("Madriid", "Rooma", "10:30", "2h30m", "MADROM", "2025-03-04", 85, flightMap),
                    new FlightData("Amsterdam", "Berliin", "14:15", "1h45m", "AMSBER", "2025-03-05", 45, flightMap),
                    new FlightData("Viin", "Prahha", "08:45", "50m", "VIEPRA", "2025-03-06", 30, flightMap),
                    new FlightData("Lisbon", "Madrid", "17:20", "1h15m", "LISMAD", "2025-03-07", 60, flightMap),
                    new FlightData("Ateena", "Istanbul", "11:00", "1h30m", "ATHIST", "2025-03-08", 75, flightMap),
                    new FlightData("Kopenhaagen", "Stockholm", "16:40", "1h05m", "COPSTO", "2025-03-09", 55, flightMap),
                    new FlightData("Dublin", "London", "09:10", "1h20m", "DUBLON", "2025-03-10", 40, flightMap),
                    new FlightData("Milano", "Barcelona", "13:30", "2h", "MILBAR", "2025-03-11", 65, flightMap),
                    new FlightData("Brüssel", "Pariis", "07:50", "1h10m", "BRUPAR", "2025-03-12", 35, flightMap),
                    new FlightData("Budapest", "Viin", "19:45", "45m", "BUDVIE", "2025-03-13", 25, flightMap),
                    new FlightData("München", "Zürich", "12:20", "1h", "MUNZUR", "2025-03-14", 50, flightMap),
                    new FlightData("Oslo", "Kopenhaagen", "15:55", "1h15m", "OSLOCOP", "2025-03-15", 55, flightMap),
                    new FlightData("Varssavi", "Berliin", "18:30", "1h30m", "WARBER", "2025-03-16", 45, flightMap),
                    new FlightData("Helsinki", "Stockholm", "10:15", "55m", "HELSTO", "2025-03-17", 40, flightMap),
                    new FlightData("Rooma", "Ateena", "14:00", "2h10m", "ROMATH", "2025-03-18", 70, flightMap),
                    new FlightData("Tallinn", "Riia", "07:15", "1h05m", "TLNRIA", "2025-01-12", 38, flightMap),
                    new FlightData("Praha", "München", "16:20", "1h15m", "PRAMUN", "2025-02-23", 42, flightMap),
                    new FlightData("London", "Edinburgh", "09:45", "1h30m", "LONEDI", "2025-04-05", 55, flightMap),
                    new FlightData("Istanbul", "Ankara", "11:30", "1h10m", "ISTANK", "2025-05-19", 30, flightMap),
                    new FlightData("Berliin", "Frankfurt", "08:10", "1h", "BERFRA", "2025-06-30", 48, flightMap),
                    new FlightData("Stockholm", "Oslo", "13:45", "1h", "STOOSLO", "2025-07-11", 52, flightMap),
                    new FlightData("Barcelona", "Valencia", "18:20", "55m", "BARVAL", "2025-08-25", 36, flightMap),
                    new FlightData("Pariis", "Lyon", "10:50", "1h15m", "PARLYO", "2025-09-14", 44, flightMap),
                    new FlightData("Rooma", "Milano", "15:15", "1h05m", "ROMMIL", "2025-10-27", 39, flightMap),
                    new FlightData("Varssavi", "Kraków", "12:25", "50m", "WARKRA", "2025-11-08", 32, flightMap),
                    new FlightData("Kopenhaagen", "Aarhus", "14:55", "40m", "COPAAR", "2025-12-20", 28, flightMap),
                    new FlightData("Madrid", "Sevilla", "09:30", "1h20m", "MADSEV", "2024-01-15", 45, flightMap),
                    new FlightData("Amsterdam", "Rotterdam", "17:40", "30m", "AMSROT", "2024-03-29", 25, flightMap),
                    new FlightData("Viin", "Salzburg", "11:10", "45m", "VIESAL", "2024-05-12", 33, flightMap),
                    new FlightData("Ateena", "Thessaloniki", "16:05", "55m", "ATHTHE", "2024-07-06", 37, flightMap),
                    new FlightData("Helsinki", "Tampere", "08:25", "35m", "HELTAM", "2024-09-22", 28, flightMap),
                    new FlightData("Brüssel", "Antwerp", "13:15", "25m", "BRUANT", "2024-11-17", 22, flightMap),
                    new FlightData("Budapest", "Debrecen", "19:50", "40m", "BUDDEB", "2026-02-08", 30, flightMap),
                    new FlightData("Zürich", "Geneva", "10:40", "50m", "ZURGEN", "2026-04-19", 35, flightMap),
                    new FlightData("Dublin", "Cork", "15:30", "45m", "DUBCOR", "2026-06-25", 31, flightMap),
            };
    @GetMapping("/test")
    public String serveWeb() {
        return "index.html";
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/api/flights")
    public String serveFlights() throws JsonProcessingException {
        return objectMapper.writeValueAsString(allFlights);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/api/flights/{flightNumber}")
    public String serveFlightData(@PathVariable String flightNumber) throws JsonProcessingException {
        System.out.println(objectMapper.writeValueAsString(flightMap));
        return objectMapper.writeValueAsString(flightMap.get(flightNumber));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @RequestMapping("/api/flights/{flightNumber}/book")
    public String bookFlight(@PathVariable String flightNumber , @RequestBody BookPageBody input) {
        int output = 0;
        FlightData flightData = flightMap.get(flightNumber);
        for (int i = 0; i < input.flightNumbers.length; i ++) {
            String seatNr = input.flightNumbers[i];
            for (int j = 0; j < flightData.planeSeating.seats.size(); j ++) {
                for (int k=0; k<flightData.planeSeating.seats.get(j).size(); k ++) {
                    Seat seat = flightData.planeSeating.seats.get(j).get(k);
                    if (Objects.equals(seat.seatNumber, seatNr)) {
                        seat.isTaken = true;
                        output ++;
                    }
                }
            }
        }
        String uuid = UUID.randomUUID().toString();
        ticketMap.put(uuid, new Ticket(uuid, flightData, input.flightNumbers));
        return "{\"uuid\": \"" + uuid + "\"}";
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/api/tickets/{ticketId}")
    public String getTicket(@PathVariable String ticketId) throws JsonProcessingException {
        Ticket ticket = ticketMap.get(ticketId);
        System.out.println(ticketMap);
        return objectMapper.writeValueAsString(ticket);
    }
}