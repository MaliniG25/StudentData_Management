const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// Create a new department
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        let department = await Department.findOne({ name });
        if (department) {
            return res.status(400).json({ msg: 'Department already exists' });
        }

        department = new Department({ name });
        await department.save();

        res.status(201).json(department);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// List all departments
router.get('/', async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a department
router.delete('/:id', async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({ msg: 'Department not found' });
        }

        await department.remove();
        res.json({ msg: 'Department removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
