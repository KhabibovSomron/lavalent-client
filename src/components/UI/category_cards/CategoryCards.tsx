import { FC } from 'react'
import { Link } from 'react-router-dom';
import {  useAppSelector } from '../../../hooks/ReduxHooks';
import Card from '../card/Card';
import CardSkeleton from '../card_skeleton/CardSkeleton';
import './CategoryCards.css'


interface ICategoryCardsProps {

}

const CategoryCards: FC<ICategoryCardsProps> = () => {

    const categories = useAppSelector(state => state.categoryList.categories)
    const isLoading = useAppSelector(state => state.categoryList.isLoading)

    return (
        <div className='category_cards'>
            <div className='category_cards_container'>
                {isLoading ?
                    Array(3).fill(0).map((item, index) =>
                        <CardSkeleton key={index}/>
                    ) 
                : 

                    categories.map((category, index) => 
                        <Link to={`/${category.id}/brands/`} key={index} className="links"><Card image_link={category.image} title={category.title}/></Link> 
                    )
                }
            </div>
            
        </div>
    )
}

export default CategoryCards;