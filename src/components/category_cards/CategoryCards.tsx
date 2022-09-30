import { FC } from 'react'
import Card from '../card/Card';
import './CategoryCards.css'


interface ICategoryCardsProps {

}

const CategoryCards: FC<ICategoryCardsProps> = () => {
    return (
        <div className='category_cards'>
            <Card image_link='../../images/bags_category.jpg' title='Bags (Сумки)' />
            <Card image_link='../../images/shoes_category.jpg' title='Shoes (Обувь)' />
            <Card image_link="D:\Projects\Work\lavalent-client\src\images\accessories_category.png" title='Accessories (Аксессуары)' />

        </div>
    )
}

export default CategoryCards;