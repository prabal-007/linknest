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
import { useState, useEffect } from "react";
import { MdWorkspacePremium } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { RiMenu2Fill } from "react-icons/ri";


export default function Layout({
  children,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [sidebarStatus, setSidebarStatus] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, [session, router]);

  const handleSidebar = () => {
    setSidebarStatus(!sidebarStatus)
  }
  return (<>
    <div className="flex h-screen w-screen backdrop-blur-0">
      <div className="">
        <button onClick={handleSidebar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className={`inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg ${sidebarStatus ? 'sm:block' : 'sm:hidden'}  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}>
          <span className="sr-only">Open sidebar</span>
          <RiMenu3Fill />
        </button>

        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarStatus ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="page">

          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-[#1e2640] flex flex-col items-center justify-between p-2">
            <div className="">
              <button onClick={handleSidebar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className={`sm:hidden  inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg ${sidebarStatus ? 'sm:block' : 'sm:hidden'}  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}>
                <RiMenu2Fill />
              </button>
            {/* </div>

            <div> */}
              <div className="flex flex-col items-center">
                <Link href={'/'} className='m-2 bg-white w-full flex items-center justify-center p-2 rounded-md'>
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
            </div>


            <div className="text-white flex flex-col justify-center items-center">
              <button className="border border-yellow-100 hover:bg-yellow-500 active:border-black flex justify-center items-center gap-1 rounded-xl text-lg font-mono font-semibold p-2 shadow-md bg-yellow-400 text-black my-1">Get Premium<MdWorkspacePremium />
              </button>
              <AvatarNameComponent />
            </div>

          </div>
        </aside>
      </div>
      <div className="w-full p-2 rounded-lg sm:ml-64">
        {children}
      </div>
    </div>
    <div className='text-center pb-1 text-white bg-slate-800 md:mt-0'>© 2025 viewMee.live</div>
  </>
  )
}