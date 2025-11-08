class TurnosController {
    /**
     * @param {TurnosService} service
     */
    constructor(service) {
        this.turnoService = service;
    }

    async getAllTurnos() {
        return await this.turnoService.getAllTurnos();
    }

    async getTurnoById(id) {
        return await this.turnoService.getTurnoById(id);
    }

    /**
     * @param {Turno} turno
     */
    async crearTurno(turno) {
        return await this.turnoService.crearTurno(turno);
    }

    async updateTurno(id, turno) {
        return await this.turnoService.updateTurno(id, turno);
    }

    async deleteTurno(id) {
        return await this.turnoService.deleteTurno(id);
    }
}

module.exports = TurnosController;
