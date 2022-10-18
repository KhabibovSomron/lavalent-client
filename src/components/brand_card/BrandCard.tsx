import { FC } from 'react'
import './BrandCard.css'


interface IBrandCardProps {

}

const BrandCard: FC<IBrandCardProps> = () => {
    return (
        <div className='brand_card'>
            <div className='brand_card_logo'>All Brands</div>
            <h1 className='brand_card_title'>All Brands</h1>
        </div>
    )
}

export default BrandCard;