class PacientesService {
    /**
     * @param {PacientesRepository} repository
     */
    constructor(repository) {
        this.repository = repository;
    }

    async getAllPacientes() {
        return await this.repository.getAll();
    }

    async getPacienteById(id) {
        return await this.repository.getById(id);
    }

    /**
     * @param {Paciente} paciente
     */
    async createPaciente(paciente) {
        if (!paciente.nombre) {
            throw new Error('Nombre es requerido');
        }
        if (!paciente.apellido) {
            throw new Error('Apellido es requerido');
        }
        if (!paciente.dni) {
            throw new Error('DNI es requerido');
        }
        let exist = await this.repository.getByDni(paciente.dni);
        if (exist) {
            throw new Error('Paciente ya existe');
        }
        return await this.repository.create(paciente);
    }

    async updatePaciente(id, paciente) {
        const existingPaciente = await this.repository.getById(id);
        if (!existingPaciente) {
            return null;
        }

        return await this.repository.update(id, paciente);
    }

    async deletePaciente(id) {
        const existingPaciente = await this.repository.getById(id);
        if (!existingPaciente) {
            return false;
        }

        return await this.repository.delete(id);
    }
}

module.exports = PacientesService;

