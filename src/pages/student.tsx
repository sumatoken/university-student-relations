import { trpc } from "@/utils/trpc"
import Link from "next/link"
import { useState } from "react"

export default function Student () {
const [code, setCode] = useState("")
const student = trpc.getStudent.useMutation()
const handleSubmit = async () => {
    if(code.length < 8 || code.length > 8){
        return;
    }
   student.mutate({code})
   if(student.data){
    console.log(student.data)
   }
   return;
}
    return <div className="mt-4 flex flex-col gap-6 items-center justify-center">
         <h1 className="md:mb-4 mb-1 p-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Vérifier votre {" "}
        <span className="text-blue-600 dark:text-blue-500">
          déposition.
        </span>{" "}
      </h1>
        {student.data?.status === 200 ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">Vous étes enregistré</span></div> : student.data?.status=== 404 ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Vous étes pas enregistré</span> 
  <Link href="/" className="ml-4 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
Déposer maintenant
<svg aria-hidden="true" className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
</Link>
</div> : ""}
<form>   
    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">22506318</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="22506318" required 
        onChange={(e) => {
            setCode(e.target.value)
        }}
        />
        <button type="button" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={student.isLoading}
        onClick={handleSubmit}
        >Vérifier</button>
    </div>
</form>

    </div>
}