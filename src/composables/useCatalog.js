import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '../stores/catalogStore.js'
import { productService } from '../services/product/service.js'
import fullDB from '../mock/full-db.json'

export function useCatalog() {
  const store = useCatalogStore()
  const { categories, selectedCategory, searchQuery, filteredProducts, isLoading, totalCount } = storeToRefs(store)
  const { setCategory, fetchCatalog } = store

  onMounted(async () => {
    try {
      await productService.initFromFullDB(fullDB)
      await fetchCatalog()
    } catch (e) { console.error('Gagal memuat katalog:', e) }
  })

  return { categories, selectedCategory, searchQuery, filteredProducts, isLoading, totalCount, setCategory, fetchCatalog }
}
