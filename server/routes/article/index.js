const express = require('express')
const router = express.Router()
const articleController = require('../../controllers/articleController')
const authenticate = require('../../middlewares/authenticate')
const authorize = require('../../middlewares/authorize')
const Multer = require('multer');
const gcsMiddlewares = require('../../middlewares/google-cloud-storage')
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

router.use(authenticate)
router.get('/', articleController.findAll)
router.post('/', multer.single('image'), gcsMiddlewares.sendUploadToGCS, articleController.create)
router.patch('/:ArticleId', authorize, multer.single('image'), gcsMiddlewares.sendUploadToGCS, articleController.update)
router.delete('/:ArticleId', authorize, articleController.delete)

module.exports = router