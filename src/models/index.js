const category = require('./Category');
const Image = require('./Image');
const product = require('./Product');
const cart = require('./Cart');
const User = require('./User');
const Purchase = require('./Purchase');

//!Relacion de product y category. ■ categoryId

category.hasMany(product);
product.belongsTo(category);

//! Relacion de image y product. ■	productId

product.hasMany(Image)
Image.belongsTo(product)

//! Relacion de cart y product. ■ productId

product.hasMany(cart);
cart.belongsTo(product);

//! Relacion de cart y user es uno a uno. ■	userId

User.hasMany(cart);
cart.belongsTo(User);

//!Relacion de purchase y user. ■ userId

User.hasMany(Purchase);
Purchase.belongsTo(User);

//! Relacion de purchase y product. ■ productId

product.hasHook(Purchase);
Purchase.belongsTo(product);