import { FC } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import LazyImage from '../lazy-image/LazyImage'
import './Card.css'


interface ICardProps {
    image_link: string
    title: string
}

const Card: FC<ICardProps> = ({image_link, title}) => {
    return (
        <div className='card'>
            <div className='card_image'>
                <LazyImage className='card-img' src={image_link} alt='' skeletonClassName='card-img-skeleton' />
            </div>
            <h1 className='card_title'>{title}</h1>
        </div>
    )
}

export default Card;