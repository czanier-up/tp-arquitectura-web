/**
 * @swagger
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       properties:
 *         dni:
 *           type: integer
 *           format: int64
 *           description: DNI
 *         nombre:
 *           type: string
 *           description: Nombre del Paciente
 *         apellido:
 *           type: string
 *           description: Apellido del Paciente
 *         email:
 *           type: string
 *           format: email
 *           description: Email del Paciente
 *       required:
 *         - dni
 *         - nombre
 */
class Paciente {
    constructor(id, dni, nombre, apellido, email) {
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }
}

module.exports = Paciente;