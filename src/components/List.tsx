import { StudentsWithCertifacate } from "@/lib/types"
import { Certificate, Student } from "@prisma/client"


interface Props {
    students: StudentsWithCertifacate[] | undefined
    branch: string | undefined
}

export function List({ students, branch }: Props) {
    return (
        <div className="max-w-xl mx-auto" id={branch}>

            <div className="py-2 max-w-md w-[300px] bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-center items-center mb-4">
                    <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Étudiants {branch} (totale: {students?.length})</h3>

                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {students?.map((student, key) => (
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center justify-around space-x-4">
                                    <div className="flex-shrink-0">
                                        <h2 className="md:mb-4 mb-1 p-4 text-xl text-center font-extrabold leading-none tracking-tigh md:text-base lg:text-base dark:text-white">
                                            <span className="" style={{ color: 'rgb(37 99 150)' }}>
                                                {student.certificate?.level}
                                            </span>
                                        </h2>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {student.fullname}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {student.code}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {student.email}
                                        </p>
                                    </div>

                                </div>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>)
}