"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export const Footer = () => {
  const pathname = usePathname();
  const showFooter = ['/', 'generate'].includes(pathname);
  return (
    <>{showFooter && <div> <div className='p-1 shadow-md md:p-4 py-1 flex justify-around items-center w-full bg-slate-100 rounded-md'>
        <img src="/logo-rbg.png" alt="viewMee" className='hidden md:block w-32'/>
        <div className='flex gap-8'>
            <ul className='flex justify-between items-center gap-4'>
                <li><Link href="mailto:gprabal000@gmail.com" className='hover:text-blue-600'>Contact Us</Link></li>
                <li><Link href="/TermsOfService" className='hover:text-blue-600'>Terms of use</Link></li>
                <li><Link href="/PrivacyPolicy" className='hover:text-blue-600'>Privacy Policy</Link></li>
            </ul>
        </div>
    </div>
        <div className='text-center md:text-gray-600 md:bg-slate-100 pb-1 text-white bg-black'>© 2025 viewMee.live</div>
    </div>}
    </>
  )
}
