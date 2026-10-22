import { db } from '../../db/index.js'

export const productAdminService = {
  async getAll() {
    const all = await db.products.toArray()
    return all.sort((a,b) => a.name.localeCompare(b.name))
  },

  async search(query) {
    const all = await this.getAll()
    if (!query) return all
    const q = query.toLowerCase()
    return all.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  },

  async create(payload) {
    const newProduct = {
      id: crypto.randomUUID(),
      name: payload.name,
      code: '',
      category: payload.category,
      categoryIcon: 'Package',
      price: payload.price_sell,
      unit: 'PCS',
      stock: payload.qty,
      minStock: payload.minStock,
      isAvailable: payload.qty > 0,
      isLowStock: payload.qty <= payload.minStock && payload.qty > 0,
      availableServices: [],
      imageUrl: `https://placehold.co/300x300/e2e8f0/475569?text=${encodeURIComponent(payload.name.substring(0,12))}`,
      updatedAt: new Date().toISOString()
    }
    await db.products.add(newProduct)
    return newProduct
  },

  async update(id, payload) {
    await db.products.update(id, {
      name: payload.name,
      category: payload.category,
      price: payload.price_sell,
      stock: payload.qty,
      minStock: payload.minStock,
      isAvailable: payload.qty > 0,
      isLowStock: payload.qty <= payload.minStock && payload.qty > 0
    })
  },

  async remove(id) {
    await db.products.delete(id)
  },

  getStats(products) {
    return {
      total: products.length,
      lowStock: products.filter(p => p.isLowStock).length,
      outOfStock: products.filter(p => !p.isAvailable).length,
      categories: 21
    }
  }
}
