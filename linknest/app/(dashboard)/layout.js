"use client"
import Link from "next/link";
import { SidebarItem } from "../../components/SidebarItem";
import { IoHome } from "react-icons/io5";
import { IoCreate } from "react-icons/io5";
import { RiChatAiFill } from "react-icons/ri";
import { VscOpenPreview } from "react-icons/vsc";
import { MdOutlineContactSupport } from "react-icons/md";
import { AvatarNameComponent } from "@/components/ui/AvatarComponent";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { MdWorkspacePremium } from "react-icons/md";



export default function Layout({
  children,
}) {
  const router = useRouter();
  const { data : session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, [session, router]);

  return (<>
    <div className="flex h-screen backdrop-blur-0">
      <div className="w-[18vw] flex flex-col items-center justify-between p-2 border-r-8 border-slate-500 my-2 min-h-screen">
        <div className="flex flex-col items-center">
          <Link href='/' className='m-2 bg-white w-full flex items-center justify-center p-2 rounded-md'>
            <img src="/logo-rbg.png" alt="viewMee" className='w-32' />
          </Link>
          <div>
            <SidebarItem href={"/dashboard"} title="Dashboard" icon={<IoHome />} />
            <SidebarItem href={"/create"} title="Create ViewMee.live" icon={<IoCreate />} />
            <SidebarItem href={`/review`} title="Review" icon={<VscOpenPreview />} />
            <SidebarItem href={"/chat"} title="Stark AI" icon={<RiChatAiFill />} />
            <SidebarItem href={"/website-builder"} title="Website Builder" icon={<MdOutlineContactSupport />} />
          </div>
        </div>
        <div className="text-white flex flex-col justify-center items-center">
          <button className="border border-yellow-100 hover:bg-yellow-500 active:border-black flex justify-center items-center gap-1 rounded-xl text-lg font-mono font-semibold p-2 shadow-md bg-yellow-400 text-black my-1">Get Premium<MdWorkspacePremium />
          </button>
          <AvatarNameComponent />
        </div>
      </div>
      <div className="w-full p-2 rounded-lg">
        {children}
      </div>
    </div>
    <div className='text-center pb-1 text-white bg-slate-800 md:mt-2'>© 2025 viewMee.live</div>
  </>
  );
}
