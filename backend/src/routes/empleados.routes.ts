import express from 'express';
import { EmpleadoController } from '../controllers/empleados.controllers.js';
import { MongoEmployeeRepository } from '../repositories/mongo-employee.respository.js';
import { createEmployeeSchema, employeeParamsSchema, updateEmployeeSchema } from '../dtos/employee.dto.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();
const empleado = new EmpleadoController(new MongoEmployeeRepository());

router.get('/empleados', empleado.getAllEmpleados.bind(empleado));
router.get('/empleados/:id', validate({ params: employeeParamsSchema }), empleado.getEmpleado.bind(empleado));
router.post('/empleados', validate({ body: createEmployeeSchema }), empleado.addEmpleado.bind(empleado));
router.put('/empleados/:id', validate({ params: employeeParamsSchema, body: updateEmployeeSchema }), empleado.updateEmpleado.bind(empleado));
router.delete('/empleados/:id', validate({ params: employeeParamsSchema }), empleado.deleteEmpleado.bind(empleado));

export default router;