const Buy  = require('../models/Buy');
const User = require('../models/User');
const Product = require('../models/Product');
const Event = require('../models/Event');
const { urlencoded } = require('express');
module.exports= {
    async store(req, res){
        const { user_id } = req.params;
        const { data:{amount_sales, event_id, value, amount_value, tickets} } = req.body;
        const product =[];
        var amount = 0;


       const newTickets = tickets.map((t) => { 
            if(t.amount_buy >= 1){
                product.push(t),
                amount = amount + t.amount_buy
            }
        })

        const user = await User.findByPk(user_id)
            if(!user){
                return res.status(400).json({ error: 'User not found'});
            }

        const buy = await Buy.create({ value, amount_value, user_id, amount});
        
        const event = await Event.update({amount_sales: (amount_sales + amount)},{ where: { id: event_id }});

        for(var i = 0; i<product.length;i++){ 
            const prod = await Product.update({ amount_sales: (product[i].amount_sales + product[i].amount_buy)}, {where: {id : product[i].id}})
            await buy.addProduct([product[i].id])
        }
        
        return res.json(product)
        },
        

    async index(req, res){
        const { user_id, } = req.params;
        const user = await User.findByPk(user_id, {
            include: { association: 'buys'}
        });
        const buy = await Buy.findAll({where:{ user_id }, include: { association: 'products'}})

        
        
        return res.json(buy);
    }
}