"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = ["/", "/generate"].includes(pathname);

  return (
    <>{showNavbar && <nav className='bg-white hidden w-[80vw] right-[10vw] md:flex justify-between top-8 rounded-full p-6 py-4 items-center fixed'>
      <div className='flex gap-10'>
        <Link href='/'>
          <h1 className='text-xl font-bold font-mono'>LinkNest*</h1>
        </Link>
        <ul className='flex gap-2 text-sm'>
          {/* <li>Templates</li> */}
          <Link href='/generate' className='hover:bg-gray-100 px-3 py-1 rounded-lg'>
            <li>Create</li>
          </Link>
          <Link href='/generate' className='hover:bg-gray-100 px-3 py-1 rounded-lg'>
            <li>Discover</li>
          </Link>
          <Link href='/' className='hover:bg-gray-100 px-3 py-1 rounded-lg'>
            <li>Pricing</li>
          </Link>
          <Link href='https://imstark.xyz/' target='__blank' className='hover:bg-gray-100 px-3 py-1 rounded-lg'>
            <li>About</li>
          </Link>
        </ul>
      </div>
      <div className='flex gap-4 items-center'>
        <button className='login bg-gray-200 px-4 py-2 rounded-lg'>Log in</button>
        <button className='signup bg-black text-white px-4 py-2 rounded-full'>Sign up free</button>
      </div>
    </nav>}
    </>
  )
}
