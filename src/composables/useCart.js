import { useCartStore } from '../stores/cartStore.js'
import { storeToRefs } from 'pinia'

export function useCart() {
  const store = useCartStore()
  const { items, totalItems, totalPrice } = storeToRefs(store)
  return { ...store, items, totalItems, totalPrice }
}
