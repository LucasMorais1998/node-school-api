/* eslint-disable camelcase */
import multer from 'multer';
import multerConfig from '../config/multer';

import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        const photo = await Photo.findOne({ where: { student_id } });

        if (photo) {
          photo.originalname = originalname;
          photo.filename = filename;

          await photo.save();

          const { id } = photo;

          return res.json({
            id,
            originalname,
            filename,
            student_id,
          });
        }

        const newPhoto = await Photo.create({
          originalname,
          filename,
          student_id,
        });

        const {
          id,
          originalname: newOriginalname,
          filename: newFilename,
        } = newPhoto;

        return res.json({
          id,
          originalname: newOriginalname,
          filename: newFilename,
          student_id,
        });
      } catch (error) {
        return res.status(400).json({
          errors: error.errors.map((e) => e.message),
        });
      }
    });
  }
}

const photoControllerInstance = new PhotoController();
export default photoControllerInstance;
