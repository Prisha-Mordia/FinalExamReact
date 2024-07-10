const express = require("express");
const router = express.Router();

const User = require("../models/usersModel");


router.post('/add', async (req, res) => {
    const { name, email, phone, city, address } = req.body;
    try {
        if (!name || !email || !phone || !city || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let newUser = await User.create({
            name,
            email,
            phone,
            city,
            address
        });

        return res.status(200).json({
            message: 'User added successfully',
            user: newUser
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});


router.get('/all', async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.status(200).json({
            message: 'All users fetched successfully',
            users: allUsers
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.delete('/', async (req, res) => {
    const { id } = req.query;

    try {
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'User deleted successfully',
            user: deletedUser
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.get('/', async (req, res) => {
    const { id } = req.query;

    try {
        const user = await User.findById(id);
        return res.status(200).json({
            message: 'User fetched successfully',
            user
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});


router.post('/update', async (req, res) => {
    const { id, name, email, phone, city, address } = req.body;
    try {
        if (!id || !name || !email || !phone || !city || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            city,
            address
        }, { new: true });

        return res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})

module.exports = router;