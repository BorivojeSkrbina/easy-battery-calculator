const express = require("express");
const multer = require("multer");

const Cell = require("../models/cell");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "png",
  "image/jpg": "png",
  "application/pdf": "pdf"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("MT", file.mimetype);
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");  // na serveru samo images
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  multer({ storage: storage }).fields([
    {
      name: "image",
      maxCount: 1
    },
    {
      name: "backImage",
      maxCount: 1
    }
  ]),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");

    const cell = new Cell({
      name: req.body.name,
      capacity: req.body.capacity,
      current: req.body.current,
      imagePath: url + "/images/" + req.files.image[0].filename,
      backImagePath: url + "/images/" + req.files.backImage[0].filename
    });
    cell.save().then(createdCell => {
      res.status(201).json({
        message: "Cell added successfully",
        cell: {
          ...createdCell,
          id: createdCell._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).fields([
    {
      name: "image",
      maxCount: 1
    },
    {
      name: "backImage",
      maxCount: 1
    }
  ]),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    let backImagePath = req.body.backImagePath;
    if (req.files) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.files.image[0].filename;
      backImagePath = url + "/images/" + req.files.backImage[0].filename;
    }
    const cell = new Cell({
      _id: req.body.id,
      name: req.body.name,
      capacity: req.body.capacity,
      current: req.body.current,
      imagePath: imagePath,
      backImagePath: backImagePath
    });
    Cell.updateOne({ _id: req.params.id }, cell).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  Cell.find().then(documents => {
    res.status(200).json({
      message: "Cells fetched successfully",
      cells: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Cell.findById(req.params.id).then(cell => {
    if (cell) {
      res.status(200).json(cell);
    } else {
      res.status(404).json({ message: "Cell not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Cell.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Cell deleted!" });
  });
});

module.exports = router;
