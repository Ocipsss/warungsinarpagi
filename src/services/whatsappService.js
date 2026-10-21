export const whatsappService = {
  formatOrderMessage(cartItems, customerInfo = {}) {
    const { name = 'Anak Kost', room = '-' } = customerInfo
    
    let text = `*PESANAN BARU - WARUNG SINAR PAGI*\n`
    text += `-----------------------------------\n`
    text += `*Pemesan:* ${name}\n`
    text += `*No. Kost/Kamar:* ${room}\n\n`
    text += `*Rincian Belanjaan:*\n`

    let total = 0
    cartItems.forEach((item, index) => {
      const subtotal = item.price * item.quantity
      total += subtotal
      text += `${index + 1}. ${item.name} (${item.quantity} ${item.unit}) = Rp ${subtotal.toLocaleString('id-ID')}\n`
      if (item.selectedVariant) {
        text += `   _Catatan: ${item.selectedVariant}_\n`
      }
    })

    text += `\n-----------------------------------\n`
    text += `*TOTAL BAYAR:* Rp ${total.toLocaleString('id-ID')}\n\n`
    text += `Mohon konfirmasi pesanan dan info nomor QRIS / COD ya A/Teteh. Terima kasih!`

    return encodeURIComponent(text)
  },

  generateWhatsAppURL(phoneNumber, formattedMessage) {
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
    return `https://wa.me/${cleanPhone}?text=${formattedMessage}`
  }
}
