class MedicosService {
    /**
     * @param {MedicosRepository} repository
     */
    constructor(repository) {
        this.repository = repository;
    }

    async getAllMedicos() {
        return await this.repository.getAll();
    }

    async getMedicoById(id) {
        return await this.repository.getById(id);
    }

    async getMedicoByMatricula(matricula) {
        return await this.repository.getByMatricula(matricula);
    }

    /**
     * @param {Medico} medico
     */
    async createMedico(medico) {
        if (!medico.nombre) {
            throw new Error('Nombre es requerido');
        }
        if (!medico.matricula) {
            throw new Error('Matricula es requerida');
        }
        if (!medico.especialidad) {
            throw new Error('Especialidad es requerida');
        }
        if (!medico.email) {
            throw new Error('Email es requerido');
        }

        let exist = await this.repository.getByMatricula(medico.matricula);
        if (exist) {
            throw new Error('Matricula ya existe');
        }
        return await this.repository.create(medico);
    }

    async updateMedico(id, medico) {
        const existingMedico = await this.repository.getById(id);
        if (!existingMedico) {
            return null;
        }

        return await this.repository.update(id, medico);
    }

    async deleteMedico(id) {
        const existingMedico = await this.repository.getById(id);
        if (!existingMedico) {
            return false;
        }

        return await this.repository.delete(id);
    }
}

module.exports = MedicosService;

