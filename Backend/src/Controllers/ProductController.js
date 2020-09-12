const Product  = require('../models/Product');
const Event = require('../models/Event');
const Buy = require('../models/Buy');


module.exports= {
    async store(req, res){
        const { event_id } = req.params;
        const { description, amount, amount_sales, value} = req.body;

        const event = await Event.findByPk(event_id)
        if( !event ) {
            return res.status(400).json({ error: 'Event not found'});
        }

        const product = await Product.findOrCreate({
            where:{ event_id, description, amount, amount_sales, value }
        })

        return res.json(product)
    },

    async index(req, res){
        const { event_id } = req.params;

        const event = await Event.findByPk(event_id, {include: { association: 'hasProducts'}});
    
        return res.json(event);
    },
}