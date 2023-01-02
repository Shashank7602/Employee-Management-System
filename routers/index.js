const express = require('express');
const route = express.Router();

route.get('/login1', (req, res) => {
    res.render('campgrounds/login1');
})

route.get('/case', (req, res) => {
    res.render('campgrounds/case');
})

route.get('/nbpdcl', (req, res) => {
    res.render('campgrounds/nbpdcl');
})

route.get('/sbpdcl', (req, res) => {
    res.render('campgrounds/sbpdcl');
})

route.get('/', (req, res) => {
    res.render('campgrounds/home');
})





route.get('/emphome', (req, res) => {
    if (req.session.email) {
        res.header('cache-control', 'private,no-cache,no-store,must revalidate')
        res.header('Express', '-1')
        res.header('paragrm', 'no-cache')
        res.render('emphome', { name: req.session.username })
    } else {
        res.redirect('login');
    }
})

module.exports = route;