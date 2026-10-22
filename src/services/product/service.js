import { transformPOSProduct } from './transformer.js'
import { productRepository } from './repository.js'
import { db } from '../../db/index.js'

export const productService = {
  async initFromFullDB(fullDB) {
    const count = await productRepository.count()
    if (count > 0) return

    const activeServices = (fullDB.services || []).filter(s => !s.deleted)
    if (activeServices.length) await productRepository.bulkAddServices(activeServices)

    const transformed = (fullDB.products || []).map(p => transformPOSProduct(p, activeServices))
    await productRepository.bulkAddProducts(transformed)

    const catMap = {}
    transformed.forEach(p => {
      if (!catMap[p.category]) {
        catMap[p.category] = { id: p.category, name: p.category, icon: p.categoryIcon, count: 0 }
      }
      catMap[p.category].count++
    })
    await productRepository.bulkAddCategories(Object.values(catMap))

    if (fullDB.settings?.[0]) {
      await db.settings.put({ id: 'app_config', ...fullDB.settings[0] })
    }

    if (fullDB.operators) {
      await db.operators.bulkPut(fullDB.operators.map(o => ({ id: o.id || o.pin, name: o.name, pin: o.pin })))
    }
  },

  async getAllProducts() { return await productRepository.getAll() },
  async getCategories() { return await productRepository.getCategories() },
  async getSettings() { return await productRepository.getSettings() }
}
