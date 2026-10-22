export const whatsappService = {
  formatOrderMessage(cartItems, customerInfo = {}) {
    const { 
      name = 'Anak Kost', 
      kostName = '-', 
      room = '-', 
      paymentMethod = 'QRIS',
      notes = '' 
    } = customerInfo
    
    let text = `*PESANAN WARUNG SINAR PAGI*\n`
    text += `----------------------------------\n`
    text += `*Nama:* ${name}\n`
    text += `*Lokasi:* ${kostName} - ${room}\n`
    text += `*Pembayaran:* ${paymentMethod}\n\n`

    text += `*Daftar Pesanan:*\n`
    let total = 0
    cartItems.forEach((item) => {
      const servicePrice = item.selectedService?.price || 0
      const itemPrice = item.price + servicePrice
      const subtotal = itemPrice * item.quantity
      total += subtotal

      let serviceLabel = item.selectedService ? ` (${item.selectedService.name})` : ''
      text += `• ${item.quantity}x ${item.name}${serviceLabel} - Rp${subtotal.toLocaleString('id-ID')}\n`
    })

    text += `\n----------------------------------\n`
    text += `*Total Belanja:* Rp ${total.toLocaleString('id-ID')}\n`

    if (notes) {
      text += `\n*Catatan:* ${notes}\n`
    }

    text += `\nMohon konfirmasi pesanan ya. Terima kasih!`

    return encodeURIComponent(text)
  },

  generateWhatsAppURL(phoneNumber, formattedMessage) {
    let cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.substring(1)
    }
    return `https://wa.me/${cleanPhone}?text=${formattedMessage}`
  }
}
