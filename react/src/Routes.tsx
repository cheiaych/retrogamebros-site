import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Home from "./pages/Home/Home"
import Products from "./pages/Search/Search"
import NotFound from "./pages/NotFound/NotFound"
import Admin from "./pages/Admin/Admin"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Brand from "./pages/Brands/Brands"
import Consoles from "./pages/Consoles/Consoles"
import Games from "./pages/Products/Products"

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="search" element={<Products/>}/>
            <Route path="brands" element={<Brand/>}/>
            <Route path="products/:brand" element={<Consoles/>}/>
            <Route path="products/:brand/:con" element={<Games/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="contact" element={<Contact/>}/>

            <Route path="admin" element={<Admin/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}