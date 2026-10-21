import { db } from '../db/index'

export const productService = {
  // Mapping dari format POS ke format Katalog App
  transformPOSProduct(rawProduct) {
    return {
      id: rawProduct.id,
      name: rawProduct.name,
      category: rawProduct.category || 'UMUM',
      price: rawProduct.price_sell || 0,
      unit: rawProduct.unit || 'PCS',
      stock: rawProduct.qty || 0,
      isAvailable: (rawProduct.qty > 0) && (rawProduct.price_sell > 0),
      // Contoh generator URL Cloudinary berbasis nama/ID produk
      imageUrl: rawProduct.imageUrl || `https://res.cloudinary.com/warung-sinar-pagi/image/upload/v1/products/${rawProduct.id}.jpg`
    }
  },

  // Seed data awal dari JSON POS ke IndexedDB
  async initProductsFromJSON(rawJSONData) {
    const productsCount = await db.products.count()
    if (productsCount === 0 && rawJSONData?.products) {
      const transformedProducts = rawJSONData.products.map(this.transformPOSProduct)
      await db.products.bulkAdd(transformedProducts)
      
      if (rawJSONData?.categories) {
        await db.categories.bulkAdd(rawJSONData.categories)
      }
    }
  },

  async getAllProducts() {
    return await db.products.toArray()
  },

  async getCategories() {
    return await db.categories.toArray()
  }
}
