import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/ReduxHooks'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Category.css'


interface ICategoryProps {
    storeRef: any
}

const Category: FC<ICategoryProps> = ({ storeRef }) => {

    const categories = useAppSelector(state => state.categoryList.categories)
    const isLoading = useAppSelector(state => state.categoryList.isLoading)

    return (
        <div className='category' ref={storeRef}>
            <div className="category_container">
                {
                    isLoading ?
                    Array(3).fill(0).map((item, index) =>
                        <Skeleton key={index} className='category-skeleton'/>
                    ) 
                    : 
                    categories.map((category, index) => 
                        <Link to={`/${category.id}/brands/`} className='category_links' key={index} >{category.title}</Link>
                    )
                }
            </div>
        </div>
    )
}

export default Category;