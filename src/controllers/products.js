const container = require('../models/container.js');

const productFile = 'data/products.json';
const productElement = new container(productFile);

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const products = await productElement.getAll();
        return res.render("products", 
        { 
            products,
            haveProducts: products.length > 0
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
        const data = await productElement.getById(parseInt(id));
        return res.send(data);
    } catch (e) {
        return res.status(404).send({ error: true, msg: "Producto no encontrado" });
    }
};

controller.save = async (req, res) => {
    const { title, price, thumbnail } = req.body;
    try {
        await productElement.save({ title, price, thumbnail });
        return res.redirect("/");
    } catch (e) {
        return res
        .status(404)
        .send({
            error: true,
            msg: "Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde.",
        });
    }
};

controller.update = async (req, res) => {
    const { id } = req.query;
    try {
        const producto = await productElement.editById(parseInt(id), req.body);
        return res.send({ error: false, msg: "Producto Modificado", producto });
    } catch (e) {
        return res.status(404).send({ error: true, msg: "Producto no encontrado" });
    }
};

controller.delete = async (req, res) => {
    try {
        const { id } = req.query;
        const data = await productElement.deleteById(parseInt(id));
        return res.send({ error: false, msg: "Producto Eliminado", data });
    } catch (e) {
        return res.status(404).send({ error: true, msg: "Producto no encontrado" });
    }
};

module.exports = controller;