class PacientesController {
    /**
     * @param {PacientesService} service
     */
    constructor(service) {
        this.pacienteService = service;
    }

    async getAllPacientes() {
        return await this.pacienteService.getAllPacientes();
    }

    async getPacienteById(id) {
        return await this.pacienteService.getPacienteById(id);
    }

    /**
     * @param {Paciente} paciente
     */
    async createPaciente(paciente) {
        return await this.pacienteService.createPaciente(paciente);
    }

    async updatePaciente(id, paciente) {
        return await this.pacienteService.updatePaciente(id, paciente);
    }

    async deletePaciente(id) {
        return await this.pacienteService.deletePaciente(id);
    }
}

module.exports = PacientesController;

