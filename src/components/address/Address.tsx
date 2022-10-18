import { FC } from 'react'
import './Address.css'
import Map from '../map/Map'

interface IAddressProps {
    addressRef: any
}

const Address: FC<IAddressProps> = ({addressRef}) => {

    


    return(
        <div className='address' ref={addressRef}>
            <div className="address_container">
                <h2>Адрес</h2>
                <div className="layout">
                    <div className="address_map">
                        <Map />
                    </div>
                    <div className="text">
                        <div className='description'>
                            <p>Europe SA</p>
                            <p>Avenue Louise 54, Room S52</p>
                            <p>Brussels</p>
                            <p>1050, Belgium</p>
                        </div>
                        <div className="bottom_description">
                            <div className="bottom_address">
                                <p className="title">Адрес в Риге</p>
                                <p className="p_address">Kurzemes prospekts 1, Kurzemes rajons, Rīga, LV-1067, Латвия</p>
                                <div className='address_button'>
                                    <a href='/'>Проложить маршрут</a>
                                </div>
                            </div>
                            <div className="bottom_schedule">
                                <p className="title">Часы работы:</p>
                                <p className="day">Без выходных</p>
                                <p className="hour">с 9:00 по 21:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Address;