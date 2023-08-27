import { verifyAuthToken } from '../services/authService';

export default async function authMiddleware(req, res, next) {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).json({ errors: ['Token not provided.'] });
  }

  const [bearer, token] = tokenHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ errors: ['Invalid token format.'] });
  }

  try {
    const decodedToken = verifyAuthToken(token);

    req.userId = decodedToken.userId;
    req.userEmail = decodedToken.email;

    return next();
  } catch (error) {
    return res.status(401).json({ errors: ['Expired or invalid token.'] });
  }
}
