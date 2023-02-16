import { prisma } from "@/lib/prisma";
import { Student } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: Student | null;
    error: string | null;
  }>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }
  const body = JSON.parse(req.body);
  try {
    const student = await prisma.student.create({
      data: {
        fullname: body.fullname,
        email: body.email,
        code: body.code,
        branch: body.branch,
        certificate: {
          create: {
            level: body.level,
            grammar: body.grammar,
            vocabulary: body.vocabulary,
            reading: body.reading,
            listening: body.listening,
          },
        },
      },
    });
    if (student) {
      res.status(200).json({
        data: student,
        error: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: null, error: "Internal Server Error" });
  }
  console.log(body);
};
export default handler;
