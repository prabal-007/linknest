"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { AvatarComponent } from './ui/AvatarComponent'

export const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = ["/"].includes(pathname);
  const { data: session } = useSession();

  return (
    <>{showNavbar && <nav className='bg-white hidden w-[80vw] h-[10%] right-[10vw] md:flex justify-between top-8 rounded-full p-6 py-4 items-center fixed'>
      <div className='flex gap-10 justify-center items-center font-semibold'>
        <Link href='/' className=''>
          <img src="/logo-rbg.png" alt="viewMee" className='w-32' />
        </Link>
        <ul className='flex gap-2 text-sm'>
          <Link href='/create' className='hover:bg-gray-100 px-3 py-1 rounded-lg'>
            <li>Create</li>
          </Link>
          <Link href='/create' className='hover:bg-gray-100 px-3 py-1 rounded-lg'>
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
        {session && <div className='flex justify-center items-center gap-2'>
          <Link href='/dashboard' className='login bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-400'>Dashboard</Link>
          <AvatarComponent />
        </div>}
        {/* {session && <Link href=''><img src={session?.user?.image} alt={session?.user?.name} className='w-8 h-8 rounded-full' /></Link>} */}

      </div>
    </nav>}
    </>
  )
}
