import DashCards from '@/components/ui/DashCards'
import { Wip } from '@/components/wip'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (<>
    <div className='md:grid md:grid-cols-4 flex flex-col justify-center items-center gap-4 md:p-5'>
      <Link href={"/create"}>
        <DashCards title={"ViewMee.live"} bg={"bg-gradient-to-r from-rose-300 to-rose-500"} />
      </Link>
      <Link href={"/resume-builder"}>
        <DashCards title={"Resume Builder"} bg={"bg-gradient-to-r from-green-300 to-sky-500"} />
        {/* <DashCards title={"Resume Builder"} bg={"bg-gray-200"} /> */}
      </Link>
      <Link href={"/website-builder"}>
        {/* <DashCards title={"Website Builder"} bg={"bg-gradient-to-r from-red-200 to-amber-400"} /> */}
        <DashCards title={"Website Builder"} bg={"bg-gray-200"} />
      </Link>
      <Link href={"/website-builder"}>
        {/* <DashCards title={"Portfolio Builder"} bg={"bg-gradient-to-r from-emerald-100 to-blue-400"} /> */}
        <DashCards title={"Portfolio Builder"} bg={"bg-gray-200"} />
      </Link>
      <Link href={"/chat"}>
        <DashCards title={"Stark AI"} bg={"bg-gradient-to-r from-violet-400 to-purple-300"} />
        {/* <DashCards title={"Stark AI"} bg={"bg-gray-200"} /> */}
      </Link>
    </div>
  </>
  )
}

export default page