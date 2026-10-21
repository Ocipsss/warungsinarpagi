import Dexie from 'dexie'

export const db = new Dexie('SinarPagiCatalogDB')

db.version(1).stores({
  products: 'id, name, category, price_sell, qty',
  categories: 'id, name'
})
