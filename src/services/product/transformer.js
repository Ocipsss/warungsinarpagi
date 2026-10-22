import { CATEGORY_ICON_MAP } from '../../constants/categories.js'

export function transformPOSProduct(rawProduct, allServices = []) {
  const activeServices = allServices.filter(s => !s.deleted)
  const availableServices = activeServices.filter(s => {
    return s.category === rawProduct.category ||
           (rawProduct.category.includes('MIE') && s.category.includes('MIE')) ||
           (rawProduct.category === 'POP ICE' && s.category === 'POP ICE')
  })

  return {
    id: rawProduct.id,
    name: rawProduct.name,
    code: rawProduct.code || '',
    category: rawProduct.category || 'UMUM',
    categoryIcon: CATEGORY_ICON_MAP[rawProduct.category] || 'Package',
    price: rawProduct.price_sell || 0,
    unit: rawProduct.unit || 'PCS',
    stock: rawProduct.qty || 0,
    minStock: rawProduct.minStock || 2,
    isLowStock: (rawProduct.qty || 0) <= (rawProduct.minStock || 2) && (rawProduct.qty || 0) > 0,
    isAvailable: (rawProduct.qty || 0) > 0,
    availableServices,
    imageUrl: `https://placehold.co/300x300/e2e8f0/475569?text=${encodeURIComponent(rawProduct.name.substring(0,12))}`,
    updatedAt: rawProduct.updatedAt
  }
}
