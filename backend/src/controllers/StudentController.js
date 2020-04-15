const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('students').count();

        const students = await connection('students')
            .join('disciplines', 'disciplines.id', '=' ,'students.discipline_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'students.*', 
                'disciplines.name', 
                'disciplines.workload', 
                'disciplines.credit'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(students);
    },

    async create(request, response) {
        const { name, cpf, registration } = request.body;
        const discipline_id = request.headers.authorization;

        const [id] = await connection('students').insert({
            name,
            cpf,
            registration,
            discipline_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const discipline_id = request.headers.authorization;

        const student = await connection('students')
            .where('id', id)
            .select('discipline_id')
            .first();
        if (student.discipline_id != discipline_id) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('students').where('id', id).delete();

        return response.status(204).send();
    }
};