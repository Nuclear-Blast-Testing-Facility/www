import { d as defineEventHandler, s as setHeader } from '../../_/nitro.mjs';
import { f as fetchWwwData } from '../../_/redis.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@upstash/redis';
import 'ioredis';

const content_get = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "s-maxage=10, stale-while-revalidate=59");
  const data = await fetchWwwData();
  return {
    success: true,
    data
  };
});

export { content_get as default };
//# sourceMappingURL=content.get.mjs.map
