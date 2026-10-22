export function formatRp(value) {
  return `Rp ${Number(value || 0).toLocaleString('id-ID')}`
}

export function formatRpShort(value) {
  const num = Number(value || 0)
  if (num >= 1000) return `Rp ${(num/1000).toFixed(0)}k`
  return formatRp(num)
}
