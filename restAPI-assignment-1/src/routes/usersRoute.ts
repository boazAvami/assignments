import { Router } from 'express';
import { UserController } from '../controllers/users_controller';

const router = Router();
const userController = new UserController();

router.post('/', async (req, res) => await userController.createUser(req, res));
router.get('/', async (req, res) => await userController.getAllUsers(req, res));
router.get('/:id', async (req, res) => await userController.getUserById(req, res));
router.put('/:id', async (req, res) => await userController.updateUser(req, res));
router.delete('/:id', async (req, res) => await userController.deleteUser(req, res));

export default router;