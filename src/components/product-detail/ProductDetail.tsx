import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks'
import { fetchProductDetail, fetchProductImages } from '../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../redux/types/BreadCrumbsType'
import BreadCrumbs from '../breadcrumbs/BreadCrumbs'
import './ProductDetail.css'


interface IProductDetailProps {

}

const ProductDetail: FC<IProductDetailProps> = () => {

    const params = useParams()
    const images = useAppSelector(state => state.productList.images)
    const product = useAppSelector(state => state.productDetail)
    const characteristics = product.productDetail.characteristic.split(".")
    const dispatch = useAppDispatch()
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        dispatch(fetchProductImages(Number(params.product_id)))
        dispatch(fetchProductDetail(Number(params.product_id)))
    }, [dispatch, params])


    const onImageItemsClick = (index: number) => {
        setActiveIndex(index)
    }

    const category = useAppSelector(state => state.categoryList.categories[Number(params.category_index)])

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
            title: product.productDetail.brand,
            url: `/${params.category_index}/${product.productDetail.brand}/${params.brand_id}/product-list/`
        }
    ]

    return (
        <div className='product_detail'>
            <div className="button_container">
                    <div className="button left_border">
                        <svg className='button_svg' viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 3.85l-8.9 9.02 8.9 9.27c.66.65.66 1.71 0 2.36-.67.65-1.74.65-2.4 0L6 14.06c-.33-.33-.5-.76-.5-1.18 0-.43.17-.86.5-1.18L16.1 1.49c.66-.65 1.74-.65 2.41 0 .66.65.66 1.71-.01 2.36z"></path></svg>
                    </div>
                    <div className="button right_border">
                        <svg className='button_svg' viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 22.15l8.9-9.02-8.9-9.28c-.66-.65-.66-1.71 0-2.36.67-.65 1.74-.65 2.4 0L20 11.94c.33.33.5.76.5 1.18 0 .43-.17.86-.5 1.18L9.9 24.51c-.66.65-1.74.65-2.41 0-.66-.65-.66-1.71.01-2.36z"></path></svg>
                    </div>
            </div>

            <div className="detail">
                <div className="detail_gallery">
                    <div className="gallery_image">
                        <img src={images[activeIndex]?.image} alt="" />
                    </div>
                    <div className="gallery_images">
                        {images.map((item, index) => 
                            <div className='gallery_item' key={index} onClick={() => onImageItemsClick(index)}>
                                <img src={item.image} alt='' />
                            </div>
                        )}
                    </div>
                </div>
                <div className="detail_info">
                    <div className='info_breadcrumbs'>
                        <BreadCrumbs links={links}/>
                    </div>

                    <div className="info_vendor_code">
                        Артикул {product.productDetail.vendor_code}
                    </div>

                    <div className="info_price">
                        €{product.productDetail.price}
                    </div>

                    <div className="info_size">
                        <span className='info_size_title'>Размер:</span>
                        <span className="info_size_item">36-42 EU</span>
                    </div>

                    <div className="info_product">
                        <span className="info_product_title">Информация о товаре</span>
                        <span className="info_product_brand">Бренд: {product.productDetail.brand}</span>
                        <span className="info_product_description">
                            {product.productDetail.description}
                        </span>
                        <span className="info_product_characteristic">Характеристики</span>
                        <ul>
                            {characteristics.map((item, index) => 
                                {
                                    if(index !== characteristics.length - 1) {
                                        return <li className='characteristic_item' key={index}>{item}</li>
                                    } else {
                                        return <></>
                                    }
                                }
                            )}
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;