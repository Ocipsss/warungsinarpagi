import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { whatsappService } from '../services/whatsapp/service.js'

const CART_KEY = 'sinar-pagi-cart-v2'
const CUSTOMER_KEY = 'sinar-pagi-customer-v2'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem(CART_KEY) || '[]'))

  const totalItems = computed(() => items.value.reduce((s,i) => s + i.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((s,i) => {
    const sp = i.selectedService?.price || 0
    return s + ((i.price + sp) * i.quantity)
  }, 0))

  watch(items, v => localStorage.setItem(CART_KEY, JSON.stringify(v)), { deep: true })

  function addItem(product, selectedService = null) {
    if (!product.isAvailable || product.stock <= 0) { alert('Stok habis!'); return }
    const key = `${product.id}-${selectedService?.id || 'no-service'}`
    const existing = items.value.find(i => i.cartKey === key)
    if (existing) {
      if (existing.quantity >= product.stock) { alert(`Stok ${product.name} cuma ${product.stock}`); return }
      existing.quantity++
    } else {
      items.value.push({ cartKey: key, id: product.id, name: product.name, price: product.price, unit: product.unit, stock: product.stock, selectedService, quantity: 1 })
    }
  }

  function removeItem(cartKey) { items.value = items.value.filter(i => i.cartKey !== cartKey) }
  function updateQuantity(cartKey, qty) {
    const item = items.value.find(i => i.cartKey === cartKey)
    if (!item) return
    if (qty <= 0) return removeItem(cartKey)
    if (qty > item.stock) { alert(`Maksimal ${item.stock}`); return }
    item.quantity = qty
  }
  function checkoutViaWhatsApp(phone, customerInfo) {
    const msg = whatsappService.formatOrderMessage(items.value, customerInfo)
    const url = whatsappService.generateWhatsAppURL(phone, msg)
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customerInfo))
    window.open(url, '_blank')
  }
  function getSavedCustomer() { try { return JSON.parse(localStorage.getItem(CUSTOMER_KEY) || 'null') } catch { return null } }
  function clearCart() { items.value = [] }

  return { items, totalItems, totalPrice, addItem, removeItem, updateQuantity, checkoutViaWhatsApp, getSavedCustomer, clearCart }
})
