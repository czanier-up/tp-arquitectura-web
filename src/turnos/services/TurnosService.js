class TurnosService {
    /**
     * @param {TurnosRepository} repository
     */
    constructor(repository) {
        this.repository = repository;
    }

    async getAllTurnos() {
        return await this.repository.getAll();
    }

    async getAllTurnosByMedico(medico) {
        return await this.repository.getAllTurnosByMedicoId(medico.id);
    }

    async getTurnoById(id) {
        return await this.repository.getById(id);
    }

    async crearTurno(turno) {
        if (!turno.medico) {
            throw new Error('Medico es requerido');
        }
        if (!turno.paciente) {
            throw new Error('Paciente es requerido');
        }
        if (!turno.fechaHora) {
            throw new Error('FechaHora es requerida');
        }

        let fecha = new Date(turno.fechaHora);
        turno.fecha = fecha.toISOString().split('T')[0];
        turno.hora = fecha.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        return await this.repository.create(turno);
    }

    async updateTurno(id, turno) {
        const existingTurno = await this.repository.getById(id);
        if (!existingTurno) {
            return null;
        }

        return await this.repository.update(id, turno);
    }

    async deleteTurno(id) {
        const existingTurno = await this.repository.getById(id);
        if (!existingTurno) {
            return false;
        }

        return await this.repository.delete(id);
    }
}

module.exports = TurnosService;
