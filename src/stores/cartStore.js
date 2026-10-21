import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { whatsappService } from '../services/whatsappService'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))

  function addItem(product, variant = null) {
    const existing = items.value.find(i => i.id === product.id && i.selectedVariant === variant)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        selectedVariant: variant,
        quantity: 1
      })
    }
  }

  function removeItem(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  function updateQuantity(productId, qty) {
    const item = items.value.find(i => i.id === productId)
    if (item) {
      item.quantity = qty
      if (item.quantity <= 0) removeItem(productId)
    }
  }

  function checkoutViaWhatsApp(storePhone, customerInfo) {
    const message = whatsappService.formatOrderMessage(items.value, customerInfo)
    const url = whatsappService.generateWhatsAppURL(storePhone, message)
    window.open(url, '_blank')
  }

  return { items, totalItems, totalPrice, addItem, removeItem, updateQuantity, checkoutViaWhatsApp }
})
