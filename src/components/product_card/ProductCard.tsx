import { FC } from 'react'
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
                <img src={image_link} alt={`${vendor_code}`} />
            </div>
            {material !== 'none' ? <p className='product_card_subtitle'>{material}</p>: <></>} 
            <p className='product_card_subtitle'>Артикул {vendor_code}</p>
            <h1 className='product_card_title'>€{price}</h1>
        </div>
    )
}

export default ProductCard;