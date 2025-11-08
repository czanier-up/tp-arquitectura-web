/**
 * @swagger
 * components:
 *   schemas:
 *     Turno:
 *       type: object
 *       properties:
 *         medico:
 *           type: integer
 *           format: int64
 *           description: Id del Médico
 *         paciente:
 *           type: integer
 *           format: int64
 *           description: Id del Paciente
 *         horario:
 *           type: string
 *           format: time
 *           description: Hora del Turno
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del Turno
 *         estado:
 *          type: string
 *          enum: [Pendiente, Atendido]
 *          description: Estado del Turno
 *       required:
 *         - medico
 *         - paciente
 *         - horario
 *         - fecha
 */
class Turno {
    constructor(id, medico, paciente, fecha, hora, estado = 'Pendiente') {
        this.id = id;
        this.medico = medico;
        this.paciente = paciente;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
    }
}

module.exports = Turno;