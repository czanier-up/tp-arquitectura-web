/**
 * @swagger
 * components:
 *   schemas:
 *     Medico:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         matricula:
 *           type: integer
 *           format: int64
 *           description: Número de Matricula
 *         nombre:
 *           type: string
 *           description: Nombre del Medico
 *         email:
 *           type: string
 *           format: email
 *           description: Email del Medico
 *         especialidad:
 *           type: string
 *           description: Especialidad del Medico
 *       required:
 *         - matricula
 *         - nombre
 *         - especialidad
 */
class Medico {
    constructor(id, matricula, nombre, email, especialidad) {
        this.id = id;
        this.nombre = nombre;
        this.matricula = matricula;
        this.email = email;
        this.especialidad = especialidad;
    }
}

module.exports = Medico;