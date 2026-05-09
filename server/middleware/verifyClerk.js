const { verifyToken } = require('@clerk/backend');

/**
 * Middleware: verifyClerk
 * Extracts and verifies the Clerk session token from the Authorization header.
 * Sets req.userId on success.
 */
const verifyClerk = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.CLERK_SECRET_KEY;

  if (!secretKey) {
    console.error('[Auth] CLERK_SECRET_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Server authentication not configured.' });
  }

  try {
    const payload = await verifyToken(token, { secretKey });
    req.userId = payload.sub;
    next();
  } catch (err) {
    console.error('[Auth] Token verification failed:', err.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
  }
};

module.exports = verifyClerk;
