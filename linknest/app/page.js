import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="bg-lime-800 min-h-screen grid grid-cols-2 items-center">
        {/* asdk */}
        <div className="ml-[10vw] text-yellow-400 flex flex-col gap-1 px-1">
          <p className="font-extrabold text-5xl">Everything you</p>
          <p className="font-extrabold text-5xl">are. In one,</p>
          <p className="font-extrabold text-5xl">simple link in bio.</p>
          <p className="text-sm my-4 text-wrap">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="flex gap-4">
            <input type="text" className="text-sm p-2 rounded-md focus:border-green-700 text-black" placeholder="linknest/your-url" />
            <button className="text-black bg-pink-400 p-2 rounded-full text-sm font-semibold">Claim your Linknest</button>
          </div>
        </div>
        <div className="mr-[10vw]">
          <img src="/image.png" alt="linknest" className="w-fit h-fit rounded-lg" />
          {/* <Image src='/linknest.png' alt="linknest" className="w-20 h-20"></Image> */}
        </div>
      </section>
      <section className="bg-red-100 min-h-screen">
        {/* asdk */}
      </section>
    </main>
  );
}
