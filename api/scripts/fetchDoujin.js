import Redis from "ioredis";
import { API } from "nhentai";

/**
 * Creating new database instance
 */
const redis = new Redis("redis://:nhei@redis:6379");

/**
 * Function to cache the doujin data in redis database
 */
export const cacheDoujinInfo = async (req, res, next) => {
    /**
     * storing id from request body into local variable
     */
    let { id } = req.body;
    /**
     * Retrieving the cached doujin data if available
     */
    redis.get(id, (err, data) => {
        if (err) throw err;
        if (data !== null) {
            console.log(`caching doujin info of ${id}`);
            res.send(data);
            console.log("completed");
        } else {
            next();
        }
    });
};

/**
 * Function to fetch doujin data using the nhentai api
 */
export const fetchDoujinInfo = async (req, res, next) => {
    try {
        /**
         * storing id from request body into local variable
         */
        let { id } = req.body;
        console.log(`fetching doujin info of ${id}`);
        /**
         * Initiating new nhentai api instance.
         * Fetching the data and storing in new object.
         */
        let api = new API();
        let request = await api.fetchDoujin(id);
        let data = {
            id: request.id,
            url: request.url,
            cover: request.thumbnail.url,
            title: request.titles.pretty,
            author: request.tags.artists[0].name,
            language: request.tags.languages[0].name,
            parody: request.tags.parodies[0].name,
            pages: request.pages,
        };
        /**
         * Caching the retrived doujin data into the redia database.
         */
        redis.set(id, JSON.stringify(data));
        res.send(data);
        console.log("completed");
    } catch (err) {
        console.log(err);
    }
};
