import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/ReduxHooks'
import { IBreadCrumbs } from '../../redux/types/BreadCrumbsType'
import BreadCrumbs from '../breadcrumbs/BreadCrumbs'
import './ProductList.css'


interface IProductListProps {

}

const ProductList: FC<IProductListProps> = () => {

    const params = useParams()
    const category = useAppSelector(state => state.categoryList.categories[Number(params.category_index)])
    const brand = useAppSelector(state => state.brandList.brands[Number(params.brand_index)])

    const links: IBreadCrumbs[] = [
        {
            title: 'Магазин',
            url: '/'
        },
        {
            title: category?.title,
            url: `/${Number(params.category_index)}/brands/`
        },
        {
            title: brand?.title,
            url: `/${Number(params.category_index)}/brands/${Number(params.brand_index)}/productlist/`
        }
    ]

    return (
        <div className='productlist'>
            <h1>{brand?.title}</h1>
            <BreadCrumbs links={links}  />
            <div className="products_container">

            </div>
        </div>
    )
}

export default ProductList;