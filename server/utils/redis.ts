import { Redis as UpstashRedis } from '@upstash/redis'
import Redis from 'ioredis'
import { defaultWwwData, type WwwSiteData } from '../../data/defaultGameData'

export const REDIS_WWW_KEY = 'nbtf:www:data'

let ioredisClient: Redis | null = null
let upstashClient: UpstashRedis | null = null
let memoryCache: WwwSiteData | null = null

export function getRedisClient() {
  const config = useRuntimeConfig()
  
  // 1. Try Upstash REST
  const upstashUrl = config.upstashRedisRestUrl || process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = config.upstashRedisRestToken || process.env.UPSTASH_REDIS_REST_TOKEN
  if (upstashUrl && upstashToken) {
    if (!upstashClient) {
      upstashClient = new UpstashRedis({
        url: upstashUrl,
        token: upstashToken,
      })
    }
    return { type: 'upstash' as const, client: upstashClient }
  }

  // 2. Try standard Redis URL (ioredis)
  const redisUrl = config.redisUrl || process.env.REDIS_URL
  if (redisUrl) {
    if (!ioredisClient) {
      ioredisClient = new Redis(redisUrl, {
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
        lazyConnect: true,
      })
    }
    return { type: 'ioredis' as const, client: ioredisClient }
  }

  // 3. Fallback memory mode
  return { type: 'memory' as const, client: null }
}

export async function fetchWwwData(): Promise<WwwSiteData> {
  try {
    const redis = getRedisClient()
    
    if (redis.type === 'upstash' && redis.client) {
      const data = await redis.client.get<WwwSiteData | string>(REDIS_WWW_KEY)
      if (data) {
        return typeof data === 'string' ? JSON.parse(data) : data
      }
    } else if (redis.type === 'ioredis' && redis.client) {
      const raw = await redis.client.get(REDIS_WWW_KEY)
      if (raw) {
        return JSON.parse(raw)
      }
    } else if (memoryCache) {
      return memoryCache
    }
  } catch (err) {
    console.warn('[Redis] Unable to fetch live WWW data, returning fallback defaults:', err)
  }

  return defaultWwwData
}

export async function saveWwwData(data: WwwSiteData): Promise<boolean> {
  try {
    const redis = getRedisClient()
    data.updatedAt = new Date().toISOString()
    memoryCache = data

    if (redis.type === 'upstash' && redis.client) {
      await redis.client.set(REDIS_WWW_KEY, JSON.stringify(data))
      return true
    } else if (redis.type === 'ioredis' && redis.client) {
      await redis.client.set(REDIS_WWW_KEY, JSON.stringify(data))
      return true
    }
    return true
  } catch (err) {
    console.error('[Redis] Failed to save WWW data:', err)
    return false
  }
}
