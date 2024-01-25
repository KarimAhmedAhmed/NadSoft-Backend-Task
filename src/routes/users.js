const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../prisma/prisma/client');
const prisma = new PrismaClient();
const  ensureAuth  = require("../middlewares/auth");

const {
    register,
    getAllUsers,
    getUsersById,
    updateUsers,
    deleteUsers
  } =  require("../controllers/users");

// Get all users
router.get('/',ensureAuth,  getAllUsers);

// Get a specific user
router.get('/:id', ensureAuth, getUsersById);

// Add a new user
router.post('/', register);

// Update a user
router.put('/:id', ensureAuth, updateUsers);

// Delete a user
router.delete('/:id', ensureAuth, deleteUsers);

module.exports = router;
