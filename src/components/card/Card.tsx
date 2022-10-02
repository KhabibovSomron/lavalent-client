import { FC } from 'react'
import './Card.css'


interface ICardProps {
    image_link: string
    title: string
}

const Card: FC<ICardProps> = ({image_link, title}) => {
    return (
        <div className='card'>
            <div className='card_image'>
                <img src={image_link} alt="" />
            </div>
            <a className='card_title' href='/'>{title}</a>
        </div>
    )
}

export default Card;