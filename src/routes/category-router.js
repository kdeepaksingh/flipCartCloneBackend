const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { addCategory, fetchCategory } = require('../controllers/category-controller');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate() + "-" + file.originalname);
    }
});

const upload = multer({ storage });



router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/findcategory', fetchCategory);

// router.post(
//     "/category/create",
//     requireSignin,
//     superAdminMiddleware,
//     upload.single("categoryImage"),
//     addCategory
//   );
//   router.get("/category/getcategory", getCategories);
//   router.post(
//     "/category/update",
//     requireSignin,
//     superAdminMiddleware,
//     upload.array("categoryImage"),
//     updateCategories
//   );
//   router.post(
//     "/category/delete",
//     requireSignin,
//     superAdminMiddleware,
//     deleteCategories
//   );


module.exports = router;