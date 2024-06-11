let express = require('express')
let mongodb = require('mongodb')
let url = require('../url')
let router = express.Router()

let mcl = mongodb.MongoClient
router.get("/", (req, res) => {
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log("Error in connection")
        else {
            let db = conn.db('nodedb')
            db.collection('products').find().toArray((err, array) => {
                if (err)
                    console.log("Error:-", err)
                else {
                    console.log('Data sent')
                    res.json(array)
                    conn.close()
                }
            })
        }
    })
})
module.exports = router