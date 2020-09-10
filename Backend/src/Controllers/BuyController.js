const Buy  = require('../models/Buy');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports= {
    async store(req, res){
        const { user_id } = req.params;
        const { value, amount_value, products } = req.body;

        const user = await User.findByPk(user_id)
        if(!user){
            return res.status(400).json({ error: 'User not found'});
        }

        const buy = await Buy.create({ value, amount_value, user_id});


        for(i = 0; i <= products.length; i++){
            var id = products[i]
            const product = await Product.findByPk(id)
            await buy.addProduct(product);
        }

        return res.json(buy);

    },

    async index(req, res){
        const { user_id } = req.params;
        
        const user = await User.findByPk(user_id, {
            include: { association: 'buys'}
        });
        return res.json(user);
    }
}