const router = require('express').Router();
const controller = require('../controllers/products.js');
const { completedFields, adminAuth } = require("../middlewares/middlewares");
//? PRODUCTS

router.get("/", adminAuth(true), controller.getAll);
router.get("/:id", adminAuth(true), controller.getById);
router.post("/", adminAuth(true), completedFields, controller.save);
router.put("/:id", adminAuth(false), completedFields, controller.update);
router.delete("/:id", adminAuth(false), controller.delete);


module.exports = router;