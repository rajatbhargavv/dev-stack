export const formatDate = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
