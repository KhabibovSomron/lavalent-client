import { FC, useEffect, useRef, useState, ChangeEvent, useMemo } from "react"
import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks"
import { fetchCategories, fetchRandomProducts } from "../redux/requests/ProductRequests"
import About from "./UI/about/About"
import Address from "./UI/address/Address"
import Category from "./UI/category/Category"
import Contacts from "./UI/contacts/Contacts"
import Footer from "./UI/footer/Footer"
import Header from "./UI/header/Header"
import Info from "./UI/info/Info"
import './Layout.css'
import { IFavoriteList } from "../redux/types/ProductType"
import { categoryListSlice } from "../redux/reducers/CategorySlices"
import useOutsideAlerter from "../hooks/UseOutSide"
import RandomCard from "./UI/random_card/RandomCard"
import Sidebar from "./UI/sidebar/Sidebar"
import useOutsideBarAlerter from "../hooks/UseOutSideBar"


interface ILayoutProps {

}

const Layout: FC<ILayoutProps> = () => {

  const dispatch = useAppDispatch()

  const storeRef = useRef(null)
  const contactRef: any = useRef(null)
  const aboutRef = useRef(null)
  const addressRef = useRef(null)  
  const searchButtonRef: any = useRef(null)
  
  const params = useParams()
  const randomProducts = useAppSelector(state => state.productList.random_products)

  const favoriteCount = useAppSelector(state => state.categoryList.favoriteCount) 
  const [isFixed, setIsFixed] = useState<boolean>(false)
  const {ref, isShow, setIsShow} = useOutsideAlerter(false)
  const {sideBarRef, isSidebarActive, setIsSidebarActive} = useOutsideBarAlerter(false)

  const [keywords, setKeywords] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
    const list = localStorage.getItem('fav_list')
    if (list) {
      const obj : IFavoriteList = JSON.parse(list)
      dispatch(categoryListSlice.actions.setFavoriteCount(obj.products.length))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchRandomProducts())
  }, [dispatch, params])


  const goToSection = (ref: any) => {
    window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
    })
}

window.onscroll = () => {
  if (searchButtonRef !== null) {
    if (window.pageYOffset + 20 > contactRef.current.offsetTop) {
      setIsFixed(true)
    } else {
      setIsFixed(false)
    }
  }
}

const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  setKeywords(event.target.value)
}

const onSubmitHandler = (event: ChangeEvent<HTMLFormElement>) => {
  event.preventDefault()
  navigate(`/search/${keywords}/`)
  setIsShow(false)
}
const categoryListError = useAppSelector(state => state.categoryList.error)
const brandListError = useAppSelector(state => state.brandList.error)
const productListError = useAppSelector(state => state.productList.error)
const productDetailError = useAppSelector(state => state.productDetail.error)

const error = useMemo<boolean>(() => {
  if (categoryListError !== '' || brandListError !== '' || productListError !== '' || productDetailError !== '') {
    return true
  } else {
    return false
  }
}, [categoryListError, brandListError, productListError, productDetailError]) 

