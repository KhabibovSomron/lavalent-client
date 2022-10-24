import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/ReduxHooks'

import './Category.css'


interface ICategoryProps {
    storeRef: any
}

const Category: FC<ICategoryProps> = ({ storeRef }) => {

    const categories = useAppSelector(state => state.categoryList.categories)

    return (
        <div className='category' ref={storeRef}>
            <div className="category_container">
                {categories.map((category, index) => 
                    <Link to={`/${index}/brands/`} className='category_links' key={index} >{category.title}</Link>
                )}
            </div>
        </div>
    )
}

export default Category;