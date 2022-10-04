const container = require('../models/container.js');

const productFile = 'data/products.json';
const productElement = new container(productFile);
const cartsFile = 'data/carts.json';
const cartsElement = new container(cartsFile);

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const carts = await cartsElement.getAll();
        return res.render("carts", 
        { 
            carts: carts,
            haveCarts: carts.length > 0
        });
    } catch {
    res.send(
        "Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde."
    );
    }
};

controller.getById = async (req, res) => {
    const { id } = req.query;
    try {
        const data = await cartsElement.getById(parseInt(id));
        return res.send(data);
    } catch (e) {
        return res.status(404).send({ error: true, msg: "Producto no encontrado" });
    }
};

controller.save = async (req, res) => {
    const { product } = req.body;
    try {
        const data = await cartsElement.save({product});
        res.status(200).json({
            message: "Se ha creado un nuevo carrito",
            id: `${data.id}`,
        });
    } catch (e) {
        return res
        .status(404)
        .send({
            error: true,
            msg: "Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde.",
        });
    }
};

controller.saveProductInCart = async (req, res) => {
    const { id } = req.query;
    try {
        const productToAdd = await productElement.getById(parseInt(id))
        const producto = await cartsElement.editById(parseInt(id), productToAdd);
        return res.send({ error: false, msg: "Producto Modificado", producto });
    } catch (e) {
        return res.status(404).send({ error: true, msg: "Producto no encontrado" });
    }
};

controller.delete = async (req, res) => {
    try {
        const { id } = req.query;
        const data = await cartsElement.deleteById(parseInt(id));
        return res.send({ error: false, msg: "Producto Eliminado", data });
    } catch (e) {
        return res.status(404).send({ error: true, msg: "Producto no encontrado" });
    }
};

module.exports = controller;