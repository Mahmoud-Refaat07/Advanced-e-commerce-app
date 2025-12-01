import { Redis } from "@upstash/redis";
import "dotenv/config";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    { ex: 7 * 24 * 60 * 60 } // 7 days expiration
  );
};

export const deleteRefreshToken = async (userId) => {
  await redis.del(`refresh_token:${userId}`);
};
