"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import ViewMeeLanding from "@/components/ViewMeeLanding";
import { Tooltip } from "@heroui/react";

export default function Home() {
  const router = useRouter();
  const [text, settext] = useState("")

  const createTree = () => {
    router.push(`/create?handle=${text}`)
  }
  return (
    <main>
      <section className="min-h-screen grid md:grid-cols-2 items-center">
        <div className="md:ml-[10vw] text-yellow-400 flex flex-col gap-1 md:px-1 px-4 -mt-4 backdrop-blur-md">
          <p className="font-extrabold text-5xl">See everything</p>
          <p className="font-extrabold text-5xl">you are,</p>
          <p className="font-extrabold text-5xl">in one view.</p>
          <img src="/landing.png" alt="ViewMee" className="w-fit h-fit mt-2 -mb-2 rounded-lg block md:hidden" />
          {/* <img src="/gifs/social.gif" alt="ViewMee" className="w-fit h-fit mt-2 -mb-2 rounded-lg block md:hidden" /> */}
          <p className="text-sm font-semibold my-4 text-wrap">Join creators, influencers, and entrepreneurs who use ViewMee to build a dynamic digital presence. With one simple link, connect your audience to everything you create, promote and share with just one "link in bio".</p>
          <div className="flex gap-4">
            <input value={text} onChange={(e) => settext(e.target.value)} type="text" className="text-sm p-2 rounded-md focus:border-green-700 text-black" placeholder="viewmee.live/username" />
            <Tooltip showArrow={true} content="Enter unsename to proceed!" className="text-white bg-black text-xs p-1 rounded-full">
              <button disabled={text == ""} onClick={() => createTree()} className="text-black bg-pink-400 disabled:bg-pink-300 active:bg-pink-500 p-2 hover:cursor-pointer rounded-full disabled:text-slate-800 text-sm font-semibold">Claim your ViewMee Profile</button>
            </Tooltip>
          </div>
        </div>
        <div className="hidden md:block mr-[10vw]">
          <img src="/landing.png" alt="ViewMee" className="w-fit h-fit rounded-lg" />
        </div>
      </section>
      <section className="min-h-screen backdrop-blur-md text-black font-bold text-2xl flex flex-col justify-center items-center">
        <ViewMeeLanding />
      </section>
    </main>
  );
}
