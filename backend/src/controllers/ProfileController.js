const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const discipline_id = request.headers.authorization;

        const students = await connection('students')
            .where('discipline_id', discipline_id)
            .select('*');
        
        return response.json(students);
    }
}