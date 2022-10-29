import { FC } from "react"
import { Route, Routes } from "react-router-dom";
import './App.css'
import Brands from "./components/pages/brands/Brands";
import CategoryCards from "./components/UI/category_cards/CategoryCards";
import Layout from "./components/Layout";
import ProductDetail from "./components/pages/product-detail/ProductDetail";
import ProductList from "./components/pages/productlist/ProductList";
import FavoriteList from "./components/pages/favoritelist/FavoriteList";
import FoundList from "./components/pages/foundlist/FoundList";



interface IAppProps {

}

const App: FC<IAppProps> = () => {

  return (
    <>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CategoryCards />} />
            <Route path=':category_id/brands/' element={<Brands />} />
            <Route path=':category_id/:title/:brand_id/product-list/' element={<ProductList />} />
            <Route path=':category_id/:title/:brand_id/product-detail/:product_id/' element={<ProductDetail />} />
            <Route path='productlist/favorites/' element={<FavoriteList />} />
            <Route path='search/:keywords/' element={<FoundList />} />
          </Route>
      </Routes>
    </>
  )
}

export default App;
