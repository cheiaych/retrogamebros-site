import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import NotFound from "./pages/NotFound"
import Admin from "./pages/Admin"

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="products" element={<Products/>}/>
                <Route path="admin" element={<Admin/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}