"use client";

import React, { useState, Suspense, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";

const Generate = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [links, setLinks] = useState([{ link: "", lable: "" }]);
    const [handle, setHandle] = useState("");
    const [pic, setPic] = useState("");
    const [bio, setBio] = useState("");

    // Initialize state with search params on mount
    useEffect(() => {
        setHandle(searchParams.get("handle") || "");
    }, [searchParams]);

    const handleChange = (index, link, lable) => {
        setLinks((initialLinks) =>
            initialLinks.map((item, i) =>
                i === index ? { link, lable } : item
            )
        );
    };

    const addLink = () => {
        setLinks((prevLinks) => [...prevLinks, { link: "", lable: "" }]);
        toast.info("Link added");
    };

    const submitLinks = async () => {
        const payload = {
            handle,
            links,
            pic,
            bio,
        };

        try {
            const response = await fetch("/api/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                toast.error(`Error: ${response.message}`);
                return;
            }

            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
                setLinks([{ link: "", lable: "" }]);
                setHandle("");
                setPic("");
                setBio("");

                setTimeout(() => {
                    router.push(`/${handle}`);
                }, 3000);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error submitting links:", error);
            toast.error("An error occurred while submitting. Please try again.");
        }
    };

    return (
        <>
            <div className="bg-[#e0cfe0] min-h-screen grid grid-cols-2 items-center">
                <div className="ml-[10vw] flex flex-col gap-2 p-10">
                    <h2 className="text-2xl text-black font-extrabold">
                        Create Your LinkNest
                    </h2>
                    <div>
                        <p className="text-black font-semibold">
                            Step 1: Claim your handle
                        </p>
                        <input
                            value={handle}
                            onChange={(e) => setHandle(e.target.value)}
                            type="text"
                            placeholder="Choose a handle"
                            className="p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200"
                        />
                    </div>
                    <div>
                        <p className="text-black font-semibold">Step 2: Add Links</p>
                        {links.map((item, index) => (
                            <div key={index}>
                                <input
                                    value={item.link}
                                    onChange={(e) =>
                                        handleChange(index, e.target.value, item.lable)
                                    }
                                    type="text"
                                    placeholder="Enter link"
                                    className="p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200"
                                />
                                <input
                                    value={item.lable}
                                    onChange={(e) =>
                                        handleChange(index, item.link, e.target.value)
                                    }
                                    type="text"
                                    placeholder="Enter link text"
                                    className="p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200"
                                />
                            </div>
                        ))}
                        <button
                            disabled={links.some((item) => !item.lable || !item.link)}
                            onClick={addLink}
                            className="text-white bg-slate-900 px-3 py-1 rounded-full text-sm font-bold disabled:bg-slate-600"
                        >
                            Add Link
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-black font-semibold">
                            Step 3: Add Picture and Finalize
                        </p>
                        <input
                            value={pic}
                            onChange={(e) => setPic(e.target.value)}
                            type="text"
                            placeholder="Enter link to your picture"
                            className="p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200"
                        />
                        <input
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            type="text"
                            placeholder="Write something about yourself.."
                            className="p-1 px-2 text-sm rounded-md m-2 focus:outline-purple-200"
                        />
                        <button
                            disabled={!pic || !handle}
                            onClick={submitLinks}
                            className="text-white bg-slate-900 px-4 py-1 disabled:bg-slate-600 rounded-full text-sm font-bold w-fit m-2"
                        >
                            Create Your LinkNest
                        </button>
                    </div>
                </div>
                <div className="mr-[10vw]">
                    <img src="/generate.png" alt="generate" />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Generate />
        </Suspense>
    );
}
