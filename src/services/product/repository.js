import { db } from '../../db/index.js'

export const productRepository = {
  async count() { return await db.products.count() },
  async getAll() { return await db.products.toArray() },
  async getCategories() { return await db.categories.toArray() },
  async getServices() { return await db.services.toArray() },
  async getSettings() { return await db.settings.get('app_config') },
  async bulkAddProducts(products) { return await db.products.bulkAdd(products) },
  async bulkAddCategories(categories) { return await db.categories.bulkAdd(categories) },
  async bulkAddServices(services) { return await db.services.bulkAdd(services) },
  async clearAll() {
    await db.products.clear()
    await db.categories.clear()
    await db.services.clear()
  }
}
