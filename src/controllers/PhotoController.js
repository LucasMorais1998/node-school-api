import multer from 'multer';
import multerConfig from '../config/multer';
import errorHandler from '../middlewares/errorHandlerMiddleware';

import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  // eslint-disable-next-line consistent-return
  async store(req, res) {
    try {
      await upload(req, res, async (err) => {
        if (err) {
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
              errors: ['Invalid field name for file upload. Use "photo" field.'],
            });
          }

          return res.status(400).json({
            errors: [err.code],
          });
        }

        if (!req.file) {
          return res.status(400).json({
            errors: ['No file uploaded.'],
          });
        }

        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        if (!student_id) {
          return res.status(400).json({
            errors: ['student_id is required.'],
          });
        }

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
      });
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }
}

const photoControllerInstance = new PhotoController();
export default photoControllerInstance;
