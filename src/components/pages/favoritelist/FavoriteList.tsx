import { FC, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks'
import useTitle from '../../../hooks/UseTitle'
import { fetchFavoriteProducts } from '../../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../../redux/types/BreadCrumbsType'
import { IFavoriteList } from '../../../redux/types/ProductType'
import BreadCrumbs from '../../UI/breadcrumbs/BreadCrumbs'
import Pager from '../../UI/pager/Pager'
import ProductCard from '../../UI/product_card/ProductCard'
import SaveButton from '../../UI/save_button/SaveButton'
import { productLimit } from '../../utils/settings'
import './FavoriteList.css'


interface IFavoriteListProps {

}

const FavoriteList: FC<IFavoriteListProps> = () => {

    const params = useParams()
    const productList = useAppSelector(state => state.productList.pages)
    const dispatch = useAppDispatch()
    const ref: any = useRef(null)

    useEffect(() => {
        const list = localStorage.getItem('fav_list')
        if (list) {
            const obj: IFavoriteList = JSON.parse(list)
            dispatch(fetchFavoriteProducts(obj.products, 1))
        }
        if (ref) {
            window.scrollTo({
                top: ref.current.offsetTop,
                behavior: 'smooth'
            })
        }
    }, [ dispatch, params])

    const onPaginationClick = (page: number) => {
        const list = localStorage.getItem('fav_list')
        if (list) {
            const obj: IFavoriteList = JSON.parse(list)
            dispatch(fetchFavoriteProducts(obj.products, page))
            if (ref) {
                window.scrollTo({
                    top: ref.current.offsetTop,
                    behavior: 'smooth'
                })
            }
        }
    }

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
                {productList.results.map((product, index) => 
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
                )}
            </div>
            {Math.ceil(productList.count / productLimit) > 1 ? 
                <Pager limit={productLimit} offset={productList.count} onClickHandler={onPaginationClick} />
            : <></>
            } 
        </div>
    )
}

export default FavoriteList;