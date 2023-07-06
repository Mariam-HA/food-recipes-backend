const Ingredient = require("../../models/Ingredient")

const createIngredent = async (req, res, next) => {
    try {
        const ingredient = await Ingredient.create(req.body)
        return res.status(201).json(ingredient)

    }

    catch (error) {
        next(error)
    }
}



const getIngredents = async (req, res, next) => {
    try {

        console.log(req.user)


        const ingredient = await Ingredient.find()
        return res.status(200).json(ingredient)
    } catch (error) {
        next(error)
    }
}

module.exports = { createIngredent, getIngredents }