import Redis from "ioredis";

const redis = new Redis("redis://localhost:6379");

export const getFromDoujinCache = async (req, res, next) => {
    try {
        let { id } = req.body;

        redis.get(id, (err, data) => {
            if (err) throw err;
            if (data === null) next();

            console.log(`fetching doujin ${id} from doujinCache`);
            res.send(data);
            console.log(`fetch ${id} completed`);
        });
    } catch (error) {
        console.log(error);
        next();
    }
};
