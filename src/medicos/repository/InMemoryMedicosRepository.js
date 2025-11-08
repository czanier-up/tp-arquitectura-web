const Medico = require('../models/Medico');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

/**
 * @implements {MedicosRepository}
 */
class InMemoryMedicosRepository {
    constructor() {
        this.dbPath = path.join(__dirname, '../data/db.json');
        this.loadFromFile();
    }

    loadFromFile() {
        try {
            if (fsSync.existsSync(this.dbPath)) {
                const data = JSON.parse(fsSync.readFileSync(this.dbPath, 'utf8'));
                this.medicos = data.medicos.map(m =>
                    new Medico(m.id, m.matricula, m.nombre, m.email, m.especialidad)
                );
                this.nextId = data.nextId;
            } else {
                this.medicos = [];
                this.nextId = 1;
            }
        } catch (error) {
            console.error('Error cargando Medicos desde disco:', error);
            this.medicos = [];
            this.nextId = 1;
        }
    }

    async saveToFile() {
        try {
            const data = {
                medicos: this.medicos,
                nextId: this.nextId
            };
            await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            console.error('Error guardando Medicos a disco:', error);
        }
    }

    async getAll() {
        return [...this.medicos];
    }

    async getById(id) {
        return this.medicos.find(medico => medico.id === parseInt(id));
    }

    async getByMatricula(matricula) {
        return this.medicos.find(medico => medico.matricula === parseInt(matricula));
    }

    /**
     * @param {Medico} medico
     */
    async create(medico) {
        const newMedico = new Medico(this.nextId++, medico.matricula, medico.nombre, medico.email, medico.especialidad);
        this.medicos.push(newMedico);
        await this.saveToFile();
        return newMedico;
    }

    /**
     * @param {string} id
     * @param {Medico} medicoData
     */
    async update(id, medicoData) {
        const index = this.medicos.findIndex(medico => medico.id === parseInt(id));
        if (index === -1) {
            return null;
        }

        const updatedMedico = new Medico(
            parseInt(id),
            medicoData.matricula || this.medicos[index].matricula,
            medicoData.nombre || this.medicos[index].nombre,
            medicoData.email || this.medicos[index].email,
            medicoData.especialidad || this.medicos[index].especialidad
        );

        this.medicos[index] = updatedMedico;
        await this.saveToFile();
        return updatedMedico;
    }

    async delete(id) {
        const index = this.medicos.findIndex(medico => medico.id === parseInt(id));
        if (index === -1) {
            return false;
        }

        this.medicos.splice(index, 1);
        await this.saveToFile();
        return true;
    }
}

module.exports = InMemoryMedicosRepository;

