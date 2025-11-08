# Sistema de Turnos para Consultorio Médico

Este proyecto es un sistema de gestión de turnos para un consultorio médico. Permite a los pacientes reservar, modificar y cancelar turnos, así como a los médicos gestionar su agenda.

### Funcionalidades

- CRUD turnos, pacientes y médicos.
- Listar turnos por medico

### API

Mirar documentación de Swagger  http://localhost:8080/api-docs

Principales rutas:

```
GET    /api/medicos             - Lista todos los médicos
GET    /api/medicos/:id         - Obtiene un médico por ID
POST   /api/medicos             - Crea un nuevo médico
PUT    /api/medicos/:id         - Actualiza un médico existente
DELETE /api/medicos/:id         - Elimina un médico
GET    /api/medicos/:id/turnos  - Lista los turnos de un médico

GET    /api/pacientes         - Lista todos los pacientes
GET    /api/pacientes/:id     - Obtiene un paciente por ID
POST   /api/pacientes         - Crea un nuevo paciente
PUT    /api/pacientes/:id     - Actualiza un paciente existente
DELETE /api/pacientes/:id     - Elimina un paciente

GET    /api/turnos            - Lista todos los turnos
GET    /api/turnos/:id        - Obtiene un turno por ID
POST   /api/turnos            - Crea un nuevo turno
PUT    /api/turnos/:id        - Actualiza un turno existente
DELETE /api/turnos/:id        - Elimina un turno
```

### Tecnologías Utilizadas

- Node.js
- Express
- Swagger

### Requisitos

- npm v11+

### Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo con recarga automática
npm run dev

# Ejecutar en modo producción
npm start
```

### DB

Existe un archivo de base de datos en la carpeta db para turnos, pacientes y médicos.

### Test

Se adjunta un export de Postman con los test de cada endpoint. Tener en cuenta que algunos test deben ejecutarse en orden y también pueden fallar si se ejecutan mas de una vez, por las
validaciones del server

### Notas

Se utilizaron conceptos vistos en otras materias (Laboratorio I) de la carrera para separar responsabilidades.

El servidor se ejecutará en http://localhost:8080
