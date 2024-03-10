import jwt from "jsonwebtoken";

export const UserMiddleware = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.lInfo;
    if (!cookieToken) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    const user = await jwt.verify(cookieToken, "8923r4u9832u423iu");

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ error: "Forbidden - Verified User access required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in UserMiddle:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};

export const AuthenticatedMiddlewareBoth = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.lInfo;
    if (!cookieToken) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    const user = await jwt.verify(cookieToken, "8923r4u9832u423iu");

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ error: "Forbidden - Verified User access required" });
    }

    req.user = user;

    // Check if the user is either a regular user or a super admin
    if (!user.isAdmin) {
      // If not a super admin, continue to the next middleware
      next();
    } else {
      // If the user is a super admin, set a flag in the request object
      req.isSuperAdmin = true;
      next();
    }
  } catch (error) {
    console.error("Error in AuthenticatedMiddleware:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};

export const SuperAdminMiddle = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.lInfo;
    if (!cookieToken) {
      return res.status(401).json({ error: "Unauthorized - Missing token" });
    }

    const user = await jwt.verify(cookieToken, "8923r4u9832u423iu");

    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Forbidden - super User access required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in UserMiddle:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", errormsg: error.message });
  }
};
