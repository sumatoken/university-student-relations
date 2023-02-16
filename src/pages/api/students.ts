import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "@/lib/prisma";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

     if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }
  try {
      const students = await prisma.student.findMany()
        if(students){
            res.status(200).json({
                data: students,
                error: null
            })
        }
  } catch (error) {
    console.log(error)
     res.status(200).json({
                data: null,
                error: 'failed to fetch'
            })
  }
}
