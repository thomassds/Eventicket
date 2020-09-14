const Buy  = require('../models/Buy');
const User = require('../models/User');
const Product = require('../models/Product');
const Event = require('../models/Event');
const { urlencoded } = require('express');
module.exports= {
    async store(req, res){
        const { user_id } = req.params;
        const { value, amount_value, tickets } = req.body;
        const product =[];
        var amount = 0;

       const newTickets = tickets.map((t) => { 
            if(t.amount_buy >= 1){
                product.push(t),
                amount = amount + 1
            }
        })

        const user = await User.findByPk(user_id)
            if(!user){
                return res.status(400).json({ error: 'User not found'});
            }

        const buy = await Buy.create({ value, amount_value, user_id, amount});
        
        for(var i = 0; i<product.length;i++){
            await buy.addProduct([product[i].id])
        }
        
        return res.json(buy)
        },
        
        async update(req, res){

        },

    async index(req, res){
        const { user_id, } = req.params;
        const products=[];
        const user = await User.findByPk(user_id, {
            include: { association: 'buys'}
        });

        for(var i = 0; i < user.buys.length; i++){
            const buy = await Buy.findByPk(user.buys[i].id, { include: { association: 'products' }})
            for(var i = 0; i< buy.products.length; i++){
                products.push(buy.products[i])
            }
        }
        
        return res.json(products);
    }
}