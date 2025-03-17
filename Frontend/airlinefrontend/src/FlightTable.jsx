import { useState, useEffect } from "react";
import { useNavigate } from "react-router";



export function FlightTable() {
    const [flightData, setFlightData] = useState(Array())
    const [filteredFlightData, setFilteredFlightData] = useState(Array())
    const [filter, setFilter] = useState({"departure": "", "arrival": "", "dateFrom": new Date("01/01/1999"), "priceUnder": 99999})

    let navigate = useNavigate()

    useEffect(() => {
        const dataFetch = async () => {
          const data = await (
            await fetch(`${import.meta.env.VITE_API_URL}/api/flights`)
          ).json();
    
          setFlightData(data);
          setFilteredFlightData(data)
        };
    
        dataFetch();
      }, []);

    const redirect = (where) => {
        navigate("/flight/" + where)
    }

    const handleFilter = (ctx, key) => {
        const filtered = [];
        var value = ctx.target.value.toLowerCase()
        if (key === "priceUnder" && value==='') {
            value = 99999;
        }
        else if (key==="dateFrom" && value == "") {
            value = "01/01/1999"
        }
        setFilter(previous => ({
            ...previous,
            [key]: value
        }))
        console.log(filter, key, value)
        flightData.forEach((item) => {
            if (key === "departure") {
                if (item.departure.toLowerCase().includes(value) && item.arrival.toLowerCase().includes(filter.arrival)) {
                    if ((item.flightPrice < filter.priceUnder && new Date(item.flightDate) > new Date(filter.dateFrom))) {
                        filtered.push(item)
                        //console.log(item)
                    }       
                    else {
                        console.log(item.flightDate)
                        console.log( new Date(item.flightDate), new Date(filter.dateFrom))
                    }        
                }
            }

            if (key === "arrival") {
                if (item.arrival.toLowerCase().includes(value) && item.departure.toLowerCase().includes(filter.departure)) {
                    if (item.flightPrice < filter.priceUnder && (new Date(item.flightDate) > new Date(filter.dateFrom))) {
                        filtered.push(item)
                    }
                }
            }

            if (key === "dateFrom") {
                if (new Date(item.flightDate) > new Date(value)) {
                    if (item.flightPrice < filter.priceUnder && item.arrival.toLowerCase().includes(filter.arrival) && item.departure.toLowerCase().includes(filter.departure)) {
                        filtered.push(item)
                    }
                }
            }

            if (key === "priceUnder") {
                if (item.flightPrice < new Number(value)) 
                    if ((new Date(item.flightDate) > new Date(filter.dateFrom)) && item.arrival.toLowerCase().includes(filter.arrival) && item.departure.toLowerCase().includes(filter.departure)) {
                        filtered.push(item)
                    }

            }
 
        })
        setFilteredFlightData(filtered)

    }

    return (
        <>
            <div className="w-100 row mb-3 flex-nowrap">
                <div className="ps-3 col-8 row">
                    <div className="col-6 g-1">
                        <input className="form-control rounded-start  h-100" placeholder="Kust lendame?" onChange={(e) => handleFilter(e, 'departure')} ></input>
                    </div>
                    <div className="col-6 g-1">
                        <input className="form-control  h-100 rounded-end" placeholder="Kuhu lendame?" onChange={(e) => handleFilter(e, 'arrival')}></input>
                    </div>
                </div>
                <div className="col-2">
                    <input type="date" onChange={(e) => handleFilter(e, 'dateFrom')} className="h-100 form-control rounded-start"></input>
                </div>
                <div className="col-2">
                    <input type="number" onChange={(e) => handleFilter(e, 'priceUnder')} className="form-control h-100 rounded-end" placeholder="Hind vähem kui"></input>
                </div>
            </div>
            <div className="mh-25em overflow-auto mb-5">
                <table className="w-100">
                <thead>
                        <tr className="table-header">
                            <th>Väljumine</th>
                            <th>Sihtkoht</th>
                            <th>Kuupäev</th>
                            <th>Kellaaeg</th>
                            <th>Kestus</th>
                            <th>Hind</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFlightData.map((val, indx) => (
                            <tr onClick={() => redirect(val.flightNumber)} className={"table-item stripe-" + indx%2}>
                                <td>{val.departure}</td>
                                <td>{val.arrival}</td>
                                <td>{val.flightDate}</td>
                                <td>{val.departureTime}</td>
                                <td>{val.flightTime}</td>
                                <td>{val.flightPrice}€</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>       
         </>
    )
}
