const User  = require('../models/User');

module.exports= {
    async store(req, res){
        const { avatar, name, email, password, phone, type} = req.body;

        const user = await User.create({ avatar, name, email, password, phone, type });

        return res.json(user);
    },

    async index(req, res){
        const { id_user } = req.params;

        const user = await User.findByPk(id_user);
        
        return res.json(user);
    }
}