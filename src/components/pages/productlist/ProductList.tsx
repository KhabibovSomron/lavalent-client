import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks'
import { fetchProducts } from '../../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../../redux/types/BreadCrumbsType'
import BreadCrumbs from '../../UI/breadcrumbs/BreadCrumbs'
import Ordering from '../../UI/order/Ordering'
import Pager from '../../UI/pager/Pager'
import ProductCard from '../../UI/product_card/ProductCard'
import './ProductList.css'


interface IProductListProps {

}

const ProductList: FC<IProductListProps> = () => {

    const params = useParams()
    const category = useAppSelector(state => state.categoryList.categories.filter(item => item.id === Number(params.category_id)))
    const productList = useAppSelector(state => state.productList.pages)
    const dispatch = useAppDispatch()

    const [order, setOrder] = useState<string>("")

    useEffect(() => {
        
        if (params.title === "All brands") {
            dispatch(fetchProducts(Number(params.category_id), null, 1, order))
        } else {
            dispatch(fetchProducts(Number(params.category_id), Number(params.brand_id), 1, order))
        }
        
    }, [dispatch, params, order])


    const links: IBreadCrumbs[] = [
        {
            title: 'Магазин',
            url: '/'
        },
        {
            title: category[0]?.title,
            url: `/${Number(params.category_id)}/brands/`
        },
        {
            title: String(params.title),
            url: `/${Number(params.category_id)}/${params.title}/${Number(params.brand_id)}/product-list/`
        }
    ]

    const onPaginationClick = (page: number) => { 
        if (params.title === "All brands") {
            dispatch(fetchProducts(Number(params.category_id), null, page, order))
        } else {
            dispatch(fetchProducts(Number(params.category_id), Number(params.brand_id), page, order))
        }
        
    }

    return (
        <div className='productlist'>
            <h1>{params.title}</h1>
            <BreadCrumbs links={links}  />
            <Ordering setValue={setOrder} value={order} />
            <div className="products_container">
                {productList.results.map((product, index) => 
                <Link to={`/${params.category_id}/${params.title}/${params.brand_id}/product-detail/${product.id}/`} style={{textDecoration: 'none'}} key={index}>
                    <ProductCard
                        image_link={product.poster}
                        material={product.material}
                        vendor_code={product.vendor_code}
                        price={product.price}
                    />
                </Link>
                )}
            </div>
            {Math.round(productList.count / 2) > 1 ? 
                <Pager limit={2} offset={productList.count} onClickHandler={onPaginationClick} pageLimit={7} />
            : <></>
            } 
        </div>
    )
}

export default ProductList;