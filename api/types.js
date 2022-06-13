export function Pin(id, m_id, favourites, creationDate, cover) {
    this.id = id;
    this.m_id = m_id;
    this.favourites = favourites;
    this.creationDate = creationDate;
    this.cover = cover;
}

export function Section(board, section) {
    this.name = section;
    this.creationDate = Math.round(new Date().getTime() / 1000);
    this.pinCount = 0;
    this.board = board;
    this.pins = [];
}

export function Board(name) {
    this.name = name;
    this.creationDate = Math.round(new Date().getTime() / 1000);
    this.sectionCount = 0;
    this.pinCount = 0;
    this.pins = [];
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
                    cover: "cover",
                    fav: "3737",
                    time: "1653044668",
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
                    cover: "1",
                    time: "1653044668",
                },
            ],
        },
    ],
};
