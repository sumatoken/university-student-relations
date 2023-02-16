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
});

// export type definition of API
export type AppRouter = typeof appRouter;