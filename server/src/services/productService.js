import { productRepository } from "../repositories/productRepository.js";


export const productService = {
    getAllProducts: () => productRepository.findAll(),
    getProductById: (id) => productRepository.findById(id)
}