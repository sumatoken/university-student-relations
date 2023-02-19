import Link from "next/link"

interface Props {
    totalStudents: number | undefined
    averageScore: string | undefined
}
export function Stats({ totalStudents, averageScore }: Props) {
    return (
        <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
            <div className="sm:flex sm:space-x-4">
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-white p-5">
                        <div className="sm:flex sm:items-start">
                            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                <h3 className="text-sm leading-6 font-medium text-gray-400">Nombre des Étudiants:</h3>
                                <p className="text-3xl font-bold text-black">{totalStudents}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-white p-5">
                        <div className="sm:flex sm:items-start">
                            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                                <h3 className="text-sm leading-6 font-medium text-gray-400">Score Moyen:</h3>
                                <p className="text-3xl font-bold text-black">A2</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-white p-5">
                        <h3 className="text-sm leading-6 font-medium text-gray-400">Voir:</h3>
                        <div className="sm:flex sm:items-start">
                            <div className="grid grid-cols-3 gap-2" >
                                <Link href="#SMP" className="font-bold cursor-pointer underline text-blue-400">SMP</Link>
                                <Link href="#SMC" className="font-bold cursor-pointer underline text-blue-400">SMC</Link>
                                <Link href="#SMA" className=" font-bold cursor-pointer underline  text-blue-400">SMA</Link>
                                <Link href="#SMI" className=" font-bold cursor-pointer underline  text-blue-400">SMI</Link>
                                <Link href="#SVI" className=" font-bold cursor-pointer underline  text-blue-400">SVI</Link>
                                <Link href="#STU" className=" font-bold cursor-pointer underline  text-blue-400">STU</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}