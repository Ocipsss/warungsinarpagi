import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '../stores/catalogStore'
import { productService } from '../services/productService'
import initialPOSData from '../mock/sinar-pagi.json'

export function useCatalog() {
  const catalogStore = useCatalogStore()

  // Ambil state reaktif menggunakan storeToRefs agar reaktivitas Vue tetap terjaga
  const { 
    products, 
    categories, 
    selectedCategory, 
    searchQuery, 
    filteredProducts, 
    isLoading 
  } = storeToRefs(catalogStore)

  // Ambil method/action dari store
  const { setCategory, setSearchQuery, fetchCatalog } = catalogStore

  onMounted(async () => {
    try {
      // 1. Seed data ke Dexie.js dari file mock sinar-pagi.json jika database lokal masih kosong
      await productService.initProductsFromJSON(initialPOSData)

      // 2. Load data dari Dexie.js ke dalam Pinia Store
      await fetchCatalog()
    } catch (err) {
      console.error('Gagal memuat katalog:', err)
    }
  })

  return {
    // State Reaktif
    products,
    categories,
    selectedCategory,
    searchQuery,
    filteredProducts,
    isLoading,

    // Actions
    setCategory,
    setSearchQuery,
    fetchCatalog
  }
}
