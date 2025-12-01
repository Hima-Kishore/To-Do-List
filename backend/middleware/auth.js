import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if(!fullToken) return res.status(401).json({ error: "Acces Denied: No token provided" });
    try{
        const verifiedUser = jwt.verify(token, secret);
        req.user = verifiedUser;
        
        next();
    }
    catch(err) {
        res.clearCookie('token');
        res.status(403).json("Invalid Token");
    }

}

export default auth;