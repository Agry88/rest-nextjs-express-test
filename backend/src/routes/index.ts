import { Express, Router } from 'express';
import { Ctx } from './../types/context';
import categoryRouter from "./category";
import userRouter from "./user";
import postRouter from "./post";

export default (ctx: Ctx, app: Express) => {
    const router = Router()

    // Map Routes
    router.use('/category', categoryRouter(ctx, app)
        // #swagger.tags = ['category']
    )
    router.use('/user', userRouter(ctx, app)
        // #swagger.tags = ['user']
    )
    router.use('/post', postRouter(ctx, app)
        // #swagger.tags = ['post']
    )

    return router

} 