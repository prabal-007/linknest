import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <nav className='bg-white w-[80vw] right-[10vw] flex justify-between top-8 rounded-full p-6 py-4 items-center fixed'>
      <div className='flex gap-10'>
        <Link href='/'>
        <h1 className='text-xl font-bold font-mono'>LinkNest*</h1>
        </Link>
        <ul className='flex gap-6 text-sm'>
          <li>Templates</li>
          <li>Martekplace</li>
          <Link href='/generate'>
          <li>Discover</li>
          </Link>
          <li>Pricing</li>
          <li>Learn</li>
        </ul>
      </div>
      <div className='flex gap-4 items-center'>
        <button className='login bg-gray-200 px-4 py-2 rounded-lg'>Log in</button>
        <button className='signup bg-black text-white px-4 py-2 rounded-full'>Sign up free</button>
      </div>
    </nav>
  )
}
