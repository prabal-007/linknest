import React from 'react';
import { useEffect, useState } from "react";
import Image from "next/image";
import showcaseImage from "../public/showcase-image.png";
import { signIn } from 'next-auth/react';

const ViewMeeLanding = () => {
    return (<>
        <View2 />
        <View1 />
    </>
    )
};

const View2 = () => {
    return (
        <div className="min-h-screen rounded-full flex flex-col items-center justify-center p-6 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] ]">
            <div className='flex md:flex-col flex-row justify-center items-center w-full'>
                <div className='hidden justify-center items-center'>
                    <Image src={showcaseImage} alt="ViewMee showcase" className="size-2/3 rounded-xl mb-6 shadow-lg" />
                </div>
                <div className='flex flex-col justify-center items-center p-5'>
                    <h1 className="text-6xl font-bold text-yellow-400 mb-4">Why ViewMee?</h1>
                    <Image src={showcaseImage} alt="ViewMee showcase" className="size-2/3 md:hidden rounded-xl mb-6 shadow-lg" />
                    <ul className=" text-gray-100 font-mono font-normal text-xl text-wrap flex flex-col w-full justify-center items-center gap-2 mb-6 animate-tracking-in-expand">
                        <li className='border-2 border-yellow-400 p-2 w-fit hover:border-yellow-600'>Showcase your links seamlessly from social platforms like Instagram, TikTok, and YouTube.</li>
                        <li className='border-2 p-2 w-fit border-yellow-400'>Personalized layouts to match your unique style.</li>
                        <li className='border-2 p-2 w-fit border-yellow-400'>Smart analytics to track engagement and optimize your presence.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const View1 = () => {
    return (<>
        <h2 className="text-2xl text-center shadow-md text-yellow-400 font-semibold">Be seen. Be remembered. Be ViewMee</h2>
        <div className="max-w-fit w-full bg-gray-900 text-white shadow-md drop-shadow-xl shadow-yellow-300 rounded-2xl p-4 px-8 m-4">
            <div className="flex flex-col items-center gap-4">
                <p className="hidden md:block">Sign up for free and get your personalized ViewMee live in minutes.</p>
                <p className="md:hidden block text-center text-gray-100">Sign up for free at</p>
                <a href='/' className="text-yellow-400 hover:underline">viewmee.live/you</a>
                <button onClick={() => signIn()} className="mt-4 bg-blue-600 text-white font-normal shadow-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">Sign Up</button>
            </div>
            <p className="text-center mt-6 font-mono hidden md:block font-thin">Your story deserves a better view!</p>
        </div>
    </>
    );
}

export default ViewMeeLanding;