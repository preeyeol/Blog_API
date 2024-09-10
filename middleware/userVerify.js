const jwt = require('jsonwebtoken');


const authenticateToken=(req, res, next) =>{
    try{
        const authHeader = req.headers['authorization'];
        console.log(authHeader)
      
        if (!authHeader) {
          return res.status(401).json({ message: 'No token provided' });
        }
      
        const token = authHeader.split(' ')[1]; 
      
        if (!token) {
          return res.status(401).json({ message: 'Token not found' });
        }
    
  jwt.verify(token, process.env.jwt_secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; 
    next();
  });}catch(err){
    res.status(400).json({
        err
    })
}

}

module.exports = authenticateToken;
