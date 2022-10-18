import { FC } from "react"
import { Route, Routes } from "react-router-dom";
import './App.css'
import Brands from "./components/brands/Brands";
import CategoryCards from "./components/category_cards/CategoryCards";
import Layout from "./components/Layout";
import ProductList from "./components/productlist/ProductList";



interface IAppProps {

}

const App: FC<IAppProps> = () => {

  return (
    <>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CategoryCards />} />
            <Route path=':category_index/brands/' element={<Brands />} />
            <Route path=':category_index/brands/:brand_index/product-list/' element={<ProductList />} />
          </Route>
      </Routes>
    </>
  )
}

export default App;
