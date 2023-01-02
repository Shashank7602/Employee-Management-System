const express = require('express');
const userHelper = require('../helper/userHelper');
const bcrypt = require('bcrypt');
const db = require('../helper/userHelper');
const { response } = require('express');

const route = express.Router();

//admin 

route.get('/', (req, res) => {
    if (req.session.adminName) {
        res.redirect('/adminHome')
    } else {
        const message = req.session.message;
        req.session.message = "";
        res.render('admin', { message: message, "name": req.session.adminName });
    }

})

route.post('/', async (req, res) => {

    await db.adminLogin(req.body).then(data => {
        if (data.user) {
            req.session.adminName = data.username;
            res.redirect('adminHome');
        }
        else {
            req.session.message = "user name or password is wrong";
            res.redirect('admin');
        }

    }).catch(e => console.log(e));
})


//delete user

route.get('/deleteUser/:id', (req, res) => {
    let proId = req.params.id;
    userHelper.deleteUser(proId).then((response) => { res.redirect('/admin') })
})

// edit user
route.get('/editUser/:id', async (req, res) => {
    if (req.session.adminName) {
        const user = await userHelper.getUser(req.params.id);
        res.render('adminEdit', { user: user });
    } else {
        res.redirect('admin')
    }
})

route.post('/editUser/admin/editUser/:id', async (req, res) => {
    await userHelper.updateUser(req.body, req.params.id).then((response) => {
        res.redirect('/adminHome');
    })

})

//create user

route.get('/createUser', (req, res) => {
    if (req.session.adminName) {
        const message = req.session.message;
        req.session.message = "";
        res.render('adminCreate', { message: message });
    } else {
        res.redirect('/admin')
    }
})

route.post('/createUser', async (req, res) => {
    const count = await userHelper.userCount(req.body).then(data => data.user);

    if (!count) {
        const hashpass = await bcrypt.hash(req.body.password, 10);
        const obj = {
            "name": req.body.name,
            "email": req.body.email,
            "password": hashpass,
            "empid": req.body.empid,
            "gender": req.body.gender,
            "department": req.body.department,
            "company": req.body.company,
            "status": req.body.status,
            "address": req.body.address,
            "city": req.body.city,
            "number": req.body.number
        }

        userHelper.addUser(obj);

        res.redirect('/adminHome');
    }
    else {
        req.session.message = "user already exist";
        res.redirect('/admin/createUser');
    }
})

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
    const dept = await depthelp.deptCount(req.body).then(data => data.dept);

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
        res.redirect('/admin/department');
    }
})

module.exports = route;