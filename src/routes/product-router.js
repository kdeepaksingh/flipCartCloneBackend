const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { addProduct, fetchProduct } = require('../controllers/product-controller');
const multer = require('multer');
const shortid = require('shortid');
const router = express.Router();
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname),'uploads/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), addProduct);



router.get('/product/findproduct', fetchProduct);


// router.post(
//     "/product/create",
//     requireSignin,
//     adminMiddleware,
//     uploadS3.array("productPicture"),
//     createProduct
//   );
//   router.get("/products/:slug", getProductsBySlug);
//   //router.get('/category/getcategory', getCategories);
//   router.get("/product/:productId", getProductDetailsById);
//   router.delete(
//     "/product/deleteProductById",
//     requireSignin,
//     adminMiddleware,
//     deleteProductById
//   );
//   router.post(
//     "/product/getProducts",
//     requireSignin,
//     adminMiddleware,
//     getProducts
//   );



module.exports = router;