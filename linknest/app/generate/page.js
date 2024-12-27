"use client"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'

const Generate = () => {
    // const [link, setlink] = useState("")
    // const [lable, setlable] = useState("")
    const [links, setLinks] = useState([{ link: "", lable: "" }])
    const [handle, sethandle] = useState("")
    const [pic, setpic] = useState("")

    const handleChange = (index, link, lable) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i === index) {
                    return { link, lable }
                } else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        setLinks(links.concat([{link: "", lable: ""}]))
    }

    const submitLinks = async (handle, links, pic) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "handle": handle,
            "links": links,
            "pic": pic
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await response.json();
        toast(result.message)
        alert(result.message)
    }

    return (
        <div className="bg-[#e0cfe0] min-h-screen grid grid-cols-2 items-center">
            {/* <ToastContainer className=""/> */}
            <div className='ml-[10vw] flex flex-col gap-2 p-10'>
                <h2 className='text-2xl text-black font-extrabold'>Create Your LinkNest</h2>
                <div className=''>
                    <p className='text-black font-semibold'>Step 1: Claim your handle</p>
                    <input value={handle || ""} onChange={(e) => sethandle(e.target.value)} type="text" placeholder='Choose a handle' className='p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200' />
                </div>
                <div>
                    <p className='text-black font-semibold'>Step 2: Add Links</p>
                    {links && links.map((item, index) => {
                        return <div key={index} className=''>
                        <input value={item.link || ""} onChange={(e) => handleChange(index, e.target.value, item.lable)} type="text" placeholder='Enter link' className='p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200' />
                        <input value={item.lable || ""} onChange={(e) => handleChange(index, item.link, e.target.value)} type="text" placeholder='Enter link text' className='p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200' />
                    </div>
                    })}
                    <button onClick={() => addLink()} className='text-white bg-slate-900 px-3 py-1 rounded-full text-sm font-bold'>Add Link</button>
                </div>
                <div className='flex flex-col'>
                    <p className='text-black font-semibold'>Step 3: Add Picture and Finalize</p>
                    <input value={pic || ""} onChange={(e) => setpic(e.target.value)} type="text" placeholder='Enter link to your picture' className='p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200' />
                    <button onClick={() => submitLinks(handle, links, pic)} className='text-white bg-slate-900 px-4 py-1 rounded-full text-sm font-bold w-fit m-2'>Create Your LinkNest</button>
                </div>
            </div>
            <div className='mr-[10vw]'>
                <img src="/generate.png" alt="generate" />
            </div>
        </div>
    )
}


export default Generate