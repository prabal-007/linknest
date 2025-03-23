"use client";
import { UserDropdown } from "@/components/ui/DropdownSelector";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ReviewLayoutComponent({ children }) {
  const router = useRouter();
  const [existingHandles, setExistingHandles] = useState([]);
  const { data: session } = useSession();
  const [selectedHandle, setSelectedHandle] = useState(null);

  useEffect(() => {
    const fetchHandles = async () => {
      try {
        const response = await fetch(`/api/user?email=${session?.user?.email}`);
        if (response.ok) {
          const data = await response.json();
          setExistingHandles(data.handles || []);
          if (data.handles && data.handles.length > 0) {
            setSelectedHandle(data.handles[0].handle);
            router.push(`/review/${data.handles[0].handle}`);
          }
        }
      } catch (error) {
        alert("Error fetching data: ", error);
      }
    };
    if (session?.user?.email) {
      fetchHandles();
    }
  }, [session, router]);

  const handleSelectionChange = (newHandle) => {
    setSelectedHandle(newHandle);
    router.push(`/review/${newHandle}`);
  };

  const accountOptions = existingHandles.map((account) => ({
    label: account.handle,
    value: account.handle,
  }));

  return (
    <div className="flex flex-col gap-2 backdrop-blur-0 w-full h-full overflow-hidden">
      <div className="">
        <UserDropdown
          options={accountOptions}
          selectedValue={selectedHandle}
          onSelect={handleSelectionChange}
          placeholder="Select handle"
          className="p-1 px-2 min-w-32 text-sm rounded-full m-2 focus:outline-purple-200"
        />
      </div>
      <div className="border border-white">{children}</div>
    </div>
  );
}

export default function ReviewLayout({ children }) {
  return (
      <ReviewLayoutComponent>{children}</ReviewLayoutComponent>
  );
}
