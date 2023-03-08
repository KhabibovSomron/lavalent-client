import { FC, lazy } from "react"
import { Route, Routes } from "react-router-dom";
import './App.css';


const CategoryCards = lazy(() => import("./components/UI/category_cards/CategoryCards"))
const Brands = lazy(() => import("./components/pages/brands/Brands"))
const ProductDetail = lazy(() => import("./components/pages/product-detail/ProductDetail"))
const ProductList = lazy(() => import("./components/pages/productlist/ProductList"))
const FavoriteList = lazy(() => import("./components/pages/favoritelist/FavoriteList"))
const FoundList = lazy(() => import("./components/pages/foundlist/FoundList"))
const Layout = lazy(() => import("./components/Layout"))

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
