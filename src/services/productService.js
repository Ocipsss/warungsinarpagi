import { db } from '../db/index'

export const CATEGORY_ICON_MAP = {
  'POP MIE': 'UtensilsCrossed',
  'MIE': 'UtensilsCrossed',
  'MIE GELAS': 'CupSoda',
  'MIE GAUL': 'Flame',
  'MINUMAN SACHET': 'Coffee',
  'MINUMAN BOTOL': 'CupSoda',
  'MINUMAN CUP': 'CupSoda',
  'POP ICE': 'Snowflake',
  'ES CEKEK': 'Snowflake',
  'SNACK 1K': 'Cookie',
  'SNACK 2K': 'Cookie',
  'SNACK GOPE': 'Cookie',
  'PERMEN': 'Candy',
  'HOME CARE': 'Sparkles',
  'PERSONAL CARE': 'Heart',
  'BUMBU': 'Soup',
  'ROKOK': 'Cigarette',
  'OBAT': 'Pill',
  'PEMBALUT': 'Heart',
  'BARTIP': 'Wrench',
  'UMUM': 'Package'
}

export const productService = {
  transformPOSProduct(rawProduct, allServices = []) {
    const activeServices = allServices.filter(s => !s.deleted)
    const availableServices = activeServices.filter(s => {
      return s.category === rawProduct.category || 
             (rawProduct.category.includes('MIE') && s.category.includes('MIE')) ||
             (rawProduct.category === 'POP ICE' && s.category === 'POP ICE')
    })

    return {
      id: rawProduct.id,
      name: rawProduct.name,
      code: rawProduct.code || '',
      category: rawProduct.category || 'UMUM',
      categoryIcon: CATEGORY_ICON_MAP[rawProduct.category] || 'Package',
      price: rawProduct.price_sell || 0,
      unit: rawProduct.unit || 'PCS',
      stock: rawProduct.qty || 0,
      minStock: rawProduct.minStock || 2,
      isLowStock: (rawProduct.qty || 0) <= (rawProduct.minStock || 2) && (rawProduct.qty || 0) > 0,
      isAvailable: (rawProduct.qty || 0) > 0,
      availableServices,
      imageUrl: `https://placehold.co/300x300/e2e8f0/475569?text=${encodeURIComponent(rawProduct.name.substring(0,12))}`,
      updatedAt: rawProduct.updatedAt
    }
  },

  async initFromFullDB(fullDB) {
    const count = await db.products.count()
    if (count > 0) return

    const activeServices = (fullDB.services || []).filter(s => !s.deleted)
    await db.services.bulkAdd(activeServices)

    const transformed = (fullDB.products || []).map(p => this.transformPOSProduct(p, activeServices))
    await db.products.bulkAdd(transformed)

    const catMap = {}
    transformed.forEach(p => {
      if (!catMap[p.category]) {
        catMap[p.category] = { id: p.category, name: p.category, icon: p.categoryIcon, count: 0 }
      }
      catMap[p.category].count++
    })
    await db.categories.bulkAdd(Object.values(catMap))

    if (fullDB.settings?.[0]) {
      await db.settings.put({ id: 'app_config', ...fullDB.settings[0] })
    }
  },

  async getAllProducts() { return await db.products.toArray() },
  async getCategories() { return await db.categories.toArray() },
  async getSettings() { return await db.settings.get('app_config') }
}
