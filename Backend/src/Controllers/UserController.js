const User  = require('../models/User');

module.exports= {
    async store(req, res){
        const { name, email, password, phone, type} = req.body;

        const user = await User.create({ name, email, password, phone, type });

        return res.json(user);
    },

    async index(req, res){
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);
        
        return res.json(user);
    },

    async email(req, res){
        const { email } = req.params;

        const user = await User.findAll({where: {email}});
        
        return res.json(user);
    }
}