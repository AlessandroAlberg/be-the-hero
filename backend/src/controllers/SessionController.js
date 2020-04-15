const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const discipline = await connection('disciplines')
            .where('id', id)
            .select('name')
            .first();

        if (!discipline) {
            return response.status(400).json({ error: 'No discipline found with this ID' });
        }

        return response.json(discipline);
    }
}