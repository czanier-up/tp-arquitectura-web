const InMemoryMedicosRepository = require('../medicos/repository/InMemoryMedicosRepository');
const InMemoryPacientesRepository = require('../pacientes/repository/InMemoryPacientesRepository');
const InMemoryTurnosRepository = require('../turnos/repositories/InMemoryTurnosRepository');

const MedicosService = require('../medicos/services/MedicosService');
const PacientesService = require('../pacientes/services/PacientesService');
const TurnosService = require('../turnos/services/TurnosService');

const MedicosController = require('../medicos/controllers/index');
const PacientesController = require('../pacientes/controllers/index');
const TurnosController = require('../turnos/controllers/index');

const medicosRepository = new InMemoryMedicosRepository();
const pacientesRepository = new InMemoryPacientesRepository();
const turnosRepository = new InMemoryTurnosRepository();


const medicosService = new MedicosService(medicosRepository);
const pacientesService = new PacientesService(pacientesRepository);
const turnosService = new TurnosService(turnosRepository);


const medicosController = new MedicosController(medicosService, turnosService, pacientesService);
const pacientesController = new PacientesController(pacientesService);
const turnosController = new TurnosController(turnosService);

module.exports = {
    medicosController,
    pacientesController,
    turnosController
};

