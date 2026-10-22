import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '../stores/catalogStore'
import { productService } from '../services/productService'
import fullDB from '../mock/full-db.json' // ganti nama file kamu yang 474 produk jadi full-db.json

export function useCatalog() {
  const catalogStore = useCatalogStore()
  const { categories, selectedCategory, searchQuery, filteredProducts, isLoading } = storeToRefs(catalogStore)
  const { setCategory, setSearchQuery, fetchCatalog } = catalogStore

  onMounted(async () => {
    try {
      await productService.initFromFullDB(fullDB)
      await fetchCatalog()
    } catch (err) {
      console.error('Gagal memuat katalog:', err)
    }
  })

  return { categories, selectedCategory, searchQuery, filteredProducts, isLoading, setCategory, setSearchQuery, fetchCatalog }
}
