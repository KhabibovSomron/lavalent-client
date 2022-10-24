import { FC } from 'react'
import { Link } from 'react-router-dom';
import {  useAppSelector } from '../../../hooks/ReduxHooks';
import Card from '../card/Card';
import './CategoryCards.css'


interface ICategoryCardsProps {

}

const CategoryCards: FC<ICategoryCardsProps> = () => {

    const categories = useAppSelector(state => state.categoryList.categories)

    return (
        <div className='category_cards'>
            {categories.map((category, index) => 
               <Link to={`/${index}/brands/`} key={index} className="links"><Card image_link={category.image} title={category.title}/></Link> 
            )}
        </div>
    )
}

export default CategoryCards;