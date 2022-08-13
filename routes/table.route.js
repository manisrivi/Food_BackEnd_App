// import files
const router = require("express").Router();
const service = require("../services/table.service");

// products router
router.get("/", service.getAllTable);
router.get("/:id", service.getTableById);
router.post("/", service.createTable);
router.put("/:id", service.updateTable);
router.delete("/:id", service.deleteTableById);

// export
module.exports = router;