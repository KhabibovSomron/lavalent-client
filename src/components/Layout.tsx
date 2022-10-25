import { FC, useEffect, useRef } from "react"
import { Link, Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks"
import { fetchCategories } from "../redux/requests/ProductRequests"
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


interface ILayoutProps {

}

const Layout: FC<ILayoutProps> = () => {

  const dispatch = useAppDispatch()
  
  const storeRef = useRef(null)
  const contactRef = useRef(null)
  const aboutRef = useRef(null)
  const addressRef = useRef(null)  
  
  const favoriteCount = useAppSelector(state => state.categoryList.favoriteCount) 

  useEffect(() => {
    dispatch(fetchCategories())
    const list = localStorage.getItem('fav_list')
    if (list) {
      const obj : IFavoriteList = JSON.parse(list)
      dispatch(categoryListSlice.actions.setFavoriteCount(obj.products.length))
    }
  }, [dispatch])


  const goToSection = (ref: any) => {
    window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
    })
}

  return (
    <div className="App">
        <div className="background_block"></div>
        <div className="app_main_container">
          <Header aboutRef={aboutRef} addressRef={addressRef} contactRef={contactRef} storeRef={storeRef} goToSection={goToSection} />
          <div className="app_svg_icon">
            <svg onClick={
                () => goToSection(contactRef)
            } style={{color: '#bb0710'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" fill="#bb0710"></path> </svg>
          </div>
        </div>
        <Contacts contactRef={contactRef} />
        <Category storeRef={storeRef} />

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
        </div>


        <About aboutRef={aboutRef} />
        <Info />
        <Address addressRef={addressRef} />
        <Footer />
    </div>
  )
}

export default Layout;
