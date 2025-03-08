package org.patrik.ticketairline;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ServeWeb {
    @GetMapping("/test")
    public String serveWeb() {
        return "index.html";
    }
}
