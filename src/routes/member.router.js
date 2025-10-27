import express from 'express'
import MemberController from '../controllers/member.controller.js'

const memberRouter = express.Router()

memberRouter.get(
    '/confirm/:invitation_token', 
    MemberController.confirmInvitation
)

export default memberRouter