/**
 * The API controllers
 */

import DataSource from "../../lib/DataSource.js";
import bcrypt from "bcrypt";
// import { ILike } from 'typeorm';
export const getUsers = async (req, res, next) => {
  try {
    // get the repository
    const userRepository = DataSource.getRepository("User");

    res.status(200).json(
      await userRepository.find({
        where: { id: null },
        relations: ["meta", "role"],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const getUser = async (req, res, next) => {
  try {
    // get the repository
    const userRepository = DataSource.getRepository("User");

    const users = await userRepository.findOne({
      where: { id: req.params.id },
      relations: ["meta", "role", "classrooms", "feedback"],
    });
    req.users = users;
    next();
  } catch (e) {
    next(e.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const usersRepository = DataSource.getRepository("User");
    const { id } = req.params;
    const userId = req.body.id;

    if (id === userId) {
      return res.status(400).json("You can't delete yourself");
    }

    const user = await usersRepository.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json("User not found");
    }
    await usersRepository.remove(user);

    res.redirect("/alleklassen");
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const usersRepository = DataSource.getRepository("User");
    const { id } = req.params;
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = await usersRepository.findOne({
      where: { id },
      relations: ["meta", "role"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.password) {
      user.password = hashedPassword;
    }

    if (req.body.firstname) {
      user.meta.firstname = req.body.firstname;
    }

    if (req.body.lastname) {
      user.meta.lastname = req.body.lastname;
    }

    // Save the updated user
    await usersRepository.save(user);

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const postAvatar = async (req, res, next) => {
  try {
    const usersRepository = DataSource.getRepository("User");
    const { id } = req.params;
    // Get the user by id
    const user = await usersRepository.findOne({
      where: { id },
      relations: ["meta", "role"],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update the user's meta properties based on request body
    if (req.file && req.file.originalname) {
      user.meta.avatar = "/images/avatars/" + req.file.originalname;
      console.log(req.file.originalname);
    }

    // Save the updated user
    await usersRepository.save(user);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

export const getUserByFirstName = async (req, res, next) => {
  try {
    // Get the repository
    const userRepository = DataSource.getRepository("User");
    const name = req.params.firstname.toLowerCase();

    const users = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.meta", "meta")
      .where("UPPER(meta.firstname) LIKE :firstName", { firstName: `${name}%` })
      .orWhere("UPPER(meta.lastname) LIKE :lastName", { lastName: `${name}%` })
      .orWhere("UPPER(meta.firstname || ' ' || meta.lastname) LIKE :lastName", {
        lastName: `${name}%`,
      })
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("user.classrooms", "classrooms")
      .getMany();

    res.status(200).json(users);
  } catch (e) {
    next(e.message);
  }
};

export const AddUserToClass = async (req, res, next) => {
  console.log("test", req);
  try {
    const usersRepository = DataSource.getRepository("User");
    const classroomRepository = DataSource.getRepository("Classroom");
    const { userId, classId } = req.body;

    const user = await usersRepository.findOneBy({ id: userId });
    const classroom = await classroomRepository.findOne({
      where: { id: classId },
      relations: ["users"],
    });
    if (!user || !classroom) throw new Error("User or classroom not found");
    if (classroom.users) {
      classroom.users.push(user);
    } else {
      classroom.users = [user];
    }
    await classroomRepository.save(classroom);
    return res.status(200).json(classroom);
  } catch (e) {
    next(e);
  }
};
// create a function to change a user's class
export const changeUserClass = async (req, res, next) => {
  try {
    console.log(req.body);
    const usersRepository = DataSource.getRepository("User");
    const classroomRepository = DataSource.getRepository("Classroom");
    const { userId, classId } = req.body;
    console.log('we got classId: ', classId)

    const user = await usersRepository.findOne({where: { id: userId}, relations: ["classrooms"] });
    const classroom = await classroomRepository.findOne({
      where: { id: classId },
      relations: ["users"],
    });
    if (!user || !classroom) throw new Error("User or classroom not found");
    
    console.log('will update classroom of current user to', classroom.id)
    user.classrooms = [
      {
        id: classroom.id
      }
    ];
    await usersRepository.save(user);
    
    // if (classroom.users) {
    //   classroom.users.push(user);
    // } else {
    //   classroom.users = [user];
    // }
    // await classroomRepository.save(classroom);
    return res.status(200).json(classroom);
  } catch (e) {
    next(e);
  }
}