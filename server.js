const express = require("express");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { listSongs, getFileData } = require("./controllers/Music");
const os = require("os");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/gettrack", async (req, res) => {

    const { query } = req;

    res.writeHead(200, {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filname='eminem.mp3'"
    });
    const files = await listSongs();

    const filename = files[query?.index ? query?.index : 0];
    const filepath = path.join(os.homedir(), "Music", filename);

    const stream = fs.createReadStream(filepath);
    stream.pipe(res)

    stream.on("error", (err) => {
        console.log("error reading file", err)
        res.status(500).end();
    })
})

app.get("/trackslist", async (_req, res) => {
    const musicTracks = await listSongs();

    res.send({
        ok: true,
        status: "success",
        result: musicTracks,
    })
})

app.listen(5000, () => {
    console.log("Listening at port 5000")
})
