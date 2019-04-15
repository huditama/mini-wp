const Article = require('../models/article')

class articleController {
    static findAll(req, res) {
        Article
            .find({ UserId: req.authenticatedUser.id })
            .populate('UserId')
            .then((allArticles) => { res.status(200).json(allArticles) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static findOne(req, res) {
        const { ArticleId } = req.params
        Article
            .findOne({ _id: ArticleId })
            .populate('UserId')
            .then((findOneArticle) => { res.status(200).json(findOneArticle) })
            .catch((err) => { res.status(500).json(err.message) })
    }

    static create(req, res) {
        const { title, content } = req.body
        let gcsUrl;
        if (!req.file) gcsUrl = `https://www.abortionno.org/wp-content/uploads/2016/02/no-image-found.jpg`
        else gcsUrl = req.file.gcsUrl
        Article
            .create({
                title,
                content,
                createdAt: new Date(),
                UserId: req.authenticatedUser.id,
                image: gcsUrl
            })
            .then((createdArticle) => { res.status(201).json({ message: 'Added a new article!', createdArticle }) })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err.message)
            })
    }

    static update(req, res) {
        const { title, content } = req.body
        const { ArticleId } = req.params
        let gcsUrl;
        if (req.body.image) gcsUrl = req.body.image
        else gcsUrl = req.file.gcsUrl
        Article
            .findOneAndUpdate({ _id: ArticleId }, { title, content, image: gcsUrl }, { new: true })
            .then((updatedArticle) => { res.status(200).json({ message: 'Updated article!', updatedArticle }) })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err.message)
            })
    }

    static delete(req, res) {
        Article
            .findByIdAndDelete(req.params.ArticleId)
            .then((deletedArticle) => { res.status(200).json({ message: 'Deleted article!', deletedArticle }) })
            .catch((err) => { res.status(500).json(err.message) })
    }
}

module.exports = articleController