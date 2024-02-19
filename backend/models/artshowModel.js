import mongoose from "mongoose";

const artshowSchema = mongoose.Schema({
    main_images: [String],
    other_images: [String],
    name: String,
    title: String,
    script: String,
    quote: String,
    instagram: String,
    website: String,
    isFeat: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {timestamps: true})

const Artshow = mongoose.model("artshow", artshowSchema);

export default Artshow;