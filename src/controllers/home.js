/**
 * A Home Controller
 */

import DataSource from "../lib/DataSource.js";



export const home = async (req, res) => {
  const user = await DataSource.getRepository("User").findOne({
    where: { id: req.user.id },
    relations: [
      "meta",
      "role",
      "class",
      "class.users",
      "subjects",
    ],
  });
  const Class = await DataSource.getRepository("Class").findOne({
    where: { id: user.class.id },
    relations: [
      "users",
      "users.meta",
    ],
  });
  const userRole = req.user.role.label;
  if(userRole==="Directeur"){
    res.render("directeur", {
      // user: req.user,
      user: user,
      Class: Class,
      
    });
    console.log(user);
    console.log(Class);
    return;

  }
  // render the home page
  res.render("home", {
    user: req.user,
  });
};
