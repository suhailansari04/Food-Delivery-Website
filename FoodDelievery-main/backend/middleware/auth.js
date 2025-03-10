import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.tokenUser;

    if (!token) {
        return res.json({
            success: false,
            message: "Unauthorized",
        });
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = verify.id;
        next();
    } catch (error) {
        return res.json({
            success: false,
            message: "Server Error",
        });
    }
};
export default authMiddleware;
