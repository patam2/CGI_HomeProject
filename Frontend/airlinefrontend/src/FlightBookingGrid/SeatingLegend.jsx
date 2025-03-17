const SeatLegend = () => {
    return (
        <div className="d-flex p-2 justify-content-start w-100">
            <div className="d-flex ">
                <div className="chosen-seat  mini-square seat rounded m-2"></div>
                <div className="my-auto">Valitud iste</div>
            </div>
            <div className="d-flex ">
                <div className="chosen-seat selected-seat mini-square seat rounded m-2"></div>
                <div className="my-auto">Aktiivne iste</div>
            </div>
            <div className="d-flex ">
                <div className="extra-leg-room-seat  mini-square seat rounded m-2"></div>
                <div className="my-auto">Ekstra jalaruum</div>
            </div>
            <div className="d-flex ">
                <div className="near-exit  mini-square seat rounded m-2"></div>
                <div className="my-auto">Väljapääsu lähedal</div>
            </div>
            <div className="d-flex ">
                <div className="taken-seat  mini-square seat rounded m-2"></div>
                <div className="my-auto">Võetud iste</div>
            </div>
        </div>

    )
}

export default SeatLegend