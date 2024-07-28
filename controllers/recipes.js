const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

router.get('/', async (req, res) => {
    const recipes = await Recipe.find();
    res.render('recipes/index.ejs', {recipes});
});

router.get('/new', async (req, res) => {
    res.render('recipes/new.ejs');
});

router.post('/create', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    try {
        const newRecipe = await Recipe.create(req.body);
        newRecipe.owner.push(currentUser._id);
        await newRecipe.save();
        res.redirect("/recipes");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    };
});

module.exports = router;