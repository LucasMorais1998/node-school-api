import multer from 'multer';

import multerConfig from '../config/multer';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  async store(req, res) {
    try {
      return upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            errors: [err.code],
          });
        }

        return res.json(req.file);
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
