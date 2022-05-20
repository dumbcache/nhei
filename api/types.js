function Pin(id, favourites, creationDate) {
    this.id = id;
    this.favourites = favourites;
    this.creationDate = creationDate;
}

function Section(board, section) {
    this.name = section;
    this.creationDate = Math.round(new Date().getTime() / 1000);
    this.pinCount = 0;
    this.board = board;
    this.pins = [];
}

function Board(name) {
    this.name = name;
    this.creationDate = Math.round(new Date().getTime() / 1000);
    this.sectionCount = 0;
    this.pinCount = 0;
    this.pins = [];
}

let mongo = {
    user: "nhei",
    boards: [
        {
            name: "konosuba",
            creationDate: "1653044668",
            sectionCount: "1",
            pinCount: "1",
            pins: [
                {
                    id: "373744",
                    favourites: "3737",
                    creationDate: "1653044668",
                },
            ],
        },
    ],
    sections: [
        {
            name: "aqua",
            creationDate: "1653044668",
            pinCount: "1",
            board: "konosuba",
            pins: [
                {
                    id: "373744",
                    favourites: "3737",
                    creationDate: "1653044668",
                },
            ],
        },
    ],
};

function name(name) {
    if (!name) {
        console.log("herl");
    }
}
name(undefined);
