import { Product } from '../models/Product.js';


export const productRepository = {
    findAll: () => Product.find(),
    findById: (id) => Product.findById(id)
}