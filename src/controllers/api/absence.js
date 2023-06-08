import DataSource from "../../lib/DataSource.js";

export const getAbsences = async (req, res, next) => {
  try {
    const absenceRepo = DataSource.getRepository("Absence");

    const absences = await absenceRepo.find({
      relations: ["user", "user.meta"],
    });

    res.json(absences);
  } catch (e) {
    next(e.message);
  }
};

export const postAbsence = async (req, res, next) => {
    try {
      const userRepository = DataSource.getRepository("User");
      const absenceRepo = DataSource.getRepository("Absence");
  
      const { content, date } = req.body;
  
      if (!content || !date) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const user = await userRepository.findOne({ where: { id: req.body.user.id } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const absence = absenceRepo.create({
        reason: content,
        date: date,
        user: user,
      });
  
      await absenceRepo.save(absence);
  
      res.redirect("/afwezigheden")
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
  
  
  export const getAbsence = async (req, res, next) => {
    try {
      const absenceRepo = DataSource.getRepository("Absence");
      const absence = await absenceRepo.findOne({
        where: { id: req.params.id },
        relations: ["user"],
      });
        req.absence = absence;
        next();
    } catch (e) {
      next(e.message);
    }
  };