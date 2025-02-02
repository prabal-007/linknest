"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { IoIosExit } from "react-icons/io";
import { useState } from 'react';

export default function Page() {
    const [loading, setLoading] = useState(false);
    
    const handleSignIn = async () => {
        setLoading(true);
        try {
          await signIn("google", { callbackUrl: "/home" });
        } catch (error) {
          console.error("Error during sign-in:", error);
          alert("Failed to sign in. Please try again.");
        } finally {
          setLoading(false);
        }
      };

    return (
        // <div className="bg-blue-100 flex items-center justify-center h-[100vh] font-sans">
        <div className={`bg-blue-100 px-5 bg-cover grid grid-cols-2 items-center justify-center h-[100vh] font-sans `} style={{ backgroundImage: `url(${"/signin.png"})` }}>
            <div className='md:col-span-1 col-span-2 md:ml-16 text-white backdrop-blur-sm h-1/2 flex justify-center items-center'>
                <div className='w-80 gap-2 p-4 border-2 rounded-lg bg-slate-800 flex flex-col justify-center shadow-2xl'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <h1 className='font-bold text-2xl'>Sign In</h1>
                        <p className='text-gray-100 text-sm text-wrap text-center'>Sign In to access your account</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <form action="" method="post" className='flex flex-col justify-center'>
                            <label htmlFor="" className='font-semibold text-sm px-1 py-2'>Email</label>
                            <input type='email' placeholder='xyz@gmail.com' required className='border text-black border-gray-400 py-1 px-2 text-sm rounded-md' />
                            <label htmlFor="" className='font-semibold text-sm px-1 py-2'>Password</label>
                            <input type='password' placeholder='' required className='border text-black border-gray-400 py-1 px-2 text-sm rounded-md' />
                            <button onClick={() => {alert("Please login with Google!")}} className='border w-fit self-center m-2 border-slate-300 text-black p-1 px-2 text-lg rounded-xl bg-white hover:border-slate-500 active:bg-slate-600'>Sign In</button>
                        </form>
                        <hr />
                        <button className='border border-slate-300 text-black gap-2 flex justify-center items-center p-2 text-xl rounded-3xl bg-slate-100 hover:border-slate-500 active:bg-slate-600' onClick={handleSignIn}><FcGoogle />
                            Login with google</button>
                        <Link href="/" className='flex justify-center items-center hover:underline cursor-pointer'>Back to home <IoIosExit /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
