import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);

      const { id, name, email } = newUser;

      return res.status(201).json({ id, name, email });
    } catch (error) {
      console.error(error.errors.map((err) => err.message));
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado.'] });
      }

      const { name, email } = req.body;

      console.log(name, email);

      if (!name && !email) {
        return res.status(400).json({
          errors: ['Nenhum dado de atualização foi enviado.'],
        });
      }

      let hasUpdates = false;

      if (name && name !== user.name) {
        user.name = name;
        hasUpdates = true;
      }

      if (email && email !== user.email) {
        user.email = email;
        hasUpdates = true;
      }

      if (!hasUpdates) {
        return res.status(400).json({
          errors: ['Nenhum dado foi modificado.'],
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

  async destroy(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ['Usuário não encontrado.'] });
      }

      await user.destroy();
      return res.status(204).send();
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
