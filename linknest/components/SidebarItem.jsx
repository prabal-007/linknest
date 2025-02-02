"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return (<div className={`flex items-center ${selected ? "text-[#ffffff] bg-slate-800" : "text-slate-400"} cursor-pointer  p-2 pl-8 border rounded-md hover:bg-slate-700 m-2`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-[#ffffff]" : "text-slate-400"}`}>
            {title}
        </div>
    </div>)
}