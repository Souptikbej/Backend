const Items = require('../schema/item.schema');


const getItems = async (req, res) => {
    try {
        const products = await Items.find({}); // get all data
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(500).json("Data Not Found");
        }
    } catch (error) {
        console.log("Error While Getting Data", error);
    }
}


module.exports = {
    getItems
}
