class MedicosController {
    /**
     * @param {MedicosService} medicoService
     * @param {TurnosService} turnosService
     * @param {PacientesService} pacienteService
     */
    constructor(medicoService, turnosService, pacienteService) {
        this.medicoService = medicoService;
        this.turnosService = turnosService;
        this.pacienteService = pacienteService;
    }

    async getAllMedicos() {
        return await this.medicoService.getAllMedicos();
    }

    async getMedicoById(id) {
        return await this.medicoService.getMedicoById(id);
    }

    async getMedicoByMatricula(matricula) {
        return await this.medicoService.getMedicoByMatricula(matricula);
    }

    async getTurnosByMedico(medico) {
        let turnos = await this.turnosService.getAllTurnosByMedico(medico);
        let response = [];
    
        for (const turno of turnos) {
            let paciente = await this.pacienteService.getPacienteById(turno.paciente);
            response.push({
                medico: medico,
                paciente: paciente,
                fecha: turno.fecha,
                hora: turno.hora,
                estado: turno.estado
            });
        }
        
        return response;
    }

    /**
     * @param {Medico} medico
     */
    async createMedico(medico) {
        return await this.medicoService.createMedico(medico);
    }

    async updateMedico(id, medico) {
        return await this.medicoService.updateMedico(id, medico);
    }

    async deleteMedico(id) {
        return await this.medicoService.deleteMedico(id);
    }
}

module.exports = MedicosController;

