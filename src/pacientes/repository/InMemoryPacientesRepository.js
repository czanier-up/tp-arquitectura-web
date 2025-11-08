const Paciente = require('../models/Paciente');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

/**
 * @implements {PacientesRepository}
 */
class InMemoryPacientesRepository {
    constructor() {
        this.dbPath = path.join(__dirname, '../data/db.json');
        this.loadFromFile();
    }

    loadFromFile() {
        try {
            if (fsSync.existsSync(this.dbPath)) {
                const data = JSON.parse(fsSync.readFileSync(this.dbPath, 'utf8'));
                this.pacientes = data.pacientes.map(p =>
                    new Paciente(p.id, p.dni, p.nombre, p.apellido, p.email)
                );
                this.nextId = data.nextId;
            } else {
                this.pacientes = [];
                this.nextId = 1;
            }
        } catch (error) {
            console.error('Error cargando Pacientes desde disco:', error);
            this.pacientes = [];
            this.nextId = 1;
        }
    }

    async saveToFile() {
        try {
            const data = {
                pacientes: this.pacientes,
                nextId: this.nextId
            };
            await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            console.error('Error guardando Pacientes a disco:', error);
        }
    }

    async getAll() {
        return [...this.pacientes];
    }

    async getById(id) {
        return this.pacientes.find(paciente => paciente.id === parseInt(id));
    }

    async getByDni(dni) {
        return this.pacientes.find(paciente => paciente.dni === parseInt(dni));
    }

    async create(paciente) {
        const newPaciente = new Paciente(
            this.nextId++,
            paciente.dni,
            paciente.nombre,
            paciente.apellido,
            paciente.email
        );
        this.pacientes.push(newPaciente);
        await this.saveToFile();
        return newPaciente;
    }

    async update(id, pacienteData) {
        const index = this.pacientes.findIndex(paciente => paciente.id === parseInt(id));
        if (index === -1) {
            return null;
        }

        const updatedPaciente = new Paciente(
            parseInt(id),
            pacienteData.dni || this.pacientes[index].dni,
            pacienteData.nombre || this.pacientes[index].nombre,
            pacienteData.apellido || this.pacientes[index].apellido,
            pacienteData.email || this.pacientes[index].email
        );

        this.pacientes[index] = updatedPaciente;
        await this.saveToFile();
        return updatedPaciente;
    }

    async delete(id) {
        const index = this.pacientes.findIndex(paciente => paciente.id === parseInt(id));
        if (index === -1) {
            return false;
        }

        this.pacientes.splice(index, 1);
        await this.saveToFile();
        return true;
    }
}

module.exports = InMemoryPacientesRepository;

