import Product from "../models/Product.js";
import User from "../models/User.js";
import data from "../data.js";

const seedData = async (req, res) => {
    try {
        const deleteProductsPromise = Product.deleteMany({});
        const deleteUsersPromise = User.deleteMany({});
        await Promise.all([deleteProductsPromise, deleteUsersPromise]);

        const createProductsPromise = Product.insertMany(data.products);
        const createUsersPromise = User.insertMany(data.users);
        const [createdProducts, createdUsers] = await Promise.all([createProductsPromise, createUsersPromise]);

        res.send({ products: createdProducts, users: createdUsers });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error seeding data");
    }
}

export default seedData;