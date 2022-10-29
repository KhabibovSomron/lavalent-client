import { FC } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

interface IHeaderProps {
    storeRef: any,
    addressRef: any,
    contactRef: any,
    aboutRef: any,
    goToSection: Function
}

const Header: FC<IHeaderProps> = ({storeRef, addressRef, contactRef, aboutRef, goToSection}) => {

    return (
        <div className='header'>
        <div className='header_links_container'>
        <Link className='span_link' to='/'><div className='header_logo' onClick={() => goToSection(storeRef)}></div></Link>
            
            <div className='header_menu'>
                <ul>
                   <li className='header_menu_items'><span className='header_menu_links' onClick={
                    () => goToSection(aboutRef)
                   }>О нас</span></li>
                   <li className='header_menu_items'><span className='header_menu_links' onClick={
                    () => goToSection(addressRef)
                   }>Адрес</span></li>
                   <li className='header_menu_items'><span className='header_menu_links' onClick={
                    () => goToSection(contactRef)
                   }>Контакты</span></li> 
                </ul>
            </div>
        </div>
        </div>
    )
}

export default Header;