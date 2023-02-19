export type StudentsWithCertifacate = {
      code: string;
      fullname: string;
      branch: string;
      email: string;
      certificate: {
         level: string;
         grammar: string;
         vocabulary: string;
         reading: string;
         listening: string;
         id: string;
         url: string | null;
         studentId: string;
      } | null;
      id: string;
   } 