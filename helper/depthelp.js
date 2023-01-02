const db = require('../conf/mongo.config');
const { ObjectId } = require('mongodb');
const { response } = require('express');




module.exports = {
    addDept: (obj1) => {
        return new Promise(async (resolve, rej) => {
            const res = await db.getDb().collection("depts").insertOne(obj1);
            let response = {}
            if (res) {
                response.status = true;
                resolve(response)
            } else {
                response.status = false;
                resolve(response);
            }
        }).catch((e) => console.log(err))
    },
    showDept: () => {
        return new Promise(async (resolve, reject) => {
            const data = await db.getDb().collection('depts').find();
            if (data) {
                resolve(data)
            }
            else {
                reject("data not found")
            }

        })
    },
    deleteDept: (id) => {
        return new Promise(async (resolve, reject) => {
            const data = await db.getDb().collection('depts').deleteOne({ "_id": ObjectId(id) });
            if (data) {
                resolve(data)
            }
            else {
                reject("data not found")
            }

        })
    },
    getDept: (id) => {

        return new Promise(async (resolve, reject) => {
            const data = await db.getDb().collection('depts').findOne({ "_id": ObjectId(id) });
            if (data) {
                resolve(data)
            }
            else {
                reject("data not found")
            }

        })
    }
}