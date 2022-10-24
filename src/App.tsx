import { FC } from "react"
import { Route, Routes } from "react-router-dom";
import './App.css'
import Brands from "./components/pages/brands/Brands";
import CategoryCards from "./components/UI/category_cards/CategoryCards";
import Layout from "./components/Layout";
import ProductDetail from "./components/pages/product-detail/ProductDetail";
import ProductList from "./components/pages/productlist/ProductList";



interface IAppProps {

}

const App: FC<IAppProps> = () => {

  return (
    <>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CategoryCards />} />
            <Route path=':category_index/brands/' element={<Brands />} />
            <Route path=':category_index/:title/:brand_id/product-list/' element={<ProductList />} />
            <Route path=':category_index/:title/:brand_id/product-detail/:product_id/' element={<ProductDetail />} />
          </Route>
      </Routes>
    </>
  )
}

export default App;
