import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;

export default (req, res) => {
  if (req.method === 'GET') {
    if (!('token' in req.cookies)) {
      res.status(401).json({message: 'Unable to auth'});
      return;
    }
    let decoded;
    const token = req.cookies.token;
    if (token) {
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (err) {}
    }

    if (decoded) {
      res.json(decoded);
      return;
    } else {
      res.status(401).json({message: 'Unable to auth'});
    }
  }
};