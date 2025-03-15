package org.patrik.ticketairline;


import java.util.ArrayList;
import java.util.List;

public class PlaneSeating {
    public List<List<Seat>> seats = new ArrayList<>();
    public PlaneSeating() {
        for (int i = 0; i < 12; i++) {
            List<Seat> row = new ArrayList<Seat>();
            String legRoom = "Normal";
            Boolean closeToExit = false;
            if (i < 4) {
                legRoom = "Extra";
            }
            if (i == 6) {
                closeToExit = true;
            }
            for (int j = 1; j < 7; j++) {
                //System.out.println(j);
                if (j == 1 || j == 6) {
                    row.add(new Seat(Integer.toString(j + 6*i), "Window", legRoom, closeToExit));
                }
                if (j == 2 || j == 5) {
                    row.add(new Seat(Integer.toString(j + 6* i), "Middle", legRoom, closeToExit));
                }
                if (j == 3 || j== 4) {
                    row.add(new Seat(Integer.toString(j + 6*i), "Aisle", legRoom, closeToExit));
                }
            }
            //System.out.println(row);
            seats.add(row);
        }
    }
}
