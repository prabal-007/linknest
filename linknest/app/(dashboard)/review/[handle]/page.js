"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EditableProfile from "./EditableProfile";
import { useSession } from "next-auth/react";

export default function HandlePage() {
    const params = useParams();
    const { handle } = params;
    const { data: session, status } = useSession();
    const [selectedHandle, setSelectedHandle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (status === "loading") return;
            if (status === "unauthenticated") {
                window.location.href = "/signin";
                return;
            }

            try {
                const response = await fetch(`/api/get-profile?handle=${handle}`);
                if (response.ok) {
                    const data = await response.json();
                    setSelectedHandle(data);
                } else {
                    console.error("Failed to fetch profile data");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [handle, status]);

    if (loading) return <p>Loading...</p>;
    if (!selectedHandle) return <p>Profile not found.</p>;

    return <EditableProfile selectedHandle={selectedHandle} email={session.user.email} />;
}
