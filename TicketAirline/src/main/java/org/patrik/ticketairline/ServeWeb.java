package org.patrik.ticketairline;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.patrik.ticketairline.FlightData;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;




@RestController
public class ServeWeb {
    @GetMapping("/test")
    public String serveWeb() {
        return "index.html";
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/api/flights")
    public String serveFlights() throws JsonProcessingException {
        FlightData[] allFlights =
                {
                        new FlightData("Tallinn", "Riga", "19:00", "1h", "AAAA", "02.03.12"),
                        new FlightData("Riga", "Tokyo", "08:00", "12h", "TLNJP", "02.03.12"),
                };
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(allFlights);
    }
}