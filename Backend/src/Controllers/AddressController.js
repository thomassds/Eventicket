const Address  = require('../models/Address');
const Event  = require('../models/Event');

module.exports= {
    async index(req, res){
        const { address_id } = req.params;

        const address = await Address.findByPk(address_id, { include: { association: 'events'}});
        
        return res.json(address);
    }
}