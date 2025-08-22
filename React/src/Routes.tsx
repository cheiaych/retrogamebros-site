import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Home from "./pages/Home/Home"
import Products from "./pages/Products"
import NotFound from "./pages/NotFound"
import Admin from "./pages/Admin"
import About from "./pages/About"
import Contact from "./pages/Contact"

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="products" element={<Products/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="contact" element={<Contact/>}/>

                <Route path="admin" element={<Admin/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}