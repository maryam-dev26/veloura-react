import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import ProductDetail from './pages/ProductDetail'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
            <Footer />
        </>
        )
       
}
export default App
