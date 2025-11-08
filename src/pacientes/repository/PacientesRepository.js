/**
 * @interface
 */
class PacientesRepository {
    async getAll() {}
    async getById(id) {}
    async getByDni(dni) {}
    async create(paciente) {}
    async update(id, paciente) {}
    async delete(id) {}
}