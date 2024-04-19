const express = require("express");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

async function connectDB() {
  console.log("connecting...");
  await mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.hl4hpkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
}

connectDB();

const storage = multer.memoryStorage();

const upload = multer({ storage });

const audioSchema = mongoose.Schema({
  audioId: String,
  name: String,
  audio: {
    data: Buffer,
    contentType: String,
  },
});
const dataSchema = mongoose.Schema({
  doctorName: String,
  patientName: String,
  dateOfRecording: String,
  patientAge: String,
  audioId: String,
});

const UserData = mongoose.model("UserData", dataSchema);
const Audio = mongoose.model("Image", audioSchema);

app.get("/", async (req, res, next) => {
  const allData = await UserData.find();
  return res.json(allData);
  res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res, next) => {
  const { doctorName, patientName, patientAge, dateOfRecording } = req.body;
  console.log(req.body);
  const id = uuidv4();

  const newUserData = new UserData({
    doctorName,
    patientName,
    patientAge,
    dateOfRecording,
    audioId: id,
  });

  await newUserData.save();

  const audio = new Audio({
    audioId: id,
    name: req.file.originalname,
    audio: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });

  await audio.save();
  return res.redirect("/");
});

app.listen(8000, () => {
  console.log("listening");
});
