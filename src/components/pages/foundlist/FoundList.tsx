import { ChangeEvent, FC, useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/ReduxHooks'
import useTitle from '../../../hooks/UseTitle'
import { fetchFoundProducts } from '../../../redux/requests/ProductRequests'
import { IBreadCrumbs } from '../../../redux/types/BreadCrumbsType'
import BreadCrumbs from '../../UI/breadcrumbs/BreadCrumbs'
import CardSkeleton from '../../UI/card_skeleton/CardSkeleton'
import Ordering from '../../UI/order/Ordering'
import Pager from '../../UI/pager/Pager'
import ProductCard from '../../UI/product_card/ProductCard'
import { productLimit } from '../../utils/settings'
import './FoundList.css'


interface IFoundListProps {

}

const FoundList: FC<IFoundListProps> = () => {

    const params = useParams()
    const productList = useAppSelector(state => state.productList.pages)
    const isLoading = useAppSelector(state => state.productList.isLoading)
    const dispatch = useAppDispatch()
    const [keywords, setKeywords] = useState<string>(String(params.keywords))
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [order, setOrder] = useState<string>('')
    const myHistory = useNavigate()
    const ref: any = useRef(null)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const setLocalStorage = (localKeyword: string, order: string) => {
        const localStorageData = {
            type: 'foundProducts',
            keywords: localKeyword,
            order: order
        }

        localStorage.setItem('request_options', JSON.stringify(localStorageData))
    }

    useEffect(() => {
        let localStorageData = {}
        const page = localStorage.getItem('current_page')
        if (page) {
            setKeywords(String(params.keywords))

            setLocalStorage(String(params.keywords), order)
            
            dispatch(fetchFoundProducts(keywords, Number(page), order))
            if (ref) {
                window.scrollTo({
                    top: ref.current?.offsetTop,
                    behavior: 'smooth'
                })
            }
        }
    }, [params.keywords, order, currentPage])


    const links: IBreadCrumbs[] = [
        {
            title: 'Магазин',
            url: '/'
        },
        {
            title: productList.count !== 0 ? `Поиск: нашлось ${productList.count}`: 'Поиск: ничего не нашлось',
            url: `/productlist/favorites/`
        }
    ]

    const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeywords(event.target.value)
    }

    const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLocalStorage(keywords, order)
        localStorage.setItem('current_page', '1')
        dispatch(fetchFoundProducts(keywords, 1, order))
        myHistory(`/search/${keywords}/`)
    }

    useTitle('Поиск товаров')

    return (
        <div className='productlist' ref={ref}>
            <h1>Поиск товаров</h1>
            <BreadCrumbs links={links}  />
            <div className='search_find'>
                <div className='search_find_container'>
                    <form className={isFocus ? 'search_find_form search_find_input_focus ' : 'search_find_form'} onSubmit={onSubmit}>
                    <button className="search_find_icon" type="submit">
                        <svg className="search_find_icon_svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fillRule="evenodd"><path  d="M14.335 17.528c4.357 0 7.89-3.532 7.89-7.89 0-4.357-3.533-7.89-7.89-7.89-4.358 0-7.89 3.533-7.89 7.89 0 4.358 3.532 7.89 7.89 7.89zm0 1c-4.91 0-8.89-3.98-8.89-8.89s3.98-8.89 8.89-8.89 8.89 3.98 8.89 8.89-3.98 8.89-8.89 8.89z"></path><path d="M7.537 15.292L.684 22.146c-.39.39-.39 1.023 0 1.414.39.39 1.023.39 1.414 0l6.853-6.854c.392-.39.392-1.023 0-1.414-.39-.39-1.022-.39-1.413 0z"></path></g></svg>
                    </button>
                    <input type='text' className={"search_find_input"} placeholder="Поиск товаров" onChange={onSearchInputChange}  onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} value={keywords} />
                    </form>
                
                </div>
            </div>
            {productList.count !== 0 ?
            <Ordering setValue={setOrder} value={order} />
            : <></>
            }
            
                <div className="products_container">

                    {
                        isLoading ?
                        Array(4).fill(0).map(( _ , index) => 
                            <CardSkeleton key={index} />
                        )
                    :
                        productList.count !== 0 ?

                            productList.results.map((product, index) => 
                                <Link to={`/${product.category}/${product.brand.title}/${product.brand.id}/product-detail/${product.id}/`} style={{textDecoration: 'none'}} key={index}>
                                    <ProductCard
                                        image_link={product.poster}
                                        material={product.material}
                                        vendor_code={product.vendor_code}
                                        price={product.price}
                                    />
                                </Link>
                            )
                        : <div className='not_found'>По вашему запросу ничего не нашлось</div>

                    }
                </div>
            {Math.ceil(productList.count / productLimit) > 1 ? 
                <Pager limit={productLimit} offset={productList.count} setCurrentPage={setCurrentPage} />
            : <></>
            } 
        </div>
    )
}

export default FoundList;