import Dexie from 'dexie'

export const db = new Dexie('SinarPagiCatalogDB')

// v1 legacy (dari projek awal)
db.version(1).stores({
  products: 'id, name, category, price_sell, qty',
  categories: 'id, name'
})

// v2 fix sesuai database real 474 produk
db.version(2).stores({
  products: 'id, name, category, price, stock, isAvailable, minStock, updatedAt',
  categories: 'id, name, count, icon',
  services: 'id, name, category, price',
  settings: 'id'
}).upgrade(tx => {
  // kalau upgrade dari v1, clear biar tidak bentrok
  return tx.table('products').clear()
})
