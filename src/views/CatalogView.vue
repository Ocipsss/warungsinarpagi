<script setup>
import { ShoppingBag, Search } from 'lucide-vue-next'
import { useCatalog } from '../composables/useCatalog'
import ProductCard from '../components/catalog/ProductCard.vue'
import CategoryFilter from '../components/catalog/CategoryFilter.vue'
import CartDrawer from '../components/cart/CartDrawer.vue'

const { categories, selectedCategory, searchQuery, filteredProducts, isLoading, totalCount, setCategory } = useCatalog()
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
    <!-- HEADER DI LUAR MAIN, BIAR STICKY BENER -->
    <header class="sticky top-0 z-10 bg-emerald-600 text-white shadow-md p-4">
      <div class="max-w-md mx-auto flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold tracking-tight">Warung Sinar Pagi</h1>
          <p class="text-xs text-emerald-100">Ciheuleut Jl. Talas Ujung No. 38</p>
        </div>
        <div class="bg-emerald-700 p-2 rounded-full">
          <ShoppingBag :size="20" />
        </div>
      </div>
    </header>

    <main class="max-w-md mx-auto p-4 space-y-5">
      <div class="relative">
        <Search class="absolute left-3 top-2.5 text-slate-400" :size="18" />
        <input v-model="searchQuery" placeholder="Cari produk..." class="w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm" />
      </div>

      <CategoryFilter :categories="categories" :selectedCategory="selectedCategory" @select="setCategory" />

      <section>
        <div v-if="isLoading" class="text-center py-10 text-slate-400 text-sm">Memuat produk...</div>
        <div v-else-if="filteredProducts.length === 0" class="text-center py-10 text-slate-400 text-sm">Produk tidak ditemukan.</div>
        <div v-else class="grid grid-cols-2 gap-3">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>
      </section>
    </main>

    <CartDrawer />
  </div>
</template>