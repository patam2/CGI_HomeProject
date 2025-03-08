import { useState } from 'react'
import './scss/style.css'
import Slider from "react-slick";


function FlyPageSlider() {
  var settings = {
    infinite: true,
    slidesToShow: 1,
    vertical: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "ease"
  }
  return <Slider {...settings} className={'slider'} arrows={false}>
    <div>
      Tokyo
    </div>
    <div>
      Sofia
    </div>
    <div>
      Tallinn
    </div>
    <div>
      Pariis
    </div>
    <div>
      Seoul
    </div>
  </Slider>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className='navbar bg-black   '>
        <div className='container-fluid'>
          <a className="navbar-brand text-secondary" href='#'>FlyCGI</a>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link text-secondary" aria-current="page" href="#">About us</a>
              </li>
            </ul>
        </div>
      </nav>
      <div className='bg-primary p-5 text-center '>
        <div className="d-flex justify-content-center mb-3">
          <div className='fs-2 fw-bolder text-secondary '>
            <FlyPageSlider/>
          </div>
          <div className='mx-1 fs-2'>
          ootab sind &#9992;
          </div>
        </div>
        <div className='fs-5 text-secondary'>
          <p>Piletid alates <em>19</em> eurot!*</p>
        </div>
      </div>
      <div className='container'>
        <input></input>
        <table>
          <thead>
            <th>
              Sihtkoht
            </th>
            <th>
              Väljumise kellaeg
            </th>
            <th>
              Lennu kestvus
            </th>
            <th>
              Hind
            </th>
            <th>
              Pakkuja
            </th>
          </thead>
          <tbody>
            <tr>
              <td>
                Riia
              </td>
              <td>
                19:00
              </td>
              <td>
                5h
              </td>
              <td>
                199
              </td>
              <td>
                Ryanair
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
