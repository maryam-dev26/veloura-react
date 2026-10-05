import mongoose from 'mongoose';
import { env } from './config/env.js';
import { Product } from './models/Product.js';

const products = [
    {
        name: "Canvas Tote Bag",
        category: "Bags",
        price: 650,
        description: "A spacious, everyday tote made from durable canvas.",
        image: "/assets/Tote-Bag.jpg",
        rating: 4.3
    },
    {
        name: "Crossbody Sling Bag",
        category: "Bags",
        price: 1450,
        description: "A compact sling bag for hands-free convenience on the go.",
        image: "/assets/crossbody-bag.jpg",
        rating: 4.4
    },
    {
        name: "Mini Backpack",
        category: "Bags",
        price: 1890,
        description: "A stylish mini backpack that fits daily essentials with ease.",
        image: "/assets/mini-backpack.jpg",
        rating: 4.6
    },
    {
        name: "Leather Bag",
        category: "Bags",
        price: 1010,
        description: "A timeless leather bag for everyday elegance.",
        image: "/assets/Bag.jpg",
        rating: 4.5
    },
    {
        name: "Classic Blazer",
        category: "Clothing",
        price: 3250,
        description: "A tailored blazer designed for a polished and effortless look.",
        image: "/assets/clothing.jpg",
        rating: 4.7
    },
    {
        name: "Minimal Gold Earrings",
        category: "Jewelry",
        price: 890,
        description: "Simple and elegant earrings for everyday styling.",
        image: "/assets/jewelry.jpg",
        rating: 4.6
    },
    {
        name: "Classic Sneakers",
        category: "Shoes",
        price: 2490,
        description: "Comfortable everyday sneakers with a clean, versatile design.",
        image: "/assets/shoes.jpg",
        rating: 4.8
    },
    {
        name: "Linen Shirt",
        category: "Clothing",
        price: 1350,
        description: "A breathable linen shirt perfect for warm, casual days.",
        image: "/assets/linen-shirt.jpg",
        rating: 4.5
    },
    {
        name: "Denim Jacket",
        category: "Clothing",
        price: 2790,
        description: "A classic denim jacket that layers well in any season.",
        image: "/assets/denim-jacket.jpg",
        rating: 4.7
    },
    {
        name: "Cotton Sweater",
        category: "Clothing",
        price: 1990,
        description: "A soft, cozy cotton sweater for everyday comfort.",
        image: "/assets/cotton-sweater.jpg",
        rating: 4.4
    },
    {
        name: "Layered Necklace",
        category: "Jewelry",
        price: 1150,
        description: "A delicate layered necklace that adds effortless charm.",
        image: "/assets/layered-necklace.jpg",
        rating: 4.6
    },
    {
        name: "Silver Hoop Earrings",
        category: "Jewelry",
        price: 720,
        description: "Classic silver hoops that go with every outfit.",
        image: "/assets/silver-hoops.jpg",
        rating: 4.5
    },
    {
        name: "Pearl Bracelet",
        category: "Jewelry",
        price: 980,
        description: "An elegant pearl bracelet for a refined, subtle finish.",
        image: "/assets/pearl-bracelet.jpg",
        rating: 4.8
    },
    {
        name: "Ankle Boots",
        category: "Shoes",
        price: 3150,
        description: "Sturdy ankle boots built for style and all-day comfort.",
        image: "/assets/ankle-boots.jpg",
        rating: 4.7
    },
    {
        name: "Loafers",
        category: "Shoes",
        price: 2350,
        description: "Smart, versatile loafers for a polished everyday look.",
        image: "/assets/loafers.jpg",
        rating: 4.6
    },
    {
        name: "Strappy Sandals",
        category: "Shoes",
        price: 1290,
        description: "Lightweight strappy sandals perfect for warm-weather days.",
        image: "/assets/strappy-sandals.jpg",
        rating: 4.2
    }
]

async function seed () {
    try {
        await mongoose.connect(env.MONGODB_URI)
        console.log('Connected to MongoDB')

        await Product.deleteMany({})
        console.log('Cleared existing products')

        await Product.insertMany(products)
        console.log(`Inserted ${products.length} products`)

        process.exit(0)

    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1)
    }
    
}

seed()