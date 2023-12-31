const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Image = require('../models/Image');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const results = await Purchase.findAll(
        {where: {userId: userId},
        include: [{
            model: Product,
            include:  [Image]
        }]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const cart = await Cart.findAll({
        where: { userId: req.user.id},
        atributes: [ 'userId', 'productId', 'quantity'],
        raw: true
    });
    const purchases = await Purchase.bulkCreate(cart);
    await Cart.destroy({where: { userId: req.user.id}});
    return res.json(purchases);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Purchase.destroy({ where: {id} });
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove,
}