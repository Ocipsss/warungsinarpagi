export function to62(phone) {
  let clean = phone.replace(/[^0-9]/g, '')
  if (clean.startsWith('0')) clean = '62' + clean.substring(1)
  return clean
}
