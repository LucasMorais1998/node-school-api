import jwt from 'jsonwebtoken';
import User from '../models/User';

const secretKey = process.env.TOKEN_SECRET;

export function generateAuthToken(userId, email) {
  const token = jwt.sign({ userId, email }, secretKey, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });

  return token;
}

export async function authenticateUser(email, password) {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user || !(await user.isValidPassword(password))) {
    throw new Error('Invalid email or password.');
  }

  const { id, email: userEmail } = user;

  return generateAuthToken(id, userEmail);
}

export function verifyAuthToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);

    return decoded;
  } catch (error) {
    throw new Error('Expired or invalid token.');
  }
}
