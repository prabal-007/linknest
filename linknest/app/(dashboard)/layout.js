"use client"
import Link from "next/link";
import { SidebarItem } from "../../components/SidebarItem";
import { IoHome } from "react-icons/io5";
import { IoCreate } from "react-icons/io5";
import { RiChatAiFill } from "react-icons/ri";
import { VscOpenPreview } from "react-icons/vsc";
import { MdOutlineContactSupport } from "react-icons/md";
import { AvatarNameComponent } from "@/components/ui/AvatarComponent";


export default function Layout({
  children,
}) {
  return (<>
    <div className="flex backdrop-blur-0">
      <div className="w-[18vw] flex flex-col items-center justify-between p-2 border-r-8 border-slate-500 my-2 min-h-screen">
        <div className="flex flex-col items-center">
          <Link href='/' className='m-2 bg-white w-full flex items-center justify-center p-2 rounded-md'>
            <img src="/logo-rbg.png" alt="viewMee" className='w-32' />
          </Link>
          <div>
            <SidebarItem href={"/dashboard"} title="Dashboard" icon={<IoHome />} />
            <SidebarItem href={"/create"} title="Create ViewMee.live" icon={<IoCreate />} />
            <SidebarItem href={`/review`} title="Review" icon={<VscOpenPreview />} />
            <SidebarItem href={"/chatstark"} title="Stark AI" icon={<RiChatAiFill />} />
            <SidebarItem href={"/review"} title="Support & Feedback" icon={<MdOutlineContactSupport />} />
          </div>
        </div>
        <div className="text-white">
          <AvatarNameComponent />
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
