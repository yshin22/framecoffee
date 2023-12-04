import path from 'path';
import express from 'express';
import multer from 'multer';
import Menu from '../models/uploadModel.js';

const router = express.Router();

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

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');
const uploadMultipleImages = upload.array('images', 4);

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

// router.post('/upload/menu', upload.single('image'), (req,res) => {
//   console.log(req.file);
// })

router.post('/menu', async(req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send('error message:' + { message: err.message });
    }

    // Menu.create({image: `/${req.file.path}`});

    res.status(200).send({
      message: 'Image uploaded successfully',
      // image: `/${req.file.path}`,
      image: req.file.filename,
    });
  });
});

// router.get('/getmenuimage', (req,res) => {
//   Menu.find()
//   // console.log("getting image")
//   .then(menu => res.json(menu))
//   .catch(err => res.json(err))
// })

export default router;
