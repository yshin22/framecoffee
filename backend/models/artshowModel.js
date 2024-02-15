import mongoose from "mongoose";

const artshowSchema = mongoose.Schema({
    main_image: String,
    other_image: [String],
    name: String,
    title: String,
    script: String,
    isFeat: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {timestamps: true})

const Artshow = mongoose.model("artshow", artshowSchema);

export default Artshow;