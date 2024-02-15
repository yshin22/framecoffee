import asyncHandler from "../middleware/asyncHandler.js";
import Artshow from "../models/artshowModel.js";

// @desc Fetch all Artshows
// @route GET /api/artshow
// @access public
const getArtshows = asyncHandler(async (req,res) => {
    const artshows = await Artshow.find({});
    // console.log(`ARTSHOWS: ${artshows}`);
    res.json(artshows);
})

// @desc Fetch an Artshow object
// @route GET /api/artshow/:ID
// @access public
const getArtshowById = asyncHandler(async (req,res) => {
    const artshow = await Artshow.findById(req.params.id);

    if (artshow) {
        return res.json(artshow);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
})

// @desc Fetch Artshow thats featured
// @route GET /api/artshow
// @access public
const getArtshowFeat = asyncHandler(async (req,res) => {
    const artshow = await Artshow.find({isFeat: true});
    console.log(`FEATURED ARTISTS: ${artshow}`);
    // return the first of artshow object since only one "artshow" will be featured
    res.json(artshow[0]);
})

// @desc Create an Artshow
// @route POST /api/artshow
// @access private/ Admin
const createArtshow = asyncHandler(async (req,res) => {
    const artshow = new Artshow({
        main_image: '/images/sample.jpg',
        other_image: '/images/sample.jpg',
        name: 'Sample Name',
        title: 'Sample Title',
        script: 'Sample Script',
        isFeat: false,
    });
    const createdArtshow = await artshow.save();
    res.status(201).json(createArtshow);
})

// @desc Update an Artshow
// @route PUT /api/artshow/:id
// @access private/ Admin
const updateArtshow = asyncHandler(async(req,res) => {
    const {main_image, other_image, name, title, script, isFeat} = req.body;

    const artshow = await Artshow.findById(req.params.id);
    // console.log(artshow)

    if (artshow) {
        artshow.main_image = main_image;
        artshow.other_image = other_image;
        artshow.name = name;
        artshow.title = title;
        artshow.script = script;
        artshow.isFeat = isFeat;

        const updateArtshow = await artshow.save();
        res.json(updateArtshow);
    } else {
        res.status(404);
        throw new Error('Resoruce not found');
    }
})

// @desc Delete an Artshow
// @route DELETE /api/artshow/:id
// @access private/ admin
const deleteArtshow = asyncHandler(async (req,res) => {
    const artshow = await Artshow.findById(req.params.id);

    if (artshow) {
        await Artshow.deleteOne({ _id: artshow._id});
        res.json({ message: 'Artshow deleted'});
    } else {
        res.status(404);
        throw new Error('Artshow not found');
    }
})

export {
    getArtshows,
    getArtshowById,
    getArtshowFeat,
    createArtshow,
    updateArtshow,
    deleteArtshow,
};