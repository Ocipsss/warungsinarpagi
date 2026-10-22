export function formatOrderMessage(cartItems, customerInfo = {}) {
  const { name = 'Anak Kost', kostName = '-', room = '-', paymentMethod = 'QRIS', notes = '' } = customerInfo
  let text = `*PESANAN WARUNG SINAR PAGI*\n`
  text += `----------------------------------\n`
  text += `*Nama:* ${name}\n`
  text += `*Lokasi:* ${kostName} - ${room}\n`
  text += `*Pembayaran:* ${paymentMethod}\n\n`
  text += `*Daftar Pesanan:*\n`
  let total = 0
  cartItems.forEach(item => {
    const servicePrice = item.selectedService?.price || 0
    const subtotal = (item.price + servicePrice) * item.quantity
    total += subtotal
    let label = item.selectedService ? ` (${item.selectedService.name})` : ''
    text += `• ${item.quantity}x ${item.name}${label} - Rp${subtotal.toLocaleString('id-ID')}\n`
  })
  text += `\n----------------------------------\n`
  text += `*Total Belanja:* Rp ${total.toLocaleString('id-ID')}\n`
  if (notes) text += `\n*Catatan:* ${notes}\n`
  text += `\nMohon konfirmasi pesanan ya. Terima kasih!`
  return encodeURIComponent(text)
}
