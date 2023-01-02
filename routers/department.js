const express = require('express');
const userHelper = require('../helper/depthelp');
const db = require('../helper/depthelp');
const { response } = require('express');
const depthelp = require('../helper/depthelp');

const route = express.Router();


//create department

route.get('/department', (req, res) => {
    if (req.session.adminName) {
        const message = req.session.message;
        req.session.message = "";
        res.render('department', { message: message });
    } else {
        res.redirect('/admin')
    }
})

route.post('/department', async (req, res) => {
    const dept = await depthelp.userCount(req.body).then(data => data.user);

    if (!dept) {
        
        const obj1 = {
            "depname": req.body.depname,
            "short": req.body.short,
            "code": req.body.code
            
        }

        userHelper.addDept(obj1);

        res.redirect('/department');
    }
    else {
        res.redirect('/department');
    }
})

module.exports = route;