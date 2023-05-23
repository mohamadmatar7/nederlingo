import { body } from "express-validator";

// export default [
//   body("email").isEmail().withMessage("Geef een geldig e-mailadres op"),
//   body("password")
//     .isLength({ min: 8, max: 20 })
//     .withMessage("Het wachtwoord moet tussen de 8 en 20 karakters lang zijn"),
// ];


export default [
  body("email")
    .isEmail().withMessage("Geef een geldig e-mailadres op")
    .custom((value) => {
      if (!value.endsWith("@okan.be")) {
        throw new Error("Alleen e-mailadressen met @okan.be zijn toegestaan");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Het wachtwoord moet tussen de 8 en 20 karakters lang zijn"),
];