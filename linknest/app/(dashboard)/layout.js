import Link from "next/link";
import { SidebarItem } from "../../components/SidebarItem";
import { Footer } from "@/components/Footer";

export default function Layout({
  children,
}) {
  return (
    <div className="flex backdrop-blur-0">
      <div className="w-[18vw] border-r-8 border-slate-500 my-2 min-h-screen pt-28">
        <Link href='/' className=''>
          <img src="/logo-rbg.png" alt="viewMee" className='w-32' />
        </Link>
        <SidebarItem href={"/dashboard"} title="Profile" />
        <SidebarItem href={"/create"} title="Create ViewMee.live" />
        <SidebarItem href={"/review"} title="Review" />
        <SidebarItem href={"/starkai"} title="Stark AI" />
        <SidebarItem href={"/review"} title="Support" />
      </div>
      <div className="w-full p-2 rounded-lg">
        {children}
      </div>
    </div>
  );
}