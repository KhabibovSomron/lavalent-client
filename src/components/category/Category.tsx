import { FC } from 'react'
import './Category.css'


interface ICategoryProps {

}

const Category: FC<ICategoryProps> = () => {
    return (
        <div className='category'>
            <div className="category_container">
                <a href='/' className='category_links'>Bags (Сумки)</a>
                <a href='/' className='category_links'>Shoes (Обувь)</a>
                <a href='/' className='category_links'>Accessories (Аксессуары)</a>
            </div>
        </div>
    )
}

export default Category;