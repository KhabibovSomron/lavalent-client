import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { BASE_URL } from '../../redux/requests/endpoints';
import { fetchCategories } from '../../redux/requests/ProductRequests';
import Card from '../card/Card';
import './CategoryCards.css'


interface ICategoryCardsProps {

}

const CategoryCards: FC<ICategoryCardsProps> = () => {

    const categories = useAppSelector(state => state.categoryList.categories)

    return (
        <div className='category_cards'>
            {categories.map((category, index) => 
                <Card image_link={category.image} title={category.title} key={index} />
            )}
        </div>
    )
}

export default CategoryCards;