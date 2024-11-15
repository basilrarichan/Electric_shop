const moongoose  = require('mongoose');

const productScheme = new moongoose.Schema({
    section:'String',
    banner:'String',
    primaryImage:'String',
    alternativeImage:'String',
    productName:'String',
    offerDetail:'String'

});
 
const Product = moongoose.model('Product',productScheme);

module.exports = Product;