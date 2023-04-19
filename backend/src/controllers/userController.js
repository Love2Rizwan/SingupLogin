const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//============================= Register Api ===================

const register = async (req, res) => {
  try {
    const userData = req.body;
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        status: false,
        message: "User Already Exist",
        data: existingUser,
      });
    }

    // Store hash in your password DB.
    const password = userData.password;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    req.body.password = hashPassword;

    const newUser = await userModel.create(userData);
    return res
      .status(201)
      .json({ status: true, message: "Successfully Created", data: newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      status: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

//============================== login Api  ========================

const login = async (req, res) => {
  try {


    const existUser = await userModel.findOne({ email: req.body.email });
    if (!existUser) {
      return res
        .status(404)
        .json({ status: false, message: "User Not Exist Please register" });
    }

    // Load hash from your password DB.
    const isMatch = await bcrypt.compareSync(
      req.body.password,
      existUser.password
    );
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Credential " });
    }

    // Token
    const token = jwt.sign({ id: existUser._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    return res
      .status(200)
      .json({ status: true, message: "Login SuccessFully ", token: token });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: `login Controller ${error.message}` });
  }
};



module.exports = { register, login };
