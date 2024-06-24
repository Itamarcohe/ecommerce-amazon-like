import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface representing a document in MongoDB.
interface IRating {
    rate: number;
    count: number;
}

interface IProduct extends Document {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    countInStock: number;
    token: string;
    brand: string;
    rating: IRating;
    createdAt?: Date;
    updatedAt?: Date;
}

// Create a Schema corresponding to the document interface.
const productSchema: Schema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        countInStock: { type: Number, required: true },
        token: { type: String, required: true, unique: true },
        brand: { type: String, required: true },
        rating: {
            rate: { type: Number },
            count: { type: Number },
        },
    },
    { timestamps: true }
);

// Create a Model.
const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);

export default Product;
