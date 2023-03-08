import { FC } from 'react'
import LazyImage from '../lazy-image/LazyImage'
import './ProductCard.css'


interface IProductCardProps {
    price: number,
    vendor_code: number,
    image_link: string,
    material: string
}

const ProductCard: FC<IProductCardProps> = ({price, vendor_code, image_link, material}) => {
    return (
        <div className='product_card'>
            <div className='product_card_image'>
                <LazyImage src={image_link} alt={`${vendor_code}`} className='product_card_img' skeletonClassName='product_card_img_skeleton' />
            </div>
            {material !== 'none' ? <p className='product_card_subtitle'>{material}</p>: <></>} 
            <p className='product_card_subtitle'>Артикул {vendor_code}</p>
            <h1 className='product_card_title'>€{price}</h1>
        </div>
    )
}

export default ProductCard;