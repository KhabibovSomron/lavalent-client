import { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks'
import useTitle from '../../../hooks/UseTitle'
import { fetchFavoriteProducts } from '../../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../../redux/types/BreadCrumbsType'
import { IFavoriteList } from '../../../redux/types/ProductType'
import BreadCrumbs from '../../UI/breadcrumbs/BreadCrumbs'
import CardSkeleton from '../../UI/card_skeleton/CardSkeleton'
import Pager from '../../UI/pager/Pager'
import ProductCard from '../../UI/product_card/ProductCard'
import SaveButton from '../../UI/save_button/SaveButton'
import { productLimit } from '../../utils/settings'
import './FavoriteList.css'


interface IFavoriteListProps {

}

const FavoriteList: FC<IFavoriteListProps> = () => {

    
    const productList = useAppSelector(state => state.productList.pages)
    const isLoading = useAppSelector(state => state.productList.isLoading)
    const dispatch = useAppDispatch()
    const ref: any = useRef(null)
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        const localStorageData = {
            type: 'none'
        }
        localStorage.setItem('request_options', JSON.stringify(localStorageData))
        
        const list = localStorage.getItem('fav_list')
        const page = localStorage.getItem('current_page')
        if (list && page) {
            const obj: IFavoriteList = JSON.parse(list)
            dispatch(fetchFavoriteProducts(obj.products, Number(page)))
        }
        if (ref) {
            window.scrollTo({
                top: ref.current.offsetTop,
                behavior: 'smooth'
            })
        }
    }, [currentPage])


    const links: IBreadCrumbs[] = [
        {
            title: 'Магазин',
            url: '/'
        },
        {
            title: 'Израбнное',
            url: `/productlist/favorites/`
        }
    ]

    useTitle('Мое Избранное')

    return (
        <div className='productlist' ref={ref}>
            <h1>Мое Избранное</h1>
            <BreadCrumbs links={links}  />
            <div className="products_container">
                {
                    isLoading ?
                        Array(9).fill(0).map(( _ , index) => 
                            <CardSkeleton key={index} />
                        )
                    :
                        productList.results.map((product, index) => 
                        <div className='product_container' key={index}>
                            <Link to={`/${product.category}/${product.brand.title}/${product.brand.id}/product-detail/${product.id}/`} style={{textDecoration: 'none'}}>
                            <ProductCard
                                image_link={product.poster}
                                material={product.material}
                                vendor_code={product.vendor_code}
                                price={product.price}
                            />
                        </Link>

                        <SaveButton id={product.id} isFavorite={true} />
                        </div>
                        )
                }
            </div>
            {Math.ceil(productList.count / productLimit) > 1 ? 
                <Pager limit={productLimit} offset={productList.count} setCurrentPage={setCurrentPage} />
            : <></>
            } 
        </div>
    )
}

export default FavoriteList;