import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks'
import useTitle from '../../../hooks/UseTitle'
import { fetchBrands } from '../../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../../redux/types/BreadCrumbsType'
import BreadCrumbs from '../../UI/breadcrumbs/BreadCrumbs'
import Card from '../../UI/card/Card'
import CardSkeleton from '../../UI/card_skeleton/CardSkeleton'
import { pageReset } from '../../utils/pageCreator'
import './Brands.css'


interface IBrandsProps {

}

const Brands: FC<IBrandsProps> = () => {
    
    const params = useParams()
    
    const category = useAppSelector(state => state.categoryList.categories.filter(item => item.id === Number(params.category_id)))

    const brands = useAppSelector(state => state.brandList.brands)
    const isLoading = useAppSelector(state => state.brandList.isLoading)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchBrands(Number(params.category_id)))
    }, [params.category_id])

    useTitle(category[0]?.title)

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
                    {
                        isLoading ?
                            Array(9).fill(0).map(( _ , index) =>
                                <CardSkeleton key={index} />
                            )
                        
                        :

                            brands.map((brand, index) =>
                                <Link to={`/${params.category_id}/${brand.title}/${brand.id}/product-list/`} key={index} className='brand_links' onClick={pageReset} ><Card image_link={brand.image} title={brand.title}/></Link>
                            )
                    }
                </div>
        </div>
    )
}

export default Brands;