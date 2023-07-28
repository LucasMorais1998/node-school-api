import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();

      if (users.length === 0) return res.status(204).json([]);

      return res.json(users);
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error.',
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado.'] });
      }

      return res.json(user);
    } catch (error) {
      console.error(error.errors.map((err) => err.message));
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
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

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado.'] });
      }

      if (req.body.name === user.name && user.email === req.body.email) {
        return res
          .status(400)
          .json({
            errors: [
              'Os dados informados para atualização são iguais aos dados atuais.',
            ],
          });
      }

      const updatedUser = await user.update(req.body);
      return res.json(updatedUser);
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
