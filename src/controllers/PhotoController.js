/* eslint-disable camelcase */
import multer from 'multer';
import multerConfig from '../config/multer';

import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  store(req, res) {
    try {
      return upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({
            errors: [err.code],
          });
        }

        const { originalname, filename } = req.file;
        const { student_id } = req.body;
        const photo = await Photo.create({ originalname, filename, student_id });

        return res.json(photo);
      });
    } catch (error) {
      console.error(error.errors.map((err) => err.message));
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

const photoControllerInstance = new PhotoController();
export default photoControllerInstance;
