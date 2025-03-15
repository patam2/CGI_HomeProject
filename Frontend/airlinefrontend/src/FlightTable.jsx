import { useState, useEffect } from "react";
import { useNavigate } from "react-router";



export function FlightTable() {
    const [flightData, setFlightData] = useState(Array())
    const [filteredFlightData, setFilteredFlightData] = useState(Array())
    const [filter, setFilter] = useState({"departure": "", "arrival": ""})

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
    console.log(flightData);

    const redirect = (where) => {
        navigate("/flight/" + where)
    }

    const handleFilter = (ctx, key) => {
        const filtered = [];
        const value = ctx.target.value.toLowerCase()
        setFilter(previous => ({
            ...previous,
            [key]: value
        }))

        flightData.forEach((item) => {
            if (key === "departure") {
                if (item.departure.toLowerCase().includes(value) && item.arrival.toLowerCase().includes(filter.arrival)) {
                    filtered.push(item)
                }
            }

            if (key === "arrival") {
                if (item.arrival.toLowerCase().includes(value) && item.departure.toLowerCase().includes(filter.departure)) {
                    filtered.push(item)
                }
            }

        })
        setFilteredFlightData(filtered)

    }

    return (
        <>
            <div className="row mb-3 flex-nowrap">
                <div className="col-8 row">
                    <div className="col-6 g-1">
                        <input className="form-control rounded-start  h-100" placeholder="Kust lendame?" onChange={(e) => handleFilter(e, 'departure')} ></input>
                    </div>
                    <div className="col-6 g-1">
                        <input className="form-control  h-100 rounded-end" placeholder="Kuhu lendame?" onChange={(e) => handleFilter(e, 'arrival')}></input>
                    </div>
                </div>
                <div className="col-auto">
                    <input type="date" className="h-100 form-control rounded-start"></input>
                </div>
                <div className="col-2">
                    <input type="number" className="form-control h-100 rounded-end" placeholder="Max hind"></input>
                </div>
            </div>

            <table className="w-100">
                <thead>
                    <tr className="table-header">
                        <th>Väljumine</th>
                        <th>Sihtkoht</th>
                        <th>Kuupäev</th>
                        <th>Kellaaeg</th>
                        <th>Kestus</th>
                        <th>Kood</th>
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
                            <td>{val.flightNumber}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    )
}
