import { z } from 'zod';
import {prisma} from "@/lib/prisma"
import { procedure, router } from '../trpc';

export const appRouter = router({
  getStudents: procedure
    .query(async () => {
        try {
            const students = await prisma.student.findMany({
                select: {
                    id: true,
                    fullname: true,
                    branch: true,
                    code: true,
                    email: true,
                    certificate: {
                        select: {
                            id: true,
                            level: true,
                            grammar: true,
                            reading: true,
                            vocabulary: true,
                            listening: true,
                            studentId: true,
                            url: true,            
                        }
                    }

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
        const student = await prisma.student.findFirst({
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
    }),
    saveStudent: procedure.input(z.object({
        fullname: z.string(),
        code: z.string(),
        branch: z.string(),
        email: z.string(),
        level: z.string(),
        grammar: z.string(),
        vocabulary: z.string(),
        reading: z.string(),
        listening: z.string()
        
    })).mutation(async ({input}) => {
            const saveStudentInstance = await prisma.student.create({
                data: {
                    fullname: input.fullname,
                    code: input.code,
                    branch: input.branch,
                    email: input.email,
                   certificate: {
                    create: {
                        level: input.level,
                        grammar: input.grammar,
                        vocabulary: input.vocabulary,
                        reading: input.reading,
                        listening: input.listening
                    }
                   } 
                }
            })
            if(saveStudentInstance){
                 return {
                status: 200,
                student: saveStudentInstance
            }
                
            }
           return {
                    status: 405,
                student: null
                }
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;