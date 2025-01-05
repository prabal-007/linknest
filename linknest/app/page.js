"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, settext] = useState("")

  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }
  return (
    <main>
      <section className="bg-lime-800 min-h-screen grid md:grid-cols-2 items-center">
        <div className="md:ml-[10vw] text-yellow-400 flex flex-col gap-1 md:px-1 px-4 -mt-4">
          <p className="font-extrabold text-5xl">Nest</p>
          <p className="font-extrabold text-5xl">all your links,</p>
          <p className="font-extrabold text-5xl">at one place.</p>
          <img src="/image.png" alt="linknest" className="w-fit h-fit mt-2 -mb-2 rounded-lg block md:hidden" />
          {/* <img src="/social.gif" alt="linknest" className="w-fit h-fit mt-2 -mb-2 rounded-lg block md:hidden" /> */}
          <p className="text-sm font-semibold my-4 text-wrap">Join a growing community of creators, entrepreneurs, and businesses who use LinkNest to simplify their digital presence. Share everything you create, promote, and sell with just one "link in bio".</p>
          <div className="flex gap-4">
            <input value={text} onChange={(e) => settext(e.target.value)} type="text" className="text-sm p-2 rounded-md focus:border-green-700 text-black" placeholder="linknest/your-url" />
            <button disabled={text == ""} onClick={() => createTree()} className="text-black bg-pink-400 disabled:bg-pink-300 active:bg-pink-500 p-2 rounded-full text-sm font-semibold">Claim your Linknest</button>
          </div>
        </div>
        <div className="hidden md:block mr-[10vw]">
          <img src="/image.png" alt="linknest" className="w-fit h-fit rounded-lg" />
        </div>
      </section>
      <section className="bg-red-50 min-h-screen backdrop-blur-md text-black font-bold text-2xl flex flex-col justify-center items-center">
        Someting is Cooking!
        {/* asdk */}
        <div className="flex justify-center items-center">
        <img src="/cookbook.gif" alt="" className="size-80"/>
        </div>
      </section>
    </main>
  );
}
