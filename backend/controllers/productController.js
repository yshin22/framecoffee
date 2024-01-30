import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


// @desc Fetch all products
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async (req,res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? { name: {$regex: req.query.keyword, $options: 'i'}} : {};

    const count = await Product.countDocuments({...keyword});

    const products = await Product.find({...keyword}) 
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc Fetch a product
// @route GET /api/products/:ID
// @access public
const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req,res) => {
  const products = await Product.find({}).sort({rating: -1}).limit(3);

  res.status(200).json(products);
});

// @desc Create a product
// @route POST /api/products
// @access Private/ admin
const createProduct = asyncHandler(async (req,res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        secondImage: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        newReviews: 0,
        description: 'Sample description',
        origin: 'Sample origin',
        roastingLevel: 0,
        cuppingNote: 'Sample cupping note',
    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc Update a products
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req,res) => {
    const {name, price, description, image, secondImage, brand, category, countInStock, origin, roastingLevel, cuppingNote} = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.secondImage = secondImage;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        product.origin = origin;
        product.roastingLevel = roastingLevel;
        product.cuppingNote = cuppingNote;

        const updateProduct = await product.save();
        res.json(updateProduct);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
  
      product.reviews.push(review);
  
      product.numReviews = product.reviews.length;
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
  
      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });   

export { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    createProductReview,
    getTopProducts,
};