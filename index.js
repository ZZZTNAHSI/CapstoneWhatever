import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Website is running on port ${port}.`);
});

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/waifus", async (req, res) => {
    let num = req.body.int;
    if (num > 30) {
        res.redirect("/");
    }
    try {
        const result = await axios.get("https://api.waifu.im/search?limit=" + num);
        const info = result.data;
        res.render("index.ejs", {
            waifu: info.images
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
      }
     
});