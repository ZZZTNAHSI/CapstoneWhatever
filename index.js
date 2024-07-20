import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// useless consts that no body cares about
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// initialize server
app.listen(port, () => {
    console.log(`Website is running on port ${port}.`);
});

// renders the server without waifus
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// when the button is pressed, goes to post route /waifus to handle getting the waifus
app.post("/waifus", async (req, res) => {
    let num = req.body.int;
    //  cant get more than 30 waifus at a time so redirects to home page if you do so 
    if (num > 30 || num < 0) {
        res.redirect("/");
    }
    try {
        // This is where axios fetches the waifus
        let result = 0
        if (num === '1' || num === '0' || num == '') {
            result = await axios.get("https://api.waifu.im/search");
        } else {
            result = await axios.get("https://api.waifu.im/search?limit=" + num);
        }
        const info = result.data;
        res.render("index.ejs", {
            waifu: info.images
        });
    } catch (error) {
        console.log(error.response);
        res.render("index.ejs", {
            error: "Something done fucked up"
        });
      }
});