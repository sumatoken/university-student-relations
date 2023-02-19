import { trpc } from '@/utils/trpc';

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Stats } from '@/components/Stats';
import { List } from '@/components/List';
import { useState } from 'react';
import { Certificate, Student } from '@prisma/client';
import { StudentsWithCertifacate } from '@/lib/types';
export default function Students() {
   const students = trpc.getStudents.useQuery(undefined, {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
         setSMP(data.filter((student) => student.branch === "SMP"))
         setSMC(data.filter((student) => student.branch === "SMC"))
         setSMI(data.filter((student) => student.branch === "SMI"))
         setSMA(data.filter((student) => student.branch === "SMA"))
         setSTU(data.filter((student) => student.branch === "STU"))
         setSVI(data.filter((student) => student.branch === "SVI"))
      }
   });



   const [SMP, setSMP] = useState<StudentsWithCertifacate[]>()
   const [SMC, setSMC] = useState<StudentsWithCertifacate[]>()
   const [SMI, setSMI] = useState<StudentsWithCertifacate[]>()
   const [SMA, setSMA] = useState<StudentsWithCertifacate[]>()
   const [STU, setSTU] = useState<StudentsWithCertifacate[]>()
   const [SVI, setSVI] = useState<StudentsWithCertifacate[]>()





   const navigation = [
      { name: 'Home', href: '/', current: false },

   ]
   /*   const userNavigation = [
       { name: 'Your Profile', href: '#' },
       { name: 'Settings', href: '#' },
       { name: 'Sign out', href: '#' },
     ] */


   function classNames(...classes: String[]) {
      return classes.filter(Boolean).join(' ')
   }
   console.log(SMP)
   return (


      <>

         <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
               {({ open }) => (
                  <>
                     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                           <div className="flex items-center">
                              <div className="flex-shrink-0">
                                 {/*logo image*/}
                              </div>
                              <div className="hidden md:block">
                                 <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                       <a
                                          key={item.name}
                                          href={item.href}
                                          className={classNames(
                                             item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                             'px-3 py-2 rounded-md text-sm font-medium'
                                          )}
                                          aria-current={item.current ? 'page' : undefined}
                                       >
                                          {item.name}
                                       </a>
                                    ))}
                                 </div>
                              </div>
                           </div>
                           <div className="hidden md:block">
                              <div className="ml-4 flex items-center md:ml-6">
                                 <button
                                    type="button"
                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                 >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                 </button>

                                 {/* Profile dropdown */}

                              </div>
                           </div>
                           <div className="-mr-2 flex md:hidden">
                              {/* Mobile menu button */}
                              <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                 <span className="sr-only">Open main menu</span>
                                 {open ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                 ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                 )}
                              </Disclosure.Button>
                           </div>
                        </div>
                     </div>

                     <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                           {navigation.map((item) => (
                              <Disclosure.Button
                                 key={item.name}
                                 as="a"
                                 href={item.href}
                                 className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block px-3 py-2 rounded-md text-base font-medium'
                                 )}
                                 aria-current={item.current ? 'page' : undefined}
                              >
                                 {item.name}
                              </Disclosure.Button>
                           ))}
                        </div>

                     </Disclosure.Panel>
                  </>
               )}
            </Disclosure>

            <header className="bg-white shadow">
               <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
               </div>
            </header>
            <main>
               <div className='flex flex-col'>
                  <Stats totalStudents={students.data?.length} averageScore={"dd"} />
                  <div className="flex flex-row flex-wrap justify-start gap-1">
                     {!students.data ? <>Loading...</> :
                        <>
                           <List students={SMP} branch="SMP" />
                           <List students={SMI} branch="SMI" />
                           <List students={SMA} branch="SMA" />
                           <List students={STU} branch="STU" />
                           <List students={SVI} branch="SVI" />
                           <List students={SMC} branch="SMC" />

                        </>


                     }
                  </div>
               </div>
            </main>
         </div>
      </>
   )
}

