<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../../services/admin/authService.js'
import { productAdminService } from '../../services/admin/productAdminService.js'
import StatsCards from '../../components/admin/StatsCards.vue'
import ProductTable from '../../components/admin/ProductTable.vue'
import ProductFormModal from '../../components/admin/ProductFormModal.vue'
import { LogOut, Plus, Search } from 'lucide-vue-next'

const router = useRouter()
const products = ref([])
const filtered = ref([])
const searchQuery = ref('')
const showForm = ref(false)
const editingProduct = ref(null)

const stats = computed(() => productAdminService.getStats(products.value))

onMounted(async () => { await load() })

async function load() {
  products.value = await productAdminService.getAll()
  applyFilter()
}

function applyFilter() {
  if (!searchQuery.value) filtered.value = products.value
  else filtered.value = products.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
}

function openAdd() { editingProduct.value = null; showForm.value = true }
function openEdit(p) { editingProduct.value = p; showForm.value = true }

async function handleSave(form) {
  if (editingProduct.value) await productAdminService.update(editingProduct.value.id, form)
  else await productAdminService.create(form)
  showForm.value = false
  await load()
}

async function handleDelete(p) {
  if (!confirm(`Hapus ${p.name}?`)) return
  await productAdminService.remove(p.id)
  await load()
}

function logout() { authService.logout(); router.push('/admin') }
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-slate-900 text-white p-4 sticky top-0 z-10">
      <div class="max-w-5xl mx-auto flex justify-between items-center">
        <div><h1 class="font-bold text-lg">Admin Dashboard</h1><p class="text-xs text-slate-400">{{ stats.total }} produk • {{ stats.lowStock }} hampir habis</p></div>
        <div class="flex gap-2"><button @click="$router.push('/')" class="bg-slate-700 px-3 py-1.5 rounded-lg text-xs">Katalog</button><button @click="logout" class="bg-red-600 p-2 rounded-lg"><LogOut :size="16" /></button></div>
      </div>
    </header>
    <main class="max-w-5xl mx-auto p-4 space-y-4">
      <StatsCards :stats="stats" />
      <div class="flex gap-2">
        <div class="relative flex-1"><Search class="absolute left-3 top-2.5 text-slate-400" :size="18" /><input v-model="searchQuery" @input="applyFilter" placeholder="Cari produk..." class="w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm" /></div>
        <button @click="openAdd" class="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1.5"><Plus :size="16" /> Tambah</button>
      </div>
      <ProductTable :products="filtered" @edit="openEdit" @delete="handleDelete" />
    </main>
    <ProductFormModal :isOpen="showForm" :editingProduct="editingProduct" @close="showForm=false" @save="handleSave" />
  </div>
</template>
