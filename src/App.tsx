import { FC } from "react"
import './App.css'
import About from "./components/about/About";
import Address from "./components/address/Address";
import Category from "./components/category/Category";
import Contacts from "./components/contacts/Contacts";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Info from "./components/info/Info";
import Adapter from "./components/routes/Adapter";


interface IAppProps {

}

const App: FC<IAppProps> = () => {
  return (
    <div className="App">
      <div className="background_block"></div>
      <div className="app_main_container">
        <Header />
        <div className="app_svg_icon">
        <svg style={{color: '#bb0710'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" fill="#bb0710"></path> </svg>
        </div>
      </div>
      
      <Contacts />
      <Category />
      <Adapter />
      <About />
      <Info />
      <Address />
      <Footer />
    </div>
  )
}

export default App;
