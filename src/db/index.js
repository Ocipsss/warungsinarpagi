import Dexie from 'dexie'

export const db = new Dexie('SinarPagiCatalogDB')

db.version(1).stores({
  products: 'id, name, category, price_sell, qty',
  categories: 'id, name'
})

db.version(2).stores({
  products: 'id, name, category, price, stock, isAvailable, minStock, updatedAt',
  categories: 'id, name, count, icon',
  services: 'id, name, category, price',
  settings: 'id',
  operators: 'id, name, pin'
}).upgrade(tx => tx.table('products').clear())

db.version(3).stores({
  products: 'id, name, category, price, stock, isAvailable, minStock, updatedAt',
  categories: 'id, name, count, icon',
  services: 'id, name, category, price',
  settings: 'id',
  operators: 'id, name, pin'
})
