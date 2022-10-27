const jwt =  require("jsonwebtoken")
const verifyUser = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1] || req.body.token;

      if (!token) {
        return res.status(403).json({ status:false, message: 'A token is required for authentication' });
      }
  
      if (token) {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        if (new Date().getTime() < tokenData.exp) {
          return res.status(401).json({ status:false, message: 'Token has expired, reauthenticate again' });
        }
  
        req.userId = tokenData.id;
        req.email = tokenData.email;
      }
      return next();
    } catch (error) {
        console.log(error)
      return res.status(500).send({ status:false, message: "Unable to authorize User " });
    }
  };

module.exports = verifyUser