"use client";
import { UserDropdown } from "@/components/ui/DropdownSelector";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

function ReviewLayoutComponent({ children }) {
    const router = useRouter();
    const pathname = usePathname();
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

                    // Check if a handle is already selected in localStorage
                    const storedHandle = localStorage.getItem("selectedHandle");
                    if (storedHandle && data.handles.some(h => h.handle === storedHandle)) {
                        setSelectedHandle(storedHandle);
                        // Only push if the current path is not the stored handle
                        if (pathname !== `/review/${storedHandle}`) {
                            router.push(`/review/${storedHandle}`);
                        }
                    } else if (data.handles && data.handles.length > 0) {
                        // If no stored handle, set the first one as default
                        setSelectedHandle(data.handles[0].handle);
                        // Only push if the current path is not the first handle
                        if (pathname !== `/review/${data.handles[0].handle}`) {
                            router.push(`/review/${data.handles[0].handle}`);
                        }
                        localStorage.setItem("selectedHandle", data.handles[0].handle);
                    }
                }
            } catch (error) {
                alert("Error fetching data: ", error);
            }
        };
        if (session?.user?.email) {
            fetchHandles();
        }
    }, [session, router, pathname]);

    const handleSelectionChange = (newHandle) => {
        setSelectedHandle(newHandle);
        localStorage.setItem("selectedHandle", newHandle); // Store the selected handle
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