return (
    <div className="App">
            <div className={error ? "not_connection" : 'not_connection_disable'}>
              <div className="not_connection_container">
                <div className="not_connection_title">Вы не в сети</div>
                <div className="not_connection_description">Подключитесь к интернету, чтобы увидеть наши товары.</div>
              </div>
            </div>
            <div className={isSidebarActive ? 'sidebar sidebar_active': 'sidebar'}>
            </div>
            <Sidebar isActive={isSidebarActive} setIsActive={setIsSidebarActive} sideRef={sideBarRef} />

            { !error ?
            <div className={isFixed ? "search_button search_button_fixed" :"search_button"} ref={searchButtonRef} onClick={() => setIsShow(true)} style={!isFixed ? {top: contactRef.current?.offsetTop + 32}: {}}>
                <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M21 25c5.523 0 10-4.477 10-10S26.523 5 21 5 11 9.477 11 15s4.477 10 10 10z" strokeWidth="2"></path><path d="M13.514 22.486L5.5 30.5" strokeWidth="3" strokeLinecap="round"></path></g></svg>
            </div>
            : <></>
            }
            { !error ?
        <a  href='https://t.me/Lavalentbags' target='_blank' className="message_button_link" rel="noopener">
          <div className="message_button">
            <svg width="60" height="60" viewBox="0 0 60 60"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g><circle fill="#bb0710" cx="30" cy="30" r="30"></circle><svg x="10" y="10"><g transform="translate(0.000000, -10.000000)" fill="#FFFFFF"><g transform="translate(0.000000, 10.000000)"><path d="M20,0 C31.2666,0 40,8.2528 40,19.4 C40,30.5472 31.2666,38.8 20,38.8 C17.9763,38.8 16.0348,38.5327 14.2106,38.0311 C13.856,37.9335 13.4789,37.9612 13.1424,38.1098 L9.1727,39.8621 C8.1343,40.3205 6.9621,39.5819 6.9273,38.4474 L6.8184,34.8894 C6.805,34.4513 6.6078,34.0414 6.2811,33.7492 C2.3896,30.2691 0,25.2307 0,19.4 C0,8.2528 8.7334,0 20,0 Z M7.99009,25.07344 C7.42629,25.96794 8.52579,26.97594 9.36809,26.33674 L15.67879,21.54734 C16.10569,21.22334 16.69559,21.22164 17.12429,21.54314 L21.79709,25.04774 C23.19919,26.09944 25.20039,25.73014 26.13499,24.24744 L32.00999,14.92654 C32.57369,14.03204 31.47419,13.02404 30.63189,13.66324 L24.32119,18.45264 C23.89429,18.77664 23.30439,18.77834 22.87569,18.45674 L18.20299,14.95224 C16.80079,13.90064 14.79959,14.26984 13.86509,15.75264 L7.99009,25.07344 Z"></path></g></g></svg></g></g></svg>
          </div>
        </a>
        : <></>
        }

        <div className={isShow ? "search_box": "search_box_disable"} ref={ref} >
          <form className="search_box_container" onSubmit={onSubmitHandler}>
            <button className="search_box_icon" type="submit">
              <svg className="search_box_icon_svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fillRule="evenodd"><path  d="M14.335 17.528c4.357 0 7.89-3.532 7.89-7.89 0-4.357-3.533-7.89-7.89-7.89-4.358 0-7.89 3.533-7.89 7.89 0 4.358 3.532 7.89 7.89 7.89zm0 1c-4.91 0-8.89-3.98-8.89-8.89s3.98-8.89 8.89-8.89 8.89 3.98 8.89 8.89-3.98 8.89-8.89 8.89z"></path><path d="M7.537 15.292L.684 22.146c-.39.39-.39 1.023 0 1.414.39.39 1.023.39 1.414 0l6.853-6.854c.392-.39.392-1.023 0-1.414-.39-.39-1.022-.39-1.413 0z"></path></g></svg>
            </button>
            <input type='text' className="search_box_input" placeholder="Поиск товаров" onChange={onSearchInputChange} />
          </form>
        </div>
        
        <div className="background_block"></div>
        <div className="app_main_container">
          <Header aboutRef={aboutRef} addressRef={addressRef} contactRef={contactRef} storeRef={storeRef} goToSection={goToSection} />
          <div className="app_svg_icon">
            <svg onClick={
                () => goToSection(contactRef)
            } style={{color: '#bb0710'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" fill="#bb0710"></path> </svg>
          </div>
        </div>
        <div className="app_content">
          <Contacts contactRef={contactRef} />
              { !error ?
                <div>
                  <Category storeRef={storeRef} />
                  <div className="phone_category">
                    <div className="phone_category_button" onClick={() => setIsSidebarActive(!isSidebarActive)}>
                      <svg className="phone_category_button_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.533 438.533"><path d="M420.265 328.897H18.275c-4.953 0-9.236 1.813-12.852 5.428C1.807 337.938 0 342.225 0 347.172v36.548c0 4.95 1.807 9.23 5.424 12.848 3.62 3.613 7.902 5.424 12.85 5.424h401.992c4.948 0 9.23-1.81 12.847-5.424 3.614-3.617 5.42-7.898 5.42-12.848v-36.548c0-4.948-1.8-9.233-5.42-12.847-3.618-3.614-7.896-5.428-12.848-5.428zM433.112 41.968c-3.617-3.617-7.898-5.426-12.847-5.426H18.275c-4.953 0-9.236 1.81-12.852 5.426C1.807 45.583 0 49.866 0 54.813V91.36c0 4.95 1.807 9.23 5.424 12.847 3.62 3.618 7.902 5.424 12.85 5.424h401.992c4.948 0 9.23-1.806 12.847-5.423 3.614-3.617 5.42-7.898 5.42-12.847V54.813c0-4.947-1.804-9.23-5.42-12.845zM420.265 182.72H18.275c-4.953 0-9.236 1.81-12.852 5.426C1.807 191.76 0 196.044 0 200.992v36.547c0 4.947 1.807 9.235 5.424 12.846 3.62 3.614 7.902 5.428 12.85 5.428h401.992c4.948 0 9.23-1.813 12.847-5.428 3.614-3.61 5.42-7.898 5.42-12.847V200.99c0-4.948-1.806-9.23-5.42-12.847-3.618-3.617-7.896-5.425-12.848-5.425z"></path></svg>
                      <span>Категории</span>
                    </div>
                  </div>
                </div>
                
              : <></>
              }
          { !error ?
            <div className='adapter'>
              
              <Outlet />

              <div className='favourites'>
                <Link to='/productlist/favorites/' style={{textDecoration: 'none'}}>
                  <div className="favourites_button">
                      <svg className='favourites_icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                      <div className='favourites_link'>Избранное {favoriteCount !== 0 ? `(${favoriteCount})`: '' }</div>
                  </div>
                </Link>
                  
              </div>

              <div className="random_products">
                <h1 className="random_products_title">
                  Вам может понравиться
                </h1>
                <div className="random_products_container">
                  {randomProducts.map((product, index) =>
                  <Link to={`/${product.category}/${product.brand.title}/${product.brand.id}/product-detail/${product.id}/`} style={{textDecoration: 'none'}} key={index}>
                    <RandomCard image_link={product.poster} price={product.price} />
                  </Link>
                  )}
                </div>
              </div>
          </div>
          : <></>
          }


          <About aboutRef={aboutRef} />
          <Info />
          <Address addressRef={addressRef} />
          <Footer />
        </div>
        
    </div>
  )
}

export default Layout;
