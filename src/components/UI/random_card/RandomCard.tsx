import { FC } from 'react'
import './RandomCard.css'


interface IRandomCardProps {
    image_link: string
    price: number
}

const RandomCard: FC<IRandomCardProps> = ({image_link, price}) => {
    return (
        <div className='random_card'>
            <div className='random_card_image'>
                <img src={image_link} alt="" />
            </div>
            <h1 className='random_card_title'>€{price}</h1>
        </div>
    )
}

export default RandomCard;