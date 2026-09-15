import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import ProductDetail from './pages/ProductDetail'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
    )
}
export default App
