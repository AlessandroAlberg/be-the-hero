const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const disciplines = await connection('disciplines').select('*');
    
        return response.json(disciplines);
    },

    async create(request, response) {
        const {id, name, workload, credit} = request.body;

        await connection('disciplines').insert({
            id,
            name,
            workload,
            credit
        })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        const discipline = await connection('disciplines')
            .where('id', id);
        if (discipline.id != id) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('disciplines').where('id', id).delete();

        return response.status(204).send();
    }
};