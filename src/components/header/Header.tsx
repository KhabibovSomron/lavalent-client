import { FC } from 'react'
import './Header.css'

interface IHeaderProps {

}

const Header: FC<IHeaderProps> = () => {
    return (
        <div className='header'>
        <div className='header_links_container'>
            <div className='header_logo'></div>
            <div className='header_menu'>
                <ul>
                   <li className='header_menu_links'><a href='/anime'>Магазин</a></li>
                   <li className='header_menu_links'><a href='/anime'>О нас</a></li>
                   <li className='header_menu_links'><a href='/anime'>Адрес</a></li>
                   <li className='header_menu_links'><a href='/anime'>Контакты</a></li> 
                </ul>
            </div>
        </div>
        <div className='header_search'></div>
        </div>
    )
}

export default Header;