import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { FC } from 'react'
import './Map.css'


interface IMapProps {

}

const Map: FC<IMapProps> = () => {

    const API_KEY = "AIzaSyDHOj6ntKXCr7DaRJgPfjCuV0AqaDxoe3M"

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: API_KEY
    })

    if (!isLoaded) {
        return(
        <div className='map_container'>
            Error
        </div>
        )
    }

    return (
        <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerClassName="map_container"></GoogleMap>
    )
}

export default Map;