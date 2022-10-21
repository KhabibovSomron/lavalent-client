import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks'
import { fetchProducts } from '../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../redux/types/BreadCrumbsType'
import BreadCrumbs from '../breadcrumbs/BreadCrumbs'
import ProductCard from '../product_card/ProductCard'
import './ProductList.css'


interface IProductListProps {

}

const ProductList: FC<IProductListProps> = () => {

    const params = useParams()
    const category = useAppSelector(state => state.categoryList.categories[Number(params.category_index)])
    const productList = useAppSelector(state => state.productList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (category?.id) {
            if (params.title === "All brands") {
                dispatch(fetchProducts(category?.id, null))
            } else {
                dispatch(fetchProducts(category?.id, Number(params.brand_id)))
            }
        }
    }, [category, dispatch, params])


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
            title: String(params.title),
            url: `/${Number(params.category_index)}/${params.title}/${Number(params.brand_id)}/product-list/`
        }
    ]

    return (
        <div className='productlist'>
            <h1>{params.title}</h1>
            <BreadCrumbs links={links}  />
            <div className="products_container">
                {productList.products.map((product, index) => 
                <Link to={`/${params.category_index}/brand/${params.brand_id}/product-detail/${product.id}/`} style={{textDecoration: 'none'}} key={index}>
                    <ProductCard
                        image_link={product.poster}
                        material={product.material}
                        vendor_code={product.vendor_code}
                        price={product.price}
                    />
                </Link>
                )}
            </div>
        </div>
    )
}

export default ProductList;