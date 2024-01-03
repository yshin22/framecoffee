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

const options = {
  projection: {_id: 0, image: 1}
}

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
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
};

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
        // console.log(menuList);

      const menu = new Menu({
        image: menuList,
      })
  
      const createdMenu = await menu.save();
  
      res.status(200).send({
        menu: createdMenu,
        message: 'Menu uploaded successfully',
      })
      
      // .send({
      //   message: 'Image uploaded successfully',
      //   image: req.file.filename,
      // });
    }
  });
});


export {
  getMenus,
  postMenu,
  deleteMenus,
  postProductImage,
};
