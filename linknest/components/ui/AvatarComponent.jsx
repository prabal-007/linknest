import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";

export function AvatarComponent() {
  const { data: session } = useSession();
  const imga = session?.user?.image || "/profile.png"

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <img src={imga} alt="" className="w-9 h-9 rounded-full" />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat" className="avatar-menu p-2">
            <DropdownItem key="profile" className="h-10 gap-2 rounded-md border border-black hover:bg-white">
              <p className="font-bold">Hi, {session?.user?.name}!</p>
              {/* <p className="font-bold">{session?.user?.email}</p> */}
            </DropdownItem>
            <DropdownItem key="analytics" className=" avatar-menu-item">Analytics</DropdownItem>
            <DropdownItem key="settings" className=" avatar-menu-item">Settings</DropdownItem>
            <DropdownItem key="help_and_feedback" className=" avatar-menu-item">Help & Feedback</DropdownItem>
            <DropdownItem onClick={() => signOut({ callbackUrl: "/" })} className="logout-btn" key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export function AvatarNameComponent() {
  const { data: session } = useSession();

  const imga = session?.user?.image || "/profile.png"

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <div className='p-2 w-full rounded-2xl flex border justify-start gap-4 items-center cursor-pointer'>
              <img src={imga} alt={session?.user?.name} className='w-8 h-8 rounded-full' />
              <p>Hi, {session?.user?.name}!</p>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat" className="avatar-menu">
            <DropdownItem key="profile" className="h-14 gap-2 border border-black p-2 rounded-md">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">{session?.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings" className=" avatar-menu-item">Settings</DropdownItem>
            <DropdownItem key="analytics" className=" avatar-menu-item">Analytics</DropdownItem>
            <DropdownItem key="help_and_feedback" className=" avatar-menu-item">Help & Feedback</DropdownItem>
            <DropdownItem onClick={() => signOut({ callbackUrl: "/" })} className="logout-btn" key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}