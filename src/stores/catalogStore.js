import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productService } from '../services/product/service.js'

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
    } finally {
      isLoading.value = false
    }
  }

  const filteredProducts = computed(() => {
    const q = searchQuery.value.toLowerCase().trim()
    return products.value.filter(p => {
      const matchCat = selectedCategory.value === 'SEMUA' || p.category === selectedCategory.value
      const matchSearch = !q || p.name.toLowerCase().includes(q)
      return matchCat && matchSearch && p.isAvailable
    })
  })

  const totalCount = computed(() => categories.value.reduce((a,c) => a + (c.count||0), 0))

  function setCategory(name) { selectedCategory.value = name }

  return { products, categories, selectedCategory, searchQuery, isLoading, filteredProducts, totalCount, fetchCatalog, setCategory }
})
