import DashCards from '@/components/ui/DashCards'
import { Wip } from '@/components/wip'
import React from 'react'

const page = () => {
  return (<div className='grid grid-cols-4 gap-4 p-5'>
  <DashCards title={"ViewMee.live"} bg={"bg-gradient-to-r from-rose-300 to-rose-500"}/>
  <DashCards title={"Resume Builder"} bg={"bg-gradient-to-r from-green-300 to-sky-500"}/>
  <DashCards title={"Website Builder"} bg={"bg-gradient-to-r from-red-200 to-amber-400"}/>
  <DashCards title={"Portfolio Builder"} bg={"bg-gradient-to-r from-emerald-100 to-blue-400"}/>
  <DashCards title={"Stark AI"} bg={"bg-gradient-to-r from-violet-400 to-purple-300"}/>
  </div>
  )
}

export default page