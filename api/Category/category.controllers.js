const Category = require("../../models/Category")




const createCategory = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.Image = `${req.file.path}`
        }
        const category = await Category.create(req.body)
        return res.status(201).json(category)


    } catch (error) {
        next(error)

    }

}

const getCategory = async (req, res, next) => {
    try {

        console.log(req.user)


        const category = await Category.find()
        return res.status(200).json(category)
    } catch (error) {
        next(error)
    }
}

module.exports = { createCategory, getCategory }