"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'

export const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = ["/", "/generate"].includes(pathname);
  const { data: session } = useSession();
  console.log('here - ', session?.user?.email)
  console.log('here - ', session)

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
        {!session && <button onClick={() => signIn()} className='login bg-gray-200 px-4 py-2 rounded-lg'>Sign in</button>}
        {session && <button onClick={() => signOut({callbackUrl: "/signin"})} className='login bg-gray-200 px-4 py-2 rounded-lg'>Sign Out</button>}
        {session && <Link href=''><img src={session?.user?.image} alt={session?.user?.name} className='w-8 h-8 rounded-full' /></Link>}
        
        {/* <button className='signup bg-black text-white px-4 py-2 rounded-full'>Sign up free</button> */}
      </div>
    </nav>}
    </>
  )
}
