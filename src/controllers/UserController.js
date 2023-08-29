import errorHandler from '../middlewares/errorHandlerMiddleware';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);

      const { id, name, email } = newUser;

      return res.status(201).json({ id, name, email });
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ['User not found.'] });
      }

      const { name, email } = req.body;

      if (!name && !email) {
        return res.status(400).json({
          errors: ['No update data has been sent.'],
        });
      }

      let hasUpdates = false;

      if (name && name !== user.name) {
        hasUpdates = true;
      }

      if (email && email !== user.email) {
        hasUpdates = true;
      }

      if (!hasUpdates) {
        return res.status(400).json({
          errors: ['No data has been modified.'],
        });
      }

      const updatedUser = await user.update(req.body);

      const { id, name: updatedName, email: updatedEmail } = updatedUser;

      return res.json({ id, name: updatedName, email: updatedEmail });
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }

  async destroy(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ['User not found.'] });
      }

      await user.destroy();
      return res.status(204).send();
    } catch (error) {
      return errorHandler(error, req, res);
    }
  }
}

const userControllerInstance = new UserController();
export default userControllerInstance;
