import { trpc } from '@/utils/trpc';

export default function Students() {
  const students = trpc.getStudents.useQuery(undefined, {
    refetchOnWindowFocus: false
  });
  if (!students.data) {
    return <div>Loading...</div>;
  }
  console.log(students.data)
  return (
    <div>
      {students.data.map((student, key) => (
        <ul key={key} className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
   <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4">
         
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               Neil Sims
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               email@flowbite.com
            </p>
         </div>
         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $320
         </div>
      </div>
   </li>
   
</ul>
      ))}
    </div>
  );
}