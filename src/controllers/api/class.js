import DataSource from "../../lib/DataSource.js";


export const getClasses = async (req, res, next) => {
    try {
        // get the repository
        const classRepository = DataSource.getRepository("Class");
    
        res.status(200).json(
        await classRepository.find({
            where: { id: null },
            relations: ["users", "users.meta"],
        })
        );
    } catch (e) {
        next(e.message);
    }
    };

export const getClass = async (req, res, next) => {
    try {
        // get the repository
        const classRepository = DataSource.getRepository("Class");
    
        res.status(200).json(
        await classRepository.findOne({
            where: { id: req.params.id },
            relations: ["users"],
        })
        );
    } catch (e) {
        next(e.message);
    }
    };

export const deleteClass = async (req, res, next) => {
    try {
        const classRepository = DataSource.getRepository("Class");
        // get the user by id
        const { id } = req.params;
        const Class = await classRepository.findOneBy({ id: id });
        await classRepository.remove(Class);
        res.status(200).json(`the class with id:${id} has been deleted`);
    } catch (e) {
        next(e.message);
    }
    };

export const postClass = async (req, res, next) => {
    try {
        const classRepository = DataSource.getRepository("Class");
        const classObj = req.body;
        const newClass = await classRepository.save(classObj);
        res.status(200).json(newClass);
    } catch (e) {
        next(e.message);
    }
    };

export const updateClass = async (req, res, next) => {
    try {
        const classRepository = DataSource.getRepository("Class");
        const Class = await classRepository.findOneBy({ id: req.params.id });

    if (!Class) {
      return res.status(404).json({ error: "Class not found" });
    }
    // Update the class's label based on request body
    if (req.body.label) {
      Class.label = req.body.label;
    }

    // Save the updated class
    await classRepository.save(Class);
    return res.status(200).json(Class);
    } catch (e) {
        next(e.message);
    }
    };