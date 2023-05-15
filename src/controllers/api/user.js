/**
 * The API controllers
 */

import DataSource from "../../lib/DataSource.js";
import { ILike } from 'typeorm';
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

    res.status(200).json(
      await userRepository.findOne({
        where: { id: req.params.id },
        relations: ["meta", "role"],
      })
    );
  } catch (e) {
    next(e.message);
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    const usersRepository = DataSource.getRepository("User");
    // get the user by id
    const { id } = req.params;
    const userId = req.body.userId;

    if (id == userId) {
      res.status(400).json("You can't delete yourself");
    } else {
      const user = await usersRepository.findOneBy({ id: id });
      await usersRepository.remove(user);
      res.status(200).json(`the user with id:${id} has been deleted`);
    }
  } catch (e) {
    next(e.message);
  }
};

export const updateUser = async (req, res, next) => {
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



// export const getUserByFirstName = async (req, res, next) => {
//   try {
//     // get the repository
//     const userRepository = DataSource.getRepository("User");
//     const firstName = req.params.firstname.toLowerCase(); 

//     res.status(200).json(
//       await userRepository.find({
//         where: { meta: { firstname: ILike(`%${firstName}%`) } },
//         relations: ["meta", "role", "class",],
//       })
//     );
//   } catch (e) {
//     next(e.message);
//   }
// };


export const getUserByFirstName = async (req, res, next) => {
  try {
    // get the repository
    const userRepository = DataSource.getRepository("User");
    const firstName = req.params.firstname.toLowerCase();

    res.status(200).json(
      await userRepository.createQueryBuilder("user")
        .leftJoinAndSelect("user.meta", "meta")
        .where("UPPER(meta.firstname) LIKE :firstName", { firstName: `%${firstName}%` })
        .leftJoinAndSelect("user.role", "role")
        .leftJoinAndSelect("user.class", "class")
        .getMany()
    );
  } catch (e) {
    next(e.message);
  }
};










