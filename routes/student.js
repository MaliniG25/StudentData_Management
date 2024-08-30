const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Department = require('../models/department');

// Create a new student
router.post('/', async (req, res) => {
    try {
        const { registration_number, name, departmentId } = req.body;

        let student = await Student.findOne({ registration_number });
        if (student) {
            return res.status(400).json({ msg: 'Student with this registration number already exists' });
        }

        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(400).json({ msg: 'Department does not exist' });
        }

        student = new Student({
            registration_number,
            name,
            department: departmentId,
        });

        await student.save();
        res.status(201).json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// List all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('department', ['name']);
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get students by department
router.get('/department/:departmentId', async (req, res) => {
    try {
        const students = await Student.find({ department: req.params.departmentId }).populate('department', ['name']);
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }

        await student.remove();
        res.json({ msg: 'Student removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
