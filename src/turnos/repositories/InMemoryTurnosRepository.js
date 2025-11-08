const Turno = require('../models/Turno');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

/**
 * @implements {TurnosRepository}
 */
class InMemoryTurnosRepository {
    constructor() {
        this.dbPath = path.join(__dirname, '../data/db.json');
        this.loadFromFile();
    }

    loadFromFile() {
        try {
            if (fsSync.existsSync(this.dbPath)) {
                const data = JSON.parse(fsSync.readFileSync(this.dbPath, 'utf8'));
                this.turnos = data.turnos.map(t => 
                    new Turno(t.id, t.medico, t.paciente, t.fecha, t.hora, t.estado)
                );
                this.nextId = data.nextId;
            } else {
                this.turnos = [];
                this.nextId = 1;
            }
        } catch (error) {
            console.error('Error cargando turnos desde disco:', error);
            this.turnos = [];
            this.nextId = 1;
        }
    }

    async saveToFile() {
        try {
            const data = {
                turnos: this.turnos,
                nextId: this.nextId
            };
            await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            console.error('Error guardando turnos a disco:', error);
        }
    }

    async getAll() {
        return [...this.turnos];
    }

    async getById(id) {
        return this.turnos.find(turno => turno.id === parseInt(id));
    }

    async getAllTurnosByMedicoId(medicoId) {
        return this.turnos.filter(turno => turno.medico === parseInt(medicoId));
    }

    async create(turno) {
        const newTurno = new Turno(
            this.nextId++,
            turno.medico,
            turno.paciente,
            turno.fecha,
            turno.hora,
            turno.estado || 'Pendiente'
        );
        this.turnos.push(newTurno);
        await this.saveToFile();
        return newTurno;
    }

    async update(id, turnoData) {
        const index = this.turnos.findIndex(turno => turno.id === parseInt(id));
        if (index === -1) {
            return null;
        }

        const updatedTurno = new Turno(
            parseInt(id),
            turnoData.medico || this.turnos[index].medico,
            turnoData.paciente || this.turnos[index].paciente,
            turnoData.fecha || this.turnos[index].fecha,
            turnoData.hora || this.turnos[index].hora,
            turnoData.estado || this.turnos[index].estado
        );

        this.turnos[index] = updatedTurno;
        await this.saveToFile();
        return updatedTurno;
    }

    async delete(id) {
        const index = this.turnos.findIndex(turno => turno.id === parseInt(id));
        if (index === -1) {
            return false;
        }

        this.turnos.splice(index, 1);
        await this.saveToFile();
        return true;
    }
}

module.exports = InMemoryTurnosRepository;
