export function Pin(id, m_id, favorites, timeStamp, cover, format) {
    this.id = id;
    this.m_id = m_id;
    this.fav = favorites;
    this.time = timeStamp;
    this.cov = cover;
    this.fmt = format;
}

export function Section(board, section, cover) {
    this.name = section;
    this.time = Math.round(new Date().getTime() / 1000);
    this.cover = cover;
    this.board = board;
    this.pins = [];
    this.pCount = 0;
}

export function Board(name) {
    this.name = name;
    this.time = Math.round(new Date().getTime() / 1000);
    this.cover = cover;
    this.pins = [];
    this.sCount = 0;
    this.pCount = 0;
}

let mongo = {
    user: "nhei",
    bCount: 1,
    boards: [
        {
            name: "konosuba",
            cover: "https://t.nhentai.net/galleries/2014946/thumb.jpg",
            time: "1653044668",
            sCount: "1",
            pCount: "1",
            pins: [
                {
                    id: "373744",
                    m_id: "2014946",
                    fav: "3737",
                    time: "1653044668",
                    cover: "cover",
                    fmt: "jpg",
                },
            ],
        },
    ],
    sections: [
        {
            name: "aqua",
            cover: "https://t.nhentai.net/galleries/2014946/thumb.jpg",
            time: "1653044668",
            pCount: "1",
            board: "konosuba",
            pins: [
                {
                    id: "373744",
                    m_id: "2014946",
                    fav: "3737",
                    time: "1653044668",
                    cover: "1",
                    fmt: "jpg",
                },
            ],
        },
    ],
};
