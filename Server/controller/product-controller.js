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

const deleteItems = async (req, res) => {
    try {
        const delitems = await Items.deleteOne({ _id: req.body._id });
        if (delitems) {
            res.status(200).json("Itmes Data Not Found");
        }
        else {
            res.status(500).json("Data Not Found");
        }

    } catch (error) {
        console.log("Error While Deleting  Data", error);
    }
}

module.exports = {
    getItems
}
