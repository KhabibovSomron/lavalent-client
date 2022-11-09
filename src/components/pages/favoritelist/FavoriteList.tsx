import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks'
import { fetchFavoriteProducts } from '../../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../../redux/types/BreadCrumbsType'
import { IFavoriteList } from '../../../redux/types/ProductType'
import BreadCrumbs from '../../UI/breadcrumbs/BreadCrumbs'
import Pager from '../../UI/pager/Pager'
import ProductCard from '../../UI/product_card/ProductCard'
import SaveButton from '../../UI/save_button/SaveButton'
import './FavoriteList.css'


interface IFavoriteListProps {

}

const FavoriteList: FC<IFavoriteListProps> = () => {

    const params = useParams()
    const productList = useAppSelector(state => state.productList.pages)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const list = localStorage.getItem('fav_list')
        if (list) {
            const obj: IFavoriteList = JSON.parse(list)
            dispatch(fetchFavoriteProducts(obj.products, 1))
        }
    }, [ dispatch, params])

    const onPaginationClick = (page: number) => {
        const list = localStorage.getItem('fav_list')
        if (list) {
            const obj: IFavoriteList = JSON.parse(list)
            dispatch(fetchFavoriteProducts(obj.products, page))
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

    return (
        <div className='productlist'>
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
            {Math.round(productList.count / 2) > 1 ? 
                <Pager limit={2} offset={productList.count} onClickHandler={onPaginationClick} />
            : <></>
            } 
        </div>
    )
}

export default FavoriteList;