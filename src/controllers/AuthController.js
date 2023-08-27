import { authenticateUser } from '../services/authService';

class AuthController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res
          .status(401)
          .json({ errors: ['Invalid email or password.'] });
      }

      const token = await authenticateUser(email, password);

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        error: error.message,
      });
    }
  }
}

const authControllerInstance = new AuthController();
export default authControllerInstance;
