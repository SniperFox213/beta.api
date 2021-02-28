// Importing components
const router = require("express").Router();

// Importing routes and then using them???

// @route profile/create
import createProfile from "./routes/profile/create";
router.use("/profile/create", createProfile);

// @route profile/:id/index
import profileIndex from "./routes/profile/:id/index";
router.use("/profile/:id", profileIndex);

export default router;