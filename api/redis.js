import { createClient } from "redis";

// const redis = new Redis({
//     port: process.env.REDIS_PORT,
//     host: process.env.REDIS_HOST,
//     password: process.env.REDIS_PASS,
// });
const redis = createClient({ url: "redis://localhost:6379" });

redis.on("connect", () => {
    console.log("redis status: connected");
});

redis.on("end", () => {
    console.log("redis status: disconnected");
});

redis.on("error", (error) =>
    console.log("error while connecting redis\n", error)
);

export const getFromCache = async (q) => {
    try {
        await redis.connect();
        console.log(`fetching doujin ${q} from doujinCache`);
        let data = await redis.get(String(q));
        redis.quit();
        return JSON.parse(data);
    } catch (error) {
        console.log(`error while fetching ${q} from redis\n`, error);
    }
};
export const setToCache = async (q, data) => {
    try {
        await redis.connect();
        console.log(`caching doujin ${q} to redis `);
        redis.set(String(q), JSON.stringify(data), {
            EX: 24 * 60 * 60,
            NX: true,
        });
        console.log(`caching ${q} completed`);
        redis.quit();
    } catch (error) {
        console.log(`error while caching ${q} to redis`, error);
    }
};
