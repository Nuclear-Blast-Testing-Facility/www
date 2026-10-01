import { fetchWwwData } from '../utils/redis'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 's-maxage=10, stale-while-revalidate=59')
  const data = await fetchWwwData()
  return {
    success: true,
    data
  }
})
