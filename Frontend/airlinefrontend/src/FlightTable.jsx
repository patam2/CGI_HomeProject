import { useState, useEffect } from "react";


export async function fetchTable() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/flights`).then(res => res.json());
}


export function FlightTable() {
    const [flightData, setFlightData] = useState(Array())
    const [filteredFlightData, setFilteredFlightData] = useState(Array())
    const [filter, setFilter] = useState({"departure": "", "arrival": ""})
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
            <div className="row">
                <div className="col-9">
                    <input className="w-50" onChange={(e) => handleFilter(e, 'departure')} ></input>
                    <input className="w-50" onChange={(e) => handleFilter(e, 'arrival')}></input>
                </div>
                <div className="col-3">
                    <button></button>
                </div>
            </div>

            <table className="w-100">
                <thead>
                    <tr>
                        <th>Väljumine</th>
                        <th>Sihtkoht</th>
                        <th>Kuupäev</th>
                        <th>Kellaaeg</th>
                        <th>Kestus</th>
                        <th>Kood</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFlightData.map((val) => (
                        <tr>
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
