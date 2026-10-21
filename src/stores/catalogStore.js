import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productService } from '../services/productService'

export const useCatalogStore = defineStore('catalog', () => {
  const products = ref([])
  const categories = ref([])
  const selectedCategory = ref('SEMUA')
  const searchQuery = ref('')
  const isLoading = ref(false)

  // Fetch data dari Dexie.js / IndexedDB
  async function fetchCatalog() {
    isLoading.value = true
    try {
      products.value = await productService.getAllProducts()
      categories.value = await productService.getCategories()
    } catch (error) {
      console.error('Gagal mengambil data katalog:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Filter gabungan berdasarkan pencarian teks dan kategori
  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchCategory = selectedCategory.value === 'SEMUA' || product.category === selectedCategory.value
      const matchSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
      return matchCategory && matchSearch && product.isAvailable
    })
  })

  function setCategory(categoryName) {
    selectedCategory.value = categoryName
  }

  function setSearchQuery(query) {
    searchQuery.value = query
  }

  return {
    products,
    categories,
    selectedCategory,
    searchQuery,
    isLoading,
    filteredProducts,
    fetchCatalog,
    setCategory,
    setSearchQuery
  }
})
