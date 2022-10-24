import { FC } from 'react';
import CategoryCards from '../UI/category_cards/CategoryCards';
import './Adapter.css';
import { Routes, Route } from 'react-router-dom';
import Brands from '../pages/brands/Brands';
import ProductList from '../pages/productlist/ProductList';


interface IAdapterProps {

}

const Adapter: FC<IAdapterProps> = () => {
    return (
        <div className='adapter'>
            
            <div className='favourites'>
                <div className="favourites_button">
                    <svg className='favourites_icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                    <a className='favourites_link' href='/'>Избранное</a>
                </div>
            </div>
        </div>
    )
}

export default Adapter;