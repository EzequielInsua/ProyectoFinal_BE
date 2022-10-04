const router = require('express').Router();
const controller = require('../controllers/carts.js');
const { adminAuth } = require("../middlewares/middlewares");

//? CART

router.post("/", adminAuth(true), controller.save);
router.delete("/:id", adminAuth(true), controller.delete);
router.get("/:id/productos", adminAuth(true), controller.getById);
router.post("/:id/productos", adminAuth(true), controller.saveProductInCart);
router.delete("/:id/productos/:id_prod", adminAuth(true), controller.delete);