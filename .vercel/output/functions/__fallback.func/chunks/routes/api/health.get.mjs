import { d as defineEventHandler } from '../../_/nitro.mjs';
import { g as getRedisClient } from '../../_/redis.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@upstash/redis';
import 'ioredis';

const health_get = defineEventHandler(async () => {
  const redis = getRedisClient();
  return {
    status: "ok",
    service: "www-nbtf-ca",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    redisMode: redis.type
  };
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map
