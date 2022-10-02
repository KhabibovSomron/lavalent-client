import { FC } from 'react'
import { useAppSelector } from '../../hooks/ReduxHooks'
import './Category.css'


interface ICategoryProps {

}

const Category: FC<ICategoryProps> = () => {

    const categories = useAppSelector(state => state.categoryList.categories)

    return (
        <div className='category'>
            <div className="category_container">
                {categories.map((category, index) => 
                    <a href={`/${category.url}/`} className='category_links' key={index}>{category.title}</a>
                )}
            </div>
        </div>
    )
}

export default Category;