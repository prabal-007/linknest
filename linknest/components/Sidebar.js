"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { signIn, signOut, useSession } from 'next-auth/react';

export const Sidebar = () => {
    const pathname = usePathname();
    const showNavbar = ["/", "/generate"].includes(pathname);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession()

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <>{showNavbar && <nav className="backdrop-blur-sm md:hidden fixed w-full z-20 top-0 start-0 border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <h1 className="text-2xl font-bold font-serif" alt="LinkNest Logo"><span className='font-sans font-extrabold'>Link</span>Nest*</h1>
                </Link>

                <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex border items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-transparent"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <span className="">{isMenuOpen ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}</span>
                    </button>
                </div>


                <div
                    className={`${isMenuOpen ? "block" : "hidden"
                        } z-10 w-full md:flex gap-10 items-center bg-white p-2 font-semibold md:static md:w-auto rounded-lg animation-tilt-in-fwd-tr`}
                    id="navbar-sticky"
                >
                    {session && <div className='p-4 flex justify-start gap-4 items-center'>
                        <Link href=''><img src={session?.user?.image} alt={session?.user?.name} className='w-8 h-8 rounded-full' /></Link>
                        <p>{session?.user?.name}</p>
                    </div>}
                    <Link href="/generate" className="hover:text-blue-600 block md:inline border p-2">
                        Create
                    </Link>
                    <Link href="/generate" className="hover:text-blue-600 block md:inline border p-2">
                        Discover
                    </Link>
                    <Link href="/" className="hover:text-blue-600 block md:inline border p-2">
                        Pricing
                    </Link>
                    <Link href="https://imstark.xyz/" className="hover:text-blue-600 block md:inline border p-2">
                        About
                    </Link>
                    {!session && <button onClick={() => signIn()} className='login hover:text-blue-600 block md:inline border p-2'>Sign in</button>}
                    {session && <button onClick={() => signOut()} className='login hover:text-blue-600 block md:inline border p-2'>Sign Out</button>}
                </div>
            </div>
        </nav>}</>
    )
}