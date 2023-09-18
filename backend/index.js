const express = require("express");
const CORS = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const app = express();

cloudinary.config({
    cloud_name: "LOL",
    api_key: "LOL",
    api_secret: "LOL"
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))
app.use(CORS());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Api is working"
    })
})

app.post("/upload", async (req, res) => {
    try {
        const file = req.files.sampleFile;
        console.log(file);
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "reactexpressformapp"
        })
        res.status(200).json({
            success: true,
            message: req.body.message,
            result
        })
    } catch (error) {
        console.log(error);
    }
})

app.listen(4000, () => {
    console.log("App listening on PORT 4000...");
})