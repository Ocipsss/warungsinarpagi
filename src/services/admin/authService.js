import { db } from '../../db/index.js'

const DEFAULT_PINS = [
  { id: '300993', name: 'Septian Pratama', pin: '300993' },
  { id: '081194', name: 'Aniyatu Solihah', pin: '081194' }
]

export const authService = {
  async getValidPins() {
    try {
      const operators = await db.operators.toArray()
      if (operators.length > 0) return operators.map(o => o.pin)
    } catch {}
    return DEFAULT_PINS.map(o => o.pin)
  },

  async login(pin) {
    const validPins = await this.getValidPins()
    if (validPins.includes(pin)) {
      localStorage.setItem('sinar-pagi-admin', 'true')
      localStorage.setItem('sinar-pagi-operator', pin)
      return true
    }
    return false
  },

  logout() {
    localStorage.removeItem('sinar-pagi-admin')
    localStorage.removeItem('sinar-pagi-operator')
  },

  isLoggedIn() {
    return localStorage.getItem('sinar-pagi-admin') === 'true'
  }
}
