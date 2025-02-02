"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export const Footer = () => {
  const pathname = usePathname();
  const showFooter = ['/'].includes(pathname);
  return (
    <>{showFooter && <div className='flex flex-col justify-center z-100 items-center p-2 pb-0'> <div className='p-1 w-[95%] backdrop-blur-md shadow-md md:p-4 py-1 flex justify-around items-center bg-slate-100 rounded-xl border-2 border-white hover:border-2 hover:border-yellow-400 '>
      <Link href={"/"} className='hidden md:block'>
        <img src="/logo-rbg.png" alt="viewMee" className='w-32' />
      </Link>
      <div className='flex gap-8'>
        <ul className='flex justify-between items-center gap-4'>
          <li><Link href="mailto:gprabal000@gmail.com" className='hover:text-blue-600'>Contact Us</Link></li>
          <li><Link href="/TermsOfService" className='hover:text-blue-600'>Terms of use</Link></li>
          <li><Link href="/PrivacyPolicy" className='hover:text-blue-600'>Privacy Policy</Link></li>
        </ul>
      </div>
    </div>
      <div className='text-center md:bg-slate-950 pb-1 text-white bg-slate-950'>© 2025 viewMee.live</div>
    </div>}
    </>
  )
}
