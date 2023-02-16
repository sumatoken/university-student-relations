import { z } from 'zod';
import {prisma} from "@/lib/prisma"
import { procedure, router } from '../trpc';

export const appRouter = router({
  getStudents: procedure
    .query(async () => {
        try {
            const students = await prisma.student.findMany({
                select: {
                    fullname: true,
                    branch: true,
                    code: true,
                }
            })
         
            return students;
        } catch (error) {
            console.log(error)
        }
   
    }),
    getStudent: procedure.input(z.object({
        code: z.string()
    })).mutation(async({input})=>{
       try {
        const student = await prisma.student.findUnique({
            where: {
                code: input.code
            },
            select:{
                fullname: true
            }
        })
        if(!student){
            return {
                status: 404,
                student: null
            }

        }
        return {status: 200, student: student}
       } catch (error) {
        console.log(error)
        return {status: '404'}
       }
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;