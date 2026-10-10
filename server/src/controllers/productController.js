import { productService } from "../services/productService.js";

export async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts()
        res.json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}

export async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(req.params.id)
        if(!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}