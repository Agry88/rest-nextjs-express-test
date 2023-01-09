import { Ctx } from '../types/context';
import { Router as expressRouter, Express } from "express";


export default (ctx: Ctx, app: Express) => {

    const router = expressRouter()
    const { prisma } = ctx

    router.post(`/user`, async (req, res) => {
        const { email } = req.body
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (user) {
            return res.status(400).json({ message: 'user already exists' })
        }

        const result = await prisma.user.create({
            data: {
                ...req.body,
            },
        })
        res.json(result)
    })

    router.get(`/user`, async (req, res) => {
        const result = await prisma.user.findMany()
        return res.status(200).json(result)
    })

    router.get('/user/:id', async (req, res) => {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        })
        res.json(user)
    })

    return router
}