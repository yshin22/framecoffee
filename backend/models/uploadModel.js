import mongoose from "mongoose";


const menuSchema = mongoose.Schema({
    image: String
}, {timestamps: true})


const Menu = mongoose.model("Menu", menuSchema );

export default Menu