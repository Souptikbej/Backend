const Items = require('../schema/item.schema');


const getItems = async (req, res) => {
    try {
        const products = await Items.find({}); // get all data
        if (products) {
            const updatedProducts = products.map(item => ({
                ...item._doc,
                imageFile: `http://localhost:8000/uploads/${item.imageFile}`
            }));

            res.status(200).json(updatedProducts);
        } else {
            res.status(500).json("Data Not Found");
        }
    } catch (error) {
        console.log("Error While Getting Data", error);
    }
}
const getItemById = async (req, res) => {
    try {
        const item = await Items.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
const updateItem = async (req, res) => {
    const { name, price } = req.body;

    const updateData = { name, price };

    if (req.file) {
        updateData.imageFile = req.file.filename; // FIXED field name
    }

    const updated = await Items.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );

    res.json({
        message: "Item updated successfully",
        data: updated
    });
};


module.exports = {
    getItems, updateItem, getItemById
}
