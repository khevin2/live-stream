import session from "express-session";

export default function authorize(req, res, next) {
  try {
    if (!req.session.email) {
      return res.status(401).json("Unknown User. Login First...");
    }
    next();
  } catch (e) {
    res.status(500).json(`Error: ${e.message}`);
  }
}
