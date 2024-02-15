import path from 'path';
import multer from 'multer';
import Menu from '../models/uploadModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter, limits: {
    fileSize: 1000000
}});
const uploadSingleImage = upload.single('image');
const uploadMultipleImages = upload.any();

// router.post('/productimage', (req, res) => {
//   uploadSingleImage(req, res, function (err) {
//     if (err) {
//       return res.status(400).send({ message: err.message });
//     }

//     res.status(200).send({
//       message: 'Image uploaded successfully',
//       image: `/${req.file.path}`,
//     });
//   });
// });

const postProductImage = (req,res) => {
  uploadSingleImage(req,res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    console.log(`/${req.file.path}`);
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
};

// @desc POST multiple artshow images to /uploads and return a list of the filenames
// @route POST /api/uploads/artshow
const postArtShowImages = asyncHandler(async (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    console.log(`BACKEND FILES: ${req.file.file}`);
    // console.log(req.files[0].filename);
    // console.log(req.files[1].filename);
    // console.log(req.files[2].filename);
    // if (err) {
    //   return res.status(400).send('error message:' + { message: err.message });
    // }
    // else {

    //     var imageList = [];

    //     for (let i = 0; i < req.files.length; i++) {
    //         imageList.push(req.files[i].filename);
    //     }
          
    //     res.status(200).send({
    //     images: imageList,
    //     message: 'Images uploaded successfully',
    //   })
    // }
  });
})

const deleteMenus = asyncHandler(async(req, res) => {
  await Menu.deleteMany({});
  // console.log("items deleted")
  res.json({message : 'product updated and deleted'});
})

const getMenus = asyncHandler(async(req, res) => {
  const menus = await Menu.findOne({});
  // console.log(menus);
  res.json(menus);
});

const postMenu = asyncHandler(async(req, res) => {
  uploadMultipleImages(req, res, async function (err) {
    // console.log(req.files[0].filename);
    // console.log(req.files[1].filename);
    // console.log(req.files[2].filename);
    if (err) {
      return res.status(400).send('error message:' + { message: err.message });
    }
    else {

        var menuList = [];

        for (let i = 0; i < req.files.length; i++) {
            menuList.push(req.files[i].filename);
        }
        
      const menu = new Menu({
        image: menuList,
      })
      const createdMenu = await menu.save();
  
      res.status(200).send({
        menu: createdMenu,
        message: 'Menu uploaded successfully',
      })
    }
  });
});


export {
  getMenus,
  postMenu,
  deleteMenus,
  postProductImage,
  postArtShowImages,
};
