import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res
          .status(401)
          .json({ errors: ['Invalid email or password..'] });
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(401).json({ errors: ['User not found..'] });
      }

      if (!(await user.isValidPassword(password))) {
        return res.status(401).json({ errors: ['Invalid email or password.'] });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

const tokenControllerInstance = new TokenController();
export default tokenControllerInstance;
