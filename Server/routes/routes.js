const express = require("express");
const Items = require("../schema/item.schema.js");
const multer = require("multer");
const { getItems } = require("../controller/product-controller.js");
const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads"); // folder MUST exist
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/add", upload.single("imageFile"), async (req, res) => {
    try {
        const fileName = req.file ? req.file.filename : null;

        const items = new Items({
            foodName: req.body.foodName,
            foodType: req.body.foodType,
            mealType: req.body.mealType,
            category: req.body.category,
            price: req.body.price,
            imageFile: fileName
        });

        await items.save();
        return res.status(201).json({ message: "Data Inserted" });

    } catch (error) {
        console.log("Error While Insert Data", error);
        return res.status(500).json({ error: "Insert Error" });
    }
});

router.get('/all', getStudent);

module.exports = router;
