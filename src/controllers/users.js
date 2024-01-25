const Sequelize = require("sequelize");
const {wrapper} = require("../utils/Wrapper");
const {isPhoneNumberValid, isCountryValid  } = require('../utils/Validations');
const  {createAccessToken}  = require("../service/JWTTokenService");

const { PrismaClient } = require('../../prisma/prisma/client');
const prisma = new PrismaClient();

module.exports = {
  register: wrapper(async (req, res) => {

    const { name, email, age, country, mobile } = req.body;

    //Check if User is exist
    const checkUserExistByEmail = await prisma.user.findUnique({  
        where: { email: email },
    })
    const checkUserExistByMobile = await prisma.user.findUnique({  
      where: { mobile: mobile },
  })
    if (checkUserExistByEmail || checkUserExistByMobile) throw new Error(`This email or mobile is already exist`);

    //Country Validation
    const validateCountry = isCountryValid(country);
    if (!validateCountry) throw new Error("Invalid country");

    const validatePhoneNumber = isPhoneNumberValid(mobile, country);
    if (!validatePhoneNumber) throw new Error("Invalid mobile format");

    const newUser = await prisma.user.create({
      data: { name, email, age, country, mobile },
    });


    const accessToken = await createAccessToken(email, mobile);

      res.status(201).json({user: newUser, token: accessToken});
  }),



  getAllUsers: wrapper(async (req, res) => {

    const users = await prisma.user.findMany();

    if(!users) { res.status(200).json({message: "No users"})    }

      res.status(200).json(users);
  }),

  getUsersById: wrapper(async (req, res) => {

    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    res.status(200).json(user);
  }),


  
  updateUsers: wrapper(async (req, res) => {

    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      return res.status(404).send('User not found');
    }

    
    const { name, email, age, country, mobile } = req.body;

    //Country Validation
    const validateCountry = isCountryValid(country);
    if (!validateCountry) throw new Error("Invalid country");
  
    const validatePhoneNumber = isPhoneNumberValid(mobile, country);
    if (!validatePhoneNumber) throw new Error("Invalid mobile format");

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, age, country, mobile },
    });


    res.status(200).json(updatedUser);
  }),


  deleteUsers: wrapper(async (req, res) => {
    const userId = parseInt(req.params.id);
    await prisma.user.delete({
      where: { id: userId },
    });
  

    res.status(200).json('User deleted successfully');
  }),

}
