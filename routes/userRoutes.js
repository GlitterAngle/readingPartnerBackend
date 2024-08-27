import {getAllUsers, getUserByUsername, createUser, deleteUser, editUser} from '../controllers/userController.js'
import {Router} from 'express'

const router = Router()

router.get('/', getAllUsers)

router.get('/:username', getUserByUsername)

router.post('/newUser', createUser)

router.put('/:username', editUser)

router.delete('/:id', deleteUser)

export default router