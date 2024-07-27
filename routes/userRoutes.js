import {getAllUsers, getUserByUsername, createUser, deleteUser} from '../controllers/userController.js'
import {Router} from 'express'

const router = Router()

router.get('/', getAllUsers)

router.get('/:username', getUserByUsername)

router.post('/newUser', createUser)

router.delete('/:username', deleteUser)

export default router