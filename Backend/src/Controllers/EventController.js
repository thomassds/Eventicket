const Event  = require('../models/Event');
const User = require('../models/User');
const Address = require('../models/Address');
const { update } = require('../models/User');
module.exports= {
    async store(req, res){
        const { user_id } = req.params;
        const {  event:{name,description, date, start_time, finish_time, amount, amount_sales}, zip_code, state, city, neighborhood,  street, complement, number} = req.body;

        const user = await User.findByPk(user_id);
        if(!user | user.type ==0){
            return res.status(400).json({ error: 'User not found'});
        }

        console.log(zip_code)
        const [address] = await Address.findOrCreate({
            where:{
                zip_code, state, city, neighborhood,  street, complement, number
            }
        });

        const eventData = { name,description, date, start_time, finish_time, amount, amount_sales, user_id, address_id : address.id}
        
        const event = await Event.create(eventData)

        return res.json(event);

    },

    async index(req, res){
        const { user_id } = req.params;
        
        const user = await User.findByPk(user_id, {
            include: { association: 'events'}
        });

        return res.json(user);
    },

    async indexAll(req, res){        
        const event = await Event.findAll({include: { association: 'address'}});

        return res.json(event);
    }
    
}