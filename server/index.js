const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let students = [
    { id: 1, name: 'Weera', u: 'buu', year: 2000, email: 'ball@gmail.com',faculty:'ComScince' },
    { id: 2, name: 'Thanabodee', u: 'cu', year: 1990, email: 'win@gmail.com',faculty:'ComScince'  }
]

app.post('/students', (req, res) => {
    let student = req.body
    student.id = students.length + 1
    students.push(student)
    res.status(201).json(student)
})

app.get('/students', (req, res) => {
    
    res.status(200).json(students)
})

app.get('/students/:id', (req, res) => {

    let id = req.params.id

    if(!id||isNaN(id)){                 //isNaN variable นี้เป็นตัวเลขหรือป่าว ถ้าไม่ return true
        res.status(400).json({errorMessage:'This api require `id` parameter'})
        return
    }

    res.json(students[req.params.id - 1])
})

app.get('/greeting', (req, res) => {
    let lang = {
        en: 'Hello',
        th: 'สวัสดี'
    }

    let l = req.query.lang

    if (!l) {
        res.json({ message: 'Hello' })
    } else {
        res.json({ message: lang[l] })
    }
})

module.exports = app