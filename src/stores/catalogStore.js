import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productService } from '../services/productService'

export const useCatalogStore = defineStore('catalog', () => {
  const products = ref([])
  const categories = ref([])
  const selectedCategory = ref('SEMUA')
  const searchQuery = ref('')
  const isLoading = ref(false)

  async function fetchCatalog() {
    isLoading.value = true
    try {
      products.value = await productService.getAllProducts()
      categories.value = await productService.getCategories()
      categories.value.sort((a,b) => (b.count||0) - (a.count||0))
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const filteredProducts = computed(() => {
    return products.value.filter(p => {
      const matchCat = selectedCategory.value === 'SEMUA' || p.category === selectedCategory.value
      const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
      return matchCat && matchSearch && p.isAvailable
    })
  })

  function setCategory(name) { selectedCategory.value = name }
  function setSearchQuery(q) { searchQuery.value = q }

  return { products, categories, selectedCategory, searchQuery, isLoading, filteredProducts, fetchCatalog, setCategory, setSearchQuery }
})
