const express = require(`express`);
const router = express.Router();

const blogController = require('../controllers/blog');

router.post('/blog',blogController.showBlogs);  //PATH SHOULD BE SAME AS Form Action Path

module.exports = router;