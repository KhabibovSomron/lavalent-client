import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks'
import { fetchBrands } from '../../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../../redux/types/BreadCrumbsType'
import BreadCrumbs from '../../UI/breadcrumbs/BreadCrumbs'
import Card from '../../UI/card/Card'
import './Brands.css'


interface IBrandsProps {

}

const Brands: FC<IBrandsProps> = () => {
    
    const params = useParams()
    
    const category = useAppSelector(state => state.categoryList.categories.filter(item => item.id === Number(params.category_id)))

    const brands = useAppSelector(state => state.brandList.brands)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchBrands(Number(params.category_id)))
    }, [params.category_id, dispatch])

    const links: IBreadCrumbs[] = [
        {
            title: 'Магазин',
            url: '/'
        },
        {
            title: category[0]?.title,
            url: `/${Number(params.category_id)}/brands/`
        }
    ]

    return (
        <div className='brands'>
                <h1>{category[0]?.title}</h1>
                <BreadCrumbs links={links} />
                <div className="brands_container">
                    {brands.map((brand, index) =>
                        <Link to={`/${params.category_id}/${brand.title}/${brand.id}/product-list/`} key={index} className='brand_links' ><Card image_link={brand.image} title={brand.title}/></Link>
                    )}
                </div>
        </div>
    )
}

export default Brands;