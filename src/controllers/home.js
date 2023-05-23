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
    ],
  });
  const classes = await DataSource.getRepository("Class").find({
    relations: [
      "users",
      "users.meta",
      "subjects",
      "users.role"
    ],
  });

  const Class = await DataSource.getRepository("Class").findOne({
    where: { id: user.class.id },
    relations: [
      "users",
      "users.meta",
      "subjects",
    ],
  });
  const userRole = req.user.role.label;
  if(userRole==="Directeur"){
    res.render("directeur", {
      // user: req.user,
      user: user,
      Class: Class,
      classes: classes,
      
    });
    // console.log(user);
    // console.log(Class);
    console.log(classes);
    return;
  };


  if(userRole==="Lesgever"){
    res.render("lesgever", {
      user: user,
      Class: Class,
      classes: classes,
    });
    return;
  };

  if(userRole==="Begeleider"){
    res.render("begeleider", {
      user: user,
      Class: Class,
      classes: classes,
    });
    return;
  };

  // render the home page
  res.render("home", {
    user: req.user,
  });
};
