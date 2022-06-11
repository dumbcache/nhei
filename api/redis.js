import Redis from "ioredis";

// const redis = new Redis({
//     port: process.env.REDIS_PORT,
//     host: process.env.REDIS_HOST,
//     password: process.env.REDIS_PASS,
// });

export const getFromCache = async (id) => {
    try {
        const redis = new Redis("redis://localhost:6379");
        redis.get(id, (error, data) => {
            if (error) throw error;
            if (data === null) return null;

            console.log(`fetching doujin ${id} from doujinCache`);
            return data;
        });
    } catch (error) {
        console.log(`error while fetching ${id} from redis`);
        throw error;
    }
};
export const setToCache = async (id, data) => {
    try {
        console.log(`caching doujin ${id} to redis `);
        redis.set(id, JSON.stringify(data));
        console.log(`caching ${id} completed`);
    } catch (error) {
        console.log(`error while caching ${id} to redis`, error);
    }
};
