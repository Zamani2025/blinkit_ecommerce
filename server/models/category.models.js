import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    image: {
        type: String,
        required: [true, "Please add an image"],
    },
}, {
    timestamps: true
});

const CategoryModel = mongoose.model("Category", categorySchema);


export default CategoryModel;