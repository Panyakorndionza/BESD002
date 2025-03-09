var express = require('express')
var router = express.Router()
const mysql = require('./connecnt-mysql/mysql')

router.get('/list', (req, res) => {
    mysql.query('SELECT * FROM online_course', (err, result) => {
        if (!err) {
            res.status(200).json({OnlineCourse: result })
        } else {
            console.error('Database query error:', err)
            res.status(500).json({ OnlineCourse: [] })
        }
    })
})

router.get('/search/:id', (req, res) => {
    const id = req.params.id
    mysql.query('SELECT * FROM online_course where course_id = ?',[id], (err, result) => {
        if (!err) {
            res.status(200).json({OnlineCourse: result })
        } else {
            console.error('Database query error:', err)
            res.status(500).json({ OnlineCourse: [] })
        }
    })
})

router.get('/promote', (req, res) => {
    const id = req.params.id
    mysql.query('SELECT * FROM online_course where promote = true', (err, result) => {
        if (!err) {
            res.status(200).json({OnlineCourse: result })
        } else {
            console.error('Database query error:', err)
            res.status(500).json({ OnlineCourse: [] })
        }
    })
})

router.post('/create', (req, res) => {
    let { course_id, title, description, duration,lecturer,category,promote,course_image } = req.body
    let content = [course_id, title, description, duration,lecturer,category,promote,course_image]
    mysql.query('INSERT INTO `online_course`(`course_id`, `title`, `description`, `duration`, `lecturer`, `category`, `promote`, `course_image`) VALUES (?,?,?,?,?,?,?,?)',content, (err, result) => {
        if (!err) {
            res.status(200).json({result: 1 })
        } else {
            console.error('Database query error:', err)
            res.status(500).json({result: 0 })
        }
    })
})

router.put('/update', (req, res) => {
    let { course_id, title, description, duration,lecturer,category,promote,course_image } = req.body
    let content = [title, description, duration,lecturer,category,promote,course_image,course_id]
    mysql.query('UPDATE `online_course` SET `title`=?,`description`=?,`duration`=?,`lecturer`=?,`category`=?,`promote`=?,`course_image`=? WHERE course_id = ?',content, (err, result) => {
        if (!err) {
            res.status(200).json({result: 1 })
        } else {
            console.error('Database query error:', err)
            res.status(500).json({result: 0 })
        }
    })
})

router.delete('/delete', (req, res) => {
    let { course_id } = req.body
    mysql.query('DELETE FROM `online_course` WHERE course_id = ?',[course_id], (err, result) => {
        if (!err) {
            res.status(200).json({result: 1 })
        } else {
            console.error('Database query error:', err)
            res.status(500).json({result: 0 })
        }
    })
})

module.exports = router