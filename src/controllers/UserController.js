import User from '../models/User';

class UserController {
  async store(req, res) {
    const newUser = await User.create({
      name: 'John',
      email: 'john_doe@email.com',
      password: 'password123',
    });

    res.json(newUser);
  }
}

const userControllerInstance = new UserController();
export default userControllerInstance;
