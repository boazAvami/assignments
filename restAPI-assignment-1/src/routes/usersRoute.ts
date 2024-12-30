import { Router } from 'express';
import { UserController } from '../controllers/users_controller';

const router = Router();
const userController = new UserController();

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user account.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request - validation error
 */
router.post('/', async (req, res) => await userController.createUser(req, res));

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized - invalid token
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => await userController.getAllUsers(req, res));

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a user by their unique ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - invalid token
 */
router.get('/:id', async (req, res) => await userController.getUserById(req, res));

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     summary: Update user details
 *     description: Updates a user's details by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: updatedUser
 *               email:
 *                 type: string
 *                 example: updated@email.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request - validation error
 */
router.put('/:id', async (req, res) => await userController.updateUser(req, res));

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Removes a user from the system by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', async (req, res) => await userController.deleteUser(req, res));

export default router;
