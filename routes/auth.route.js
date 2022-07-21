const service = require("../services/auth.service");
const router = require("express").Router();

router.post("/register", service.register);
router.post("/login", service.login);

module.exports = router;
