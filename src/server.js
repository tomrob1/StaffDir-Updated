/*  ---------------------------------------------
*   ---------------Configuration-----------------
*   ---------------------------------------------
*/
var express = require('express')
var cors = require('cors')
var mysql = require('mysql')
var serveStatic = require ('serve-static')
var https = require ('https')
var fs = require('fs')
var path = require ('path')
var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

let app = express()
app.use(cors())
app.use(redirectToHTTPS())


//Cors configuration - Allow Origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//DB Credentials
var connection = mysql.createConnection({
    host: 'mysql.csc.liv.ac.uk',
    user: 'tar',
    password: 'NavProject2019',
    database: 'tar',
    port: '3306',
    //socketPath: '/var/lib/mysql/mysql.sock'
})

//Connect
connection.connect(function(error){
    if (error){
        return console.error('error: ' + error.message)
    }
    console.log('Connected to the MySQL Server')
})


var key = fs.readFileSync(__dirname + '/certs/selfsigned.key')
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt')
var options = {
    key: key,
    cert: cert
}
//var httpServer = http.createServer(app)
var httpsServer = https.createServer(options,app)

//httpServer.listen(4000)
httpsServer.listen(5000)

//Load correct files when hosted on server
//app.use(serveStatic(path.join(__dirname,'/static')))
//app.use(express.static('static'))
/*  ---------------------------------------------
*   ---------------Endpoints---------------------
*   ---------------------------------------------
*/

/*
Error Message : chunk-vendors.65bbc9f9.js:69 GET https://10.50.8.1:5000/namesearch?FullName=Tom net::ERR_CERT_AUTHORITY_INVALID
*/

//Name Search function
app.get('/namesearch', (req,res)=> {
    var FullName = req.query.FullName
    const NAMESEARCH = "SELECT Staff.FirstNames, Staff.Surname, Staff.UsernameMWS, Staff.UsernameCS, Staff.QRCode_ID, Staff.Email, Staff.TelephoneNumber, JobTitle.JobName, Departments.Department, SpaceRef.RoomNumber, SpaceRef.CommonName, CONCAT(Staff.FirstNames, ' ',Staff.Surname)\
    AS FullName \
    FROM Staff \
    LEFT JOIN JobTitle on Staff.JobTitle_ID = JobTitle.JobTitle_ID \
    INNER JOIN Departments ON Staff.Dept_ID = Departments.Dept_ID \
    INNER JOIN SpaceRef ON Staff.QRCode_ID = SpaceRef.QRCode_ID\
    WHERE CONCAT(Staff.FirstNames, ' ',Staff.Surname) LIKE CONCAT('%',?,'%') \
    ORDER BY Staff.Surname"
    connection.query(NAMESEARCH,[FullName],(error,results)=>{
        if(error){
            return res.send(error)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
})

app.get('/namesearchtest', (req,res) => {
    var FullName = req.query.FullName
    const NAMESEARCHTEST = "SELECT Staff.FirstNames, Staff.Surname,Staff.UsernameMWS, Staff.UsernameCS, Staff.QRCode_ID, Staff.Email, Staff.TelephoneNumber,JobTitle.JobName, CONCAT(Staff.FirstNames, ' ', Staff.Surname) \
    AS FullName \
    From Staff \
    LEFT JOIN JobTitle on Staff.JobTitle_ID = JobTitle.JobTitle_ID \
    WHERE CONCAT(Staff.FirstNames, ' ',Staff.Surname) LIKE CONCAT('%',?,'%')"
    connection.query(NAMESEARCHTEST,[FullName],(error,results)=>{
        if(error){
            return res.send(error)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
})

//Map function
app.get('/map',(req,res)=> {
    var QRCodeID = req.query.QRCodeID
    const MAP ="SELECT Staff.FirstNames, Staff.Surname, Staff.TelephoneNumber, Staff.Email, SpaceRef.RoomNumber, SpaceRef.CommonName, RoomType.RoomType \
    FROM Staff \
    INNER JOIN SpaceRef ON Staff.QRCode_ID = SpaceRef.QRCode_ID  \
    INNER JOIN RoomType ON SpaceRef.RoomType_ID = RoomType.RoomType_ID \
    WHERE Staff.QRCode_ID = ?"
    connection.query(MAP,[QRCodeID],(error,results)=>{
        if(error){
            return res.send(error)
        }
        else{
            return res.json({
                data:results
            })
        }
    })
})

//Board function
app.get('/board', (req,res)=>{
    const BOARD = "SELECT Staff.FirstNames, Staff.Surname, Staff.TelephoneNumber, Staff.Email, SpaceRef.RoomNumber, Staff.QRCode_ID, SpaceRef.Building_ID \
    FROM Staff \
    INNER JOIN SpaceRef on Staff.QRCode_ID = SpaceRef.QRCode_ID\
    ORDER BY SpaceRef.RoomNumber"
    connection.query(BOARD,(error,results)=>{
        if(error){
            return res.send(error)
        }
        else{
            return res.json({
                data:results
            })
        }
    })
})
