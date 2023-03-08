import { FC } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css';
import LazyImage from '../lazy-image/LazyImage';
import './RandomCard.css'


interface IRandomCardProps {
    image_link: string
    price: number
}

const RandomCard: FC<IRandomCardProps> = ({image_link, price}) => {
    return (
        <div className='random_card'>
            <div className='random_card_image'>
            <LazyImage src={image_link} alt='' className='random_card_img' skeletonClassName='random_card_img_skeleton' />
            </div>
            <h1 className='random_card_title'>€{price}</h1>
        </div>
    )
}

export default RandomCard;