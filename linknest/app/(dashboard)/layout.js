"use client";
import Link from "next/link";
import { SidebarItem, SidebarItemIcon } from "../../components/SidebarItem";
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
import { RiMenu3Fill } from "react-icons/ri";
import PricingModal from "@/components/PricingModal";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";

export default function Layout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sidebarStatus, setSidebarStatus] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px is the 'md' breakpoint in Tailwind CSS
    };

    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex h-screen w-full justify-center backdrop-blur-0">
        {/* Sidebar Toggle Button (Desktop - Open) */}
        <div className="flex flex-col justify-start gap-5 items-center bg-slate-800">
          {!sidebarStatus && isDesktop && (
            <button
              onClick={handleSidebar}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className={`hidden md:inline-flex bg-black h-fit items-center p-2 mt-2 text-sm text-gray-500 rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            >
              <span className="sr-only">Open sidebar</span>
              <BiRightArrow className="bg-black size-6" />
            </button>
          )}

          {/* Sidebar Toggle Button (Mobile - Open) */}
          {!sidebarStatus && !isDesktop && (
            <button
              onClick={handleSidebar}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className={`md:hidden inline-flex bg-black h-fit items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            >
              <span className="sr-only">Open sidebar</span>
              <BiRightArrow className="bg-black size-6" />
            </button>
          )}

          {/* Sidebar Toggle Button (Desktop - Closed) */}
          <div className="flex flex-col justify-start gap-2 items-center">
            <SidebarItemIcon
              href={"/dashboard"}
              icon={<IoHome />}
              className="hover:text-blue-500 dark:hover:text-blue-300"
            />
            <SidebarItemIcon
              href={"/create"}
              icon={<IoCreate />}
              className="hover:text-blue-500 dark:hover:text-blue-300"
            />
            <SidebarItemIcon
              href={"/review"}
              icon={<VscOpenPreview />}
              className="hover:text-blue-500 dark:hover:text-blue-300"
            />
            <SidebarItemIcon
              href={"/chat"}
              icon={<RiChatAiFill />}
              className="hover:text-blue-500 dark:hover:text-blue-300"
            />
            <SidebarItemIcon
              href={"/website-builder"}
              icon={<MdOutlineContactSupport />}
              className="hover:text-blue-500 dark:hover:text-blue-300"
            />
            <SidebarItemIcon
              href={"/resume-builder"}
              icon={<MdOutlineContactSupport />}
              className="hover:text-blue-500 dark:hover:text-blue-300"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className=" flex justify-cente items-start md:items-center">
          <aside
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out shadow-xl bg-gradient-to-br from-[#1e2640] to-[#141a2e] ${sidebarStatus ? "translate-x-0" : "-translate-x-full"
              }`}
            aria-label="page"
          >
            <div className="h-full px-3 py-4 overflow-y-auto flex flex-col items-center justify-between p-2">
              <div className="">
                <div className="flex flex-col items-center">
                  <Link
                    href={"/"}
                    className="m-2 w-full flex items-center justify-center p-2 rounded-md"
                  >
                    <img
                      src="/logo-rbg.png"
                      alt="viewMee"
                      className="w-40 bg-transparent bg-white p-1 rounded-md"
                    />
                  </Link>
                  <div>
                    <SidebarItem
                      href={"/dashboard"}
                      title="Dashboard"
                      icon={<IoHome />}
                      // onClick={handleSidebar}
                      className="hover:text-blue-500 dark:hover:text-blue-300"
                    />
                    <SidebarItem
                      href={"/create"}
                      title="Create ViewMee.live"
                      icon={<IoCreate />}
                      onClick={handleSidebar}
                      className="hover:text-blue-500 dark:hover:text-blue-300"
                    />
                    <SidebarItem
                      href={`/review`}
                      title="Review"
                      icon={<VscOpenPreview />}
                      onClick={handleSidebar}
                      className="hover:text-blue-500 dark:hover:text-blue-300"
                    />
                    <SidebarItem
                      href={"/chat"}
                      title="Stark AI"
                      icon={<RiChatAiFill />}
                      // onClick={handleSidebar}
                      className="hover:text-blue-500 dark:hover:text-blue-300"
                    />
                    <SidebarItem
                      href={"/website-builder"}
                      title="Website Builder"
                      icon={<MdOutlineContactSupport />}
                      // onClick={handleSidebar}
                      className="hover:text-blue-500 dark:hover:text-blue-300"
                    />
                    <SidebarItem
                      href={"/resume-builder"}
                      title="Resume Builder"
                      icon={<MdOutlineContactSupport />}
                      onClick={handleSidebar}
                      className="hover:text-blue-500 dark:hover:text-blue-300"
                    />
                  </div>
                </div>
              </div>

              <div className="text-white flex flex-col gap-4 justify-center items-center">
                <button
                  onClick={handleOpenModal}
                  className="border border-yellow-100 hover:bg-yellow-500 active:border-black flex justify-center items-center gap-1 rounded-xl text-lg font-mono font-semibold p-2 shadow-md bg-gradient-to-r from-yellow-400 to-yellow-600 hover:shadow-yellow-500/50 hover:shadow-lg hover:scale-105 transition-all"
                >
                  Get Premium
                  <MdWorkspacePremium />
                </button>
                <AvatarNameComponent />
              </div>
            </div>
          </aside>
          {/* Sidebar Toggle Button (Close) */}
          {sidebarStatus && (
            <button
              onClick={handleSidebar}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className={`md:inline-flex z-50 absolute left-[50%] md:left-[15%] h-fit bg-black items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            >
              <span className="sr-only">Close sidebar</span>
              <BiLeftArrow className=" size-6" />
            </button>
          )}
        </div>
        {/* Main Content */}
        <div
          className="w-full p-2 rounded-lg"
          style={{ marginLeft: isDesktop && sidebarStatus ? "16rem" : "0" }}
        >
          {children}
        </div>
      </div>
      <PricingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
