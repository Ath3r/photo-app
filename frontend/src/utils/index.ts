export const getPhotoUrl = (photo: string) => {
  return `${import.meta.env.VITE_API_URL}/${photo}`
}

export const formatDate = (date: Date) => {
  if (!date) return ''
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export const truncateDescription = (description: string, maxLength: number = 100) => {
  if (description.length <= maxLength) return description;
  return description.substr(0, maxLength) + '...';
}