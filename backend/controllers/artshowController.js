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
    if (artshow) {
        // console.log(`FEATURED ARTISTS: ${artshow}`);
        // return the first of artshow object since only one "artshow" will be featured
        res.json(artshow[0]);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
    
})

// @desc Create an Artshow
// @route POST /api/artshow
// @access private/ Admin
const createArtshow = asyncHandler(async (req,res) => {
    const artshow = new Artshow({
        main_images: '/images/sample.jpg',
        other_images: '/images/sample.jpg',
        name: 'Sample Name',
        title: 'Sample Title',
        script: 'Sample Script',
        quote: 'Sample Quote',
        instagram: '@instagram',
        website: '@website',
        isFeat: false,
    });
    const createdArtshow = await artshow.save();
    res.status(201).json(createdArtshow);
})

// @desc Update an Artshow
// @route PUT /api/artshow/:id
// @access private/ Admin
const updateArtshow = asyncHandler(async(req,res) => {
    const {main_images, other_images, name, title, script, quote, instagram, website, isFeat} = req.body;

    const artshow = await Artshow.findById(req.params.id);
    // console.log(artshow)

    if (artshow) {
        artshow.main_images = main_images;
        artshow.other_images = other_images;
        artshow.name = name;
        artshow.title = title;
        artshow.script = script;
        artshow.quote = quote;
        artshow.instagram = instagram;
        artshow.website = website;
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

// @desc set all featured artist to false
// @route PUT /api/artshow/:id
// @ access private/ admin
const updateFeatForAll = asyncHandler(async (req, res) => {
    await Artshow.updateMany({isFeat: true}, {$set: {isFeat: false}});
    res.status(200).send(
        {message: 'Set artist to Featured'}
    )
})

export {
    getArtshows,
    getArtshowById,
    getArtshowFeat,
    createArtshow,
    updateArtshow,
    deleteArtshow,
    updateFeatForAll,
};