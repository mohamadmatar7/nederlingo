import sharp from "sharp";
import { PUBLIC_PATH } from "../consts.js";

export const saveAvatar = async (req, res, next) => {
    const file = req.file;
    console.log(file);

    if (!file) return next();
  
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/svg" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/gif"
    ) {
        
      const fileName = (file.originalname);
      await sharp(file.buffer)
        .resize(250, 250, {
          fit: sharp.fit.cover,
          withoutEnlargement: true,
        })
        .toFile(`${PUBLIC_PATH}/images/avatars/${fileName}`);
    } else {
      console.log("File type not supported"); // console
      res.send("File type not supported"); // browser
    }
  
    next();
  };