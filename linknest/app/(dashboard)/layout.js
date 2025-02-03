"use client"
import Link from "next/link";
import { SidebarItem } from "../../components/SidebarItem";
import { IoHome } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { RiChatAiFill } from "react-icons/ri";
import { VscOpenPreview } from "react-icons/vsc";
import { MdOutlineContactSupport } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { User } from "@heroui/react";


export default function Layout({
  children,
}) {
  const { data: session } = useSession();

  return (<>
    <div className="flex backdrop-blur-0">
      <div className="w-[18vw] flex flex-col items-center justify-between p-2 border-r-8 border-slate-500 my-2 min-h-screen">
        <div className="flex flex-col items-center">
          <Link href='/' className='m-2 bg-white w-full flex items-center justify-center p-2 rounded-md'>
            <img src="/logo-rbg.png" alt="viewMee" className='w-32' />
          </Link>
          <div>
            <SidebarItem href={"/home"} title="Home" icon={<IoHome />} />
            <SidebarItem href={"/profile"} title="Profile" icon={<FaRegUser />} />
            <SidebarItem href={"/create"} title="Create ViewMee.live" icon={<IoCreate />} />
            <SidebarItem href={`/review`} title="Review" icon={<VscOpenPreview />} />
            <SidebarItem href={"/chatstark"} title="Stark AI" icon={<RiChatAiFill />} />
            <SidebarItem href={"/review"} title="Support & Feedback" icon={<MdOutlineContactSupport />} />
          </div>
        </div>
        <div className="text-white">
          {session && <div className=" rounded-md border-orange-100 p-2 flex flex-col justify-center items-center gap-2">
            <div className='p-2 w-full rounded-2xl flex border justify-start gap-4 items-center'>
              <img src={session?.user?.image} alt={session?.user?.name} className='w-8 h-8 rounded-full' />
              <p>Hi, {session?.user?.name}!</p>
              {/* <p>{session?.user?.email}</p> */}
            </div>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="bg-red-600 p-2 py-1 rounded-lg w-full hover:bg-red-700 active:bg-red-500 border border-red-600 active:border-black">Log Out</button>
          </div>}
        </div>
      </div>
      <div className="w-full p-2 rounded-lg">
        {children}
      </div>
    </div>
    <div className='text-center pb-1 text-white bg-slate-800'>© 2025 viewMee.live</div>
  </>
  );
}