package org.patrik.ticketairline;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.patrik.ticketairline.FlightData;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;


@RestController
public class ServeWeb {


    Map<String, FlightData> flightMap = new HashMap<>();
    ObjectMapper objectMapper = new ObjectMapper();
    FlightData[] allFlights =
            {
                    new FlightData("Tallinn", "Vargamäe", "19:00", "1h", "TLNVM", "02/03/25", 19, flightMap),
                    new FlightData("Mustamäe", "Viimsi", "08:00", "12h", "TLNJP", "02/03/25", 20, flightMap),
                    new FlightData("Tartu", "Tallinn", "20:00", "1h", "TRTTL", "03/03/25", 100, flightMap),
                    new FlightData("Paris", "Tokyo", "20:00", "10h", "PARTO", "03/03/26", 50, flightMap),
                    new FlightData("London", "Paris", "15:00", "10h", "LONPA", "03/05/26", 999,flightMap),

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
    public Integer bookFlight(@PathVariable String flightNumber , @RequestBody BookPageBody input) {
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
        return output;
    }

}