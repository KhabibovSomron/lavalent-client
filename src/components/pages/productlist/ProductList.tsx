import { FC, useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks'
import useTitle from '../../../hooks/UseTitle'
import { fetchProducts } from '../../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../../redux/types/BreadCrumbsType'
import BreadCrumbs from '../../UI/breadcrumbs/BreadCrumbs'
import CardSkeleton from '../../UI/card_skeleton/CardSkeleton'
import Ordering from '../../UI/order/Ordering'
import Pager from '../../UI/pager/Pager'
import ProductCard from '../../UI/product_card/ProductCard'
import { productLimit } from '../../utils/settings'
import './ProductList.css'


interface IProductListProps {

}

const ProductList: FC<IProductListProps> = () => {

    const params = useParams()
    const category = useAppSelector(state => state.categoryList.categories.filter(item => item.id === Number(params.category_id)))
    const productList = useAppSelector(state => state.productList.pages)
    const dispatch = useAppDispatch()
    const [order, setOrder] = useState<string>("")
    const ref: any = useRef(null)
    const isLoading = useAppSelector(state => state.productList.isLoading)
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        let localStorageData = {}
        const page = localStorage.getItem('current_page')
        if (page) {
            if (params.title === "All brands") {
                dispatch(fetchProducts(Number(params.category_id), null, Number(page), order))
                localStorageData = {
                    type: 'productList',
                    category_id: params.category_id,
                    brand_id: null,
                    order: order
                }
            } else {
                dispatch(fetchProducts(Number(params.category_id), Number(params.brand_id), Number(page), order))
                localStorageData = {
                    type: 'productList',
                    category_id: params.category_id,
                    brand_id: params.brand_id,
                    order: order
                }
            }
            localStorage.setItem('request_options', JSON.stringify(localStorageData))
            
            if (ref.current !== null) {
                window.scrollTo({
                    top: ref.current.offsetTop,
                    behavior: 'smooth'
                })
            }
        }
    }, [params, order, currentPage])

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


    useTitle(String(params.title))

    return (
        <div className='productlist' ref={ref}>
            <h1>{params.title}</h1>
            <BreadCrumbs links={links}  />
            <Ordering setValue={setOrder} value={order} />
            <div className="products_container">
                {
                    isLoading ?
                        Array(9).fill(0).map(( _ , index) => 
                            <CardSkeleton key={index} />
                        )
                    :
                    productList.results.map((product, index) => 
                        <Link to={`/${params.category_id}/${params.title}/${params.brand_id}/product-detail/${product.id}/`} style={{textDecoration: 'none'}} key={index}>
                            <ProductCard
                                image_link={product.poster}
                                material={product.material}
                                vendor_code={product.vendor_code}
                                price={product.price}
                            />
                        </Link>
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

export default ProductList;