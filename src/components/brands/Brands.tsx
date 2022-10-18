import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks'
import { fetchBrands } from '../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../redux/types/BreadCrumbsType'
import BreadCrumbs from '../breadcrumbs/BreadCrumbs'
import Card from '../card/Card'
import './Brands.css'


interface IBrandsProps {

}

const Brands: FC<IBrandsProps> = () => {
    
    const params = useParams()
    
    const category = useAppSelector(state => state.categoryList.categories[Number(params.category_index)])

    const brands = useAppSelector(state => state.brandList.brands)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (category?.id) {
            dispatch(fetchBrands(category?.id))
        }
    }, [category, dispatch])

    const links: IBreadCrumbs[] = [
        {
            title: 'Магазин',
            url: '/'
        },
        {
            title: category?.title,
            url: `/${Number(params.category_index)}/brands/`
        }
    ]

    return (
        <div className='brands'>
                <h1>{category?.title}</h1>
                <BreadCrumbs links={links} />
                <div className="brands_container">
                    {brands.map((brand, index) =>
                        <Link to={`/${params.category_index}/brands/${index}/product-list/`} key={index} className='brand_links' ><Card image_link={brand.image} title={brand.title}/></Link>
                    )}
                </div>
        </div>
    )
}

export default Brands;