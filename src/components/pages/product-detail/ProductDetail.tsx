import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks'
import { categoryListSlice } from '../../../redux/reducers/CategorySlices'
import { fetchProductDetail, fetchProductImages, fetchProductSizes } from '../../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../../redux/types/BreadCrumbsType'
import { IFavoriteList } from '../../../redux/types/ProductType'
import BreadCrumbs from '../../UI/breadcrumbs/BreadCrumbs'
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
    const [isHidden, setIsHidden] = useState(true)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchProductImages(Number(params.product_id)))
        dispatch(fetchProductDetail(Number(params.product_id)))
        dispatch(fetchProductSizes(Number(params.product_id)))
        const list = localStorage.getItem('fav_list')
        if (list) {
            const obj: IFavoriteList = JSON.parse(list)
            obj.products.forEach((id) => {
                if (id === Number(params.product_id)) {
                    setIsFavorite(true)
                }
            })
        }
    }, [dispatch, params])

    const onImageItemsClick = (index: number) => {
        setActiveIndex(index)
    }

    const category = useAppSelector(state => state.categoryList.categories.filter(item => item.id === Number(params.category_id)))

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
                url: `/${params.category_id}/${params.title}/${params.brand_id}/product-list/`
            }
        ]


    const showAllHandler = () => {
        setIsHidden(false)
    }

    const onSaveClickHandler = (id: number) => {
        
        let list = localStorage.getItem('fav_list')

        if (list) {
            let obj: IFavoriteList = JSON.parse(list)

            if (isFavorite) {
                obj.products = obj.products.filter(state => state !== id)  
                setIsFavorite(false)  
            } else {
                obj.products.push(id)
                setIsFavorite(true)
            }
            localStorage.setItem('fav_list', JSON.stringify(obj))
            dispatch(categoryListSlice.actions.setFavoriteCount(obj.products.length))
        } else {
            const obj: IFavoriteList = {
                products: [id]
            }
            localStorage.setItem('fav_list', JSON.stringify(obj))
            dispatch(categoryListSlice.actions.setFavoriteCount(obj.products.length))
            setIsFavorite(true)
        }
    }

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
                        {images.map((item, index) => {
                            if (images.length !== 1) {
                                return (
                                    <div className='gallery_item' key={index} onClick={() => onImageItemsClick(index)}>
                                        <img src={item.image} alt='' />
                                    </div>
                                )
                            } else {
                                return <div key={index}></div>
                            }
                        }
                        )}
                    </div>
                </div>
                <div className="detail_info">
                    <div className='info_breadcrumbs'>
                        <BreadCrumbs links={links}/>
                    </div>

                    {product.productDetail.material !== 'none' ?
                        <div className="info_material">
                            {product.productDetail.material}
                        </div>:
                        <></>
                    }

                    <div className="info_vendor_code">
                        Артикул {product.productDetail.vendor_code}
                    </div>

                    <div className="info_price">
                        €{product.productDetail.price}
                    </div>

                    <div className="info_size">
                        <span className='info_size_title'>Размер:</span>
                        {product.sizes.map((size, index) => 
                            <span className="info_size_item" key={index}>{size.size}</span>
                        )}
                    </div>

                    <div className={isHidden ? "info_product info_product_hidden": "info_product"}>
                        <span className="info_product_title">Информация о товаре</span>
                        <span className="info_product_brand">Бренд: {product.productDetail.brand}</span>
                        <span className="info_product_description">
                            {product.productDetail.description}
                        </span>
                        <span className="info_product_characteristic">Характеристики</span>
                        {isHidden ?
                            <div className="gradient_div"></div>
                            :
                            <></>
                        }
                        <ul className='info_product_characteristic_list'>
                            {characteristics.map((item, index) => 
                                {
                                    if(index !== characteristics.length - 1) {
                                        return <li className='characteristic_item' key={index}>{item}</li>
                                    } else {
                                        return <div key={index}></div>
                                    }
                                }
                            )}
                        </ul>

                        <p className='info_connect'>
                            Подробный фото и видео обзор данной модели, вы так-же можете уточнить у консультанта в instagram аккаунте.
                        </p>
                        
                        <span className="info_guarantees_title">
                            Наши гарантии
                        </span>
                        <ul className='info_guarantees_list'>
                            <li className='info_guarantees_item'>Доставка по всему миру</li>
                            <li className='info_guarantees_item'>Бесплатный обмен в течение 14 дней (в случае обнаружения несоответствия)</li>
                            <li className='info_guarantees_item'>Ответ на любой запрос в течение 1 рабочего дня</li>
                            <li className='info_guarantees_item'>Углеродно-нейтральная доставка для всех посылок</li>
                        </ul>
                    </div>

                    {isHidden ?
                        <div className="info_show_all" onClick={showAllHandler}>
                            Показать полностью
                        </div>
                        :
                        <></>
                    }
                    
                    <div className="info_question">
                        <span className="info_question_title">Возникли вопросы?</span>
                        <button className='info_question_button'>
                            <span className="question_button_svg">
                                <svg viewBox="0 0 22 22" xmlSpace="http://www.w3.org/2000/svg"><path fill="#008DFF" fillRule="evenodd" d="M11 3c4.507 0 8 3.301 8 7.76 0 4.46-3.493 7.76-8 7.76-.81 0-1.587-.106-2.316-.307a.638.638 0 0 0-.427.032l-1.587.7a.641.641 0 0 1-.898-.566l-.044-1.423a.645.645 0 0 0-.215-.456C3.956 15.108 3 13.093 3 10.76 3 6.301 6.493 3 11 3zm-4.936 9.44c-.233.341.22.728.566.483l2.595-1.833a.524.524 0 0 1 .594-.001l1.92 1.34c.576.402 1.4.26 1.784-.306l2.413-3.563c.233-.341-.22-.728-.566-.483l-2.593 1.831a.524.524 0 0 1-.594.002l-1.92-1.34c-.576-.402-1.4-.26-1.784.306L6.064 12.44z"></path></svg>
                            </span>
                            <span className="question_button_title">Напишите нам</span>
                        </button>
                    </div>

                    <div className="info_share">
                        <span className="info_share_title">Расскажите об этом товаре друзьям</span>
                        <div className="info_share_media">
                            <a href='/' className="info_share_facebook info_share_items">
                                <span className="info_share_svg">
                                    <svg className='info_share_facebook_svg' height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M13 0H3C1 0 0 1 0 3v10c0 2 1 3 3 3h5V9H6V7h2V5c0-2 2-2 2-2h3v2h-3v2h3l-.5 2H10v7h3c2 0 3-1 3-3V3c0-2-1-3-3-3z"></path></svg>
                                </span>
                                <span className="info_share_media_title">Поделиться</span>
                            </a>
                            
                            <a href='/' className="info_share_twitter info_share_items">
                                <span className="info_share_svg">
                                    <svg className='info_share_twitter_svg' height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353z"></path></svg>
                                </span>
                                <span className="info_share_media_title">Твитнуть</span>
                            </a>

                            <a href='/' className="info_share_pinterest info_share_items">
                                <span className="info_share_svg">
                                    <svg className='info_share_pinterest_svg' height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.99 0c-4.417 0-8 3.582-8 8 0 3.39 2.11 6.284 5.086 7.45-.07-.633-.133-1.604.028-2.295.145-.624.938-3.977.938-3.977s-.24-.48-.24-1.188c0-1.112.645-1.943 1.448-1.943.683 0 1.012.512 1.012 1.127 0 .686-.437 1.713-.663 2.664-.19.796.398 1.446 1.184 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.255-3.343-3.255-2.276 0-3.612 1.707-3.612 3.472 0 .688.265 1.425.595 1.826.065.08.075.15.055.23-.06.252-.195.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.835-4.84 5.287-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.74 4.976-4.152 4.976-.81 0-1.573-.42-1.834-.92l-.498 1.903c-.18.695-.668 1.566-.994 2.097.75.232 1.544.357 2.37.357 4.417 0 8-3.582 8-8s-3.583-8-8-8z"></path></svg> 
                                </span>
                                <span className="info_share_media_title">Запинить</span>
                            </a>
                        </div>
                    </div>

                    <div className="info_question">
                        <span className="info_question_title">Сохраните этот товар в закладках</span>
                        <button className='info_question_button' onClick={() => onSaveClickHandler(product.productDetail.id)}>
                            <span className="question_button_svg">
                                {!isFavorite ?
                                    <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><path d="M11.363 16.152a.531.531 0 0 0-.013-.013l.013.013zm-.713-.013l.012-.011a.405.405 0 0 0-.012.011zm4.854-4.674a6.124 6.124 0 0 0 .781-.908c.453-.647.715-1.3.715-1.9C17 6.924 16.055 6 14.266 6c-.786 0-1.724.57-2.563 1.4L11 8.092l-.703-.694C9.458 6.57 8.52 6 7.734 6 5.945 6 5 6.925 5 8.656c0 1.043.776 2.167 1.476 2.78L11 15.803l4.504-4.337zM18 8.656c0 1.875-1.719 3.446-1.79 3.516l-4.866 4.687A.485.485 0 0 1 11 17a.485.485 0 0 1-.344-.14l-4.875-4.704C5.72 12.102 4 10.531 4 8.656 4 6.367 5.398 5 7.734 5 9.102 5 10.383 6.078 11 6.688 11.617 6.077 12.898 5 14.266 5 16.602 5 18 6.367 18 8.656z" fillRule="evenodd"></path></svg>
                                :
                                    <svg className='save_button_svg' viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><path d="M18 8.656c0 1.875-1.719 3.446-1.79 3.516l-4.866 4.687A.485.485 0 0 1 11 17a.485.485 0 0 1-.344-.14l-4.875-4.704C5.72 12.102 4 10.531 4 8.656 4 6.367 5.398 5 7.734 5 9.102 5 10.383 6.078 11 6.688 11.617 6.077 12.898 5 14.266 5 16.602 5 18 6.367 18 8.656z" fillRule="evenodd"></path></svg>
                                }
                                
                            </span>
                            <span className="question_button_title">В {isFavorite ? 'избранном': 'избранное'}</span>
                        </button>
                        {isFavorite ?
                            <Link to='/productlist/favorites/' style={{textDecoration: 'none'}}>
                                <button className='info_question_button show_save'>
                                    <span className="question_button_title">Смотреть избранное</span>
                                </button>
                            </Link>
                            
                        : <></>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;