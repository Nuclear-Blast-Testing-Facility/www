import { getRedisClient } from '../utils/redis'

export default defineEventHandler(async () => {
  const redis = getRedisClient()
  return {
    status: 'ok',
    service: 'www-nbtf-ca',
    timestamp: new Date().toISOString(),
    redisMode: redis.type
  }
})
