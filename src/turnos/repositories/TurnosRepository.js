/**
 * @interface
 */
class TurnosRepository {
    async getAll() {}
    async getAllTurnosByMedicoId(medicoId) {}
    async getById(id) {}
    async create(turno) {}
    async update(id, turnoData) {}
    async delete(id) {}
}
