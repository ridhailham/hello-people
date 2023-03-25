const express = require('express')
const app = express()
const port = 3000;

const bodyParser= require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    response(200,"ini data", "ini massage", res)
})

app.get('/mahasiswa', (req, res) => {
    const { nim, namaLengkap, kelas, alamat } = req.body

    const sql = `INSERT INTO mahasiswa VALUES (${nim}, ${namaLengkap}, ${kelas}, ${alamat})`
    
    db.query(sql, (err, fields) => {
        console.log(fields)
    })

    response(200, "INI POST", "Data Add Successfully", res)
})

app.get('/mahasiswa/id/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM mahasiswa WHERE id = ${id}`
    db.query(sql, (err, fields) => {
        if (err) throw err
        console.log(fields)
        response(200, fields, "ini massage", res)
    })
    
}) 

app.get ('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
    db.query (sql, (err, fields) => {
        if (err) throw err
        
        response (200, fields, "get detail mahasiswa", res)
    })
})

app.get('/mahasiswa/:id', (req, res) => {
    const id = req.params.id
    response(200, `spesifik mahasiswa by ${id}`, res)
})

app.get('/mahasiswa/nim/:nim', (req, res) => {
    const nim = req.params.nim
    res.send(`spesifik nim mahasiswa ${nim}`)
})

app.post('/mahasiswa', (req, res) => {
    const { nim, namaLengkap, kelas, alamat } = req.body

    console.log(req.body)

    const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`
    db.query(sql, (err, fields) => {
        if (err) throw err
        console.log(fields)
    })
    res.send("ok")
})

app.post('/mahasiswa/post', (req, res) => {
    response(200, "ini post mahasiswa", res)
})

app.put('/mahasiswa', (req, res) => {
    const { nim, namaLengkap, kelas, alamat } = req.body
    const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`

    db.query(sql, (err, fields) => {
        if (err) {
            response(500, "invalid", "error", res)
            console("error dek")
        }
        response(200, "update test", "INI PUT ATAU UPDATE DATA", res)
        console.log("PUT berhasil boss")
    })
})

app.delete('/mahasiswa', (req, res) => {
    const { nim } = req.body
    const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql, (err, fields) => {
        if(err) response(500, "invalid", "error", res)
        console.log(fields)
    })
    response(200, "delete test", "ini DELETE data", res) 
    console.log("DELETE data berhasil boss")
})

app.listen(port, () => {
    console.log("server berjalan dengan baik boss")
})