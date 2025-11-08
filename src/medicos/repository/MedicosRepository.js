/**
 * @interface
 */
class MedicosRepository {
    async getAll() {}
    async getById(id) {}
    async getByMatricula(matricula) {}
    async create(medico) {}
    async update(id, medicoData) {}
    async delete(id) {}
}
