import { to62 } from '../../utils/phone.js'
import { formatOrderMessage } from './formatter.js'

export const whatsappService = {
  formatOrderMessage,
  generateWhatsAppURL(phoneNumber, formattedMessage) {
    return `https://wa.me/${to62(phoneNumber)}?text=${formattedMessage}`
  }
}
