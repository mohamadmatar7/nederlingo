/**
 * An authentication Controller
 */

import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import DataSource from "../lib/DataSource.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "Wachtwoord",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
    {
      name: "firstname",
      label: "Voornaam ",
      type: "text",
      value: req.body?.firstname ? req.body.firstname : "",
      error: req.formErrorFields?.firstname ? req.formErrorFields.firstname : null,
    },
    {
      name: "lastname",
      label: "Achternaam",
      type: "text",
      value: req.body?.lastname ? req.body.lastname : "",
      error: req.formErrorFields?.lastname ? req.formErrorFields.lastname : null,
    },
    {
      name: "birthday",
      label: "Geboortedatum",
      type: "date",
      value: req.body?.birthday ? req.body.birthday : "",
      error: req.formErrorFields?.birthday ? req.formErrorFields.birthday : null,
    },
    {
      name: "birthplace",
      label: "Geboorteplaats",
      type: "text",
      value: req.body?.birthplace ? req.body.birthplace : "",
      error: req.formErrorFields?.birthplace ? req.formErrorFields.birthplace : null,
    },
    {
      name: "phone",
      label: "Telefoonnummer",
      type: "text",
      value: req.body?.phone ? req.body.phone : "",
      error: req.formErrorFields?.phone ? req.formErrorFields.phone : null,
    },
    {
      name: "address",
      label: "Adres",
      type: "text",
      value: req.body?.address ? req.body.address : "",
      error: req.formErrorFields?.address ? req.formErrorFields.address : null,
    },
    {
      name: "nationality",
      label: "Nationaliteit",
      type: "text",
      value: req.body?.nationality ? req.body.nationality : "",
      error: req.formErrorFields?.nationality ? req.formErrorFields.nationality : null,
    },
    {
      name: "parent",
      label: "Ouders/Voogd",
      type: "text",
      value: req.body?.parent ? req.body.parent : "",
      error: req.formErrorFields?.parent ? req.formErrorFields.parent : null,
    },
    {
      name: "family",
      label: "Gezinssituatie",
      type: "text",
      value: req.body?.family ? req.body.family : "",
      error: req.formErrorFields?.family ? req.formErrorFields.family : null,
    },
    {
      name: "bankpreference",
      label: "Banksvoorkeur",
      type: "text",
      value: req.body?.bankpreference ? req.body.bankpreference : "",
      error: req.formErrorFields?.bankpreference ? req.formErrorFields.bankpreference : null,
    },
    {
      name: "transport",
      label: "Vervoer",
      type: "text",
      value: req.body?.transport ? req.body.transport : "",
      error: req.formErrorFields?.transport ? req.formErrorFields.transport : null,
    },
    {
      name: "gender",
      label: "Geslacht",
      type: "text",
      value: req.body?.gender ? req.body.gender : "",
      error: req.formErrorFields?.gender ? req.formErrorFields.gender : null,
    },
    {
      name: "religion",
      label: "Geloofsovertuiging",
      type: "text",
      value: req.body?.religion ? req.body.religion : "",
      error: req.formErrorFields?.religion ? req.formErrorFields.religion : null,
    },


  ];

  // get the roles
  const roleRepository = await DataSource.getRepository("Role");
  const roles = await roleRepository.find();
  const metaRepository = await DataSource.getRepository("UserMeta");
  const meta = await metaRepository.find();

  // render the register page
  res.render("register", {
    layout: "authentication",
    inputs,
    formErrors,
    roles,
    meta,
  });
};

export const login = async (req, res) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "Wachtwoord",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
  ];

  // render the login page
  res.render("login", {
    layout: "authentication",
    // toevoegen van data aan de view
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;

      return next();
    } else {
      // make user repository instance
      const userRepository = await DataSource.getRepository("User");
      const roleRepository = await DataSource.getRepository("Role");
      const metaRepository = await DataSource.getRepository("UserMeta");
 

      const userExists = await userRepository.findOne({
        where: {
          email: req.body.email,
        },
      });

      const role = await roleRepository.findOne({
        where: {
          label: req.body.role,
        },
      });

      if(!role) {
        req.formErrors = [{ message: "Rol bestaat niet." }];
        return next();
      }


      if (userExists) {
        req.formErrors = [{ message: "Gebruiker bestaat al." }];
        return next();
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      const meta = await metaRepository.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        birthplace: req.body.birthplace,
        parent: req.body.parent,
        family: req.body.family,
        phone: req.body.phone,
        address: req.body.address,
        bankpreference: req.body.bankpreference,
        transport: req.body.transport,
        gender: req.body.gender,
        religion: req.body.religion,
        nationality: req.body.nationality,
      });



      // create a new user
      const user = await userRepository.create({
        email: req.body.email,
        password: hashedPassword,
        role,
        meta,

      });

      // save the user
      await userRepository.save(user);
      // window.location.reload();

      res.redirect("/")
    }
  } catch (e) {
    next(e.message);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;

      return next();
    } else {
      // get the user
      const userRepository = await DataSource.getRepository("User");
      // change email to lowercase letters
      const lwEmail = req.body.email.toLowerCase();

      // get a user with a specific email adress
      const user = await userRepository.findOne({
        where: {
          email: lwEmail,
        },
      });

      // authentication validation
      if (!user) {
        req.formErrors = [{ message: "Gebruiker bestaat niet." }];
        return next();
      }

      // compare hashed password with saved hashed password
      const givenPassword = req.body.password; // supersecret
      const dbPassword = user.password; //$2b$10$9sWBzAraG2EQHZs62uyVdeH2dJxDAM4aWwlcNKWHAX.m2ZUjneEQa
      const isAMatch = bcrypt.compareSync(givenPassword, dbPassword); // true or false

      // password check
      if (!isAMatch) {
        req.formErrors = [{ message: "Wachtwoord is niet correct." }];
        return next();
      }
      // console.log(user)
      // create the JWT web token, aka our identity card
      const token = jwt.sign(
        { id: user.id, email: req.body.email},
        process.env.TOKEN_SALT,
        { expiresIn: "1h" }
      );

      // create a cookie and add this to the response
      res.cookie("token", token, { httpOnly: true });

      // redirect to our root
      res.redirect("/");
    }
  } catch (e) {
    next(e.message);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
