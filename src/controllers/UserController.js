import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();

      return res.json(users);
    } catch (error) {
      console.error(error.errors.map((err) => err.message));
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          error: 'Usuário não encontrado.',
        });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error.',
      });
    }
  }

  async store(req, res) {
    try {
      const newUser = await User.create(req.body);

      return res.json(newUser);
    } catch (error) {
      console.error(error.errors.map((err) => err.message));
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

const userControllerInstance = new UserController();
export default userControllerInstance;
