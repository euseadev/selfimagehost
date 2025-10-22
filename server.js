const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const app = express();
const url = `https://img.eusea.dev`
const port = 4000;

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const randomName =
      crypto.randomBytes(4).toString("hex") + path.extname(file.originalname);
    cb(null, randomName);
  },
});
const upload = multer({ storage });


app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("File could not be uploaded.");
  }
  const fileName = req.file.filename;
  const fileUrl = `${url}/view/${fileName}`;
  res.send(fileUrl);
});

app.get("/view/:filename", (req, res) => {
  const fileName = req.params.filename;
  const directImageUrl = `${url}/uploads/${fileName}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="theme-color" content="#5865F2">
      <meta property="og:title" content="${fileName}">
      <meta property="og:description" content="eusea.dev">
      <meta property="og:image" content="${directImageUrl}">
      <meta property="og:url" content="${url}/view/${fileName}">
      <meta property="og:type" content="website">

      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${fileName}">
      <meta name="twitter:description" content="eusea.dev">
      <meta name="twitter:image" content="${directImageUrl}">

      <meta http-equiv="refresh" content="0; url=${directImageUrl}">

      <title>${fileName}</title>
    </head>
    <body>
      <p>Redirecting you to: <a href="${directImageUrl}">${directImageUrl}</a></p>
    </body>
    </html>
  `;

  res.send(html);
});


app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));