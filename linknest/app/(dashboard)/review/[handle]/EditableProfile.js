"use client";

import { ImageUploder } from "@/components/ImageUploder";
import { useState, useEffect } from "react";

export default function EditableProfile({ email, selectedHandle }) {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("");
    const [links, setLinks] = useState([]);
    const [background, setBackground] = useState("");
    const [solidBg, setSolidBg] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [loading, setLoading] = useState(true);
    const [originalData, setOriginalData] = useState(null); // Store original data for cancel
    const handle = selectedHandle.handle;

    useEffect(() => {
        const initialData = {
            bio: selectedHandle.bio || `Hi there! I'm ${handle}`,
            links: selectedHandle.links || [],
            background: selectedHandle.pic || "",
            solidBg: selectedHandle.solidBg || "",
            profilePic: selectedHandle.pic || "",
        };
        setOriginalData(initialData);
        setBio(initialData.bio);
        setLinks(initialData.links);
        setBackground(initialData.background);
        setSolidBg(initialData.solidBg);
        setProfilePic(initialData.profilePic);
        setLoading(false);
    }, [selectedHandle, handle]);

    const handleSave = async () => {
        const response = await fetch("/api/update-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ handle, bio, links, background, solidBg, email, profilePic })
        });
        if (response.ok) {
            setIsEditing(false);
            // Update originalData with the saved data
            setOriginalData({ bio, links, background, solidBg, profilePic });
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original data
        if (originalData) {
            setBio(originalData.bio);
            setLinks(originalData.links);
            setBackground(originalData.background);
            setSolidBg(originalData.solidBg);
            setProfilePic(originalData.profilePic);
        }
    };

    const handleLinkChange = (index, field, value) => {
        const updatedLinks = [...links];
        updatedLinks[index][field] = value;
        setLinks(updatedLinks);
    };

    const handleAddLink = () => {
        setLinks([...links, { link: "", lable: "" }]);
    };

    const handleRemoveLink = (index) => {
        const updatedLinks = [...links];
        updatedLinks.splice(index, 1);
        setLinks(updatedLinks);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 bg-lime-100 h-screen absolute inset-0"
            style={{ backgroundImage: solidBg ? "none" : `url(${background})`, backgroundColor: solidBg }}>
            <div className="hidden md:block min-h-screen"></div>
            <div className="col-span-1 h-[80vh] md:h-[95vh] text-sm flex flex-col justify-center items-center backdrop-blur-xl rounded-lg m-4 border border-double border-black">
                {isEditing ? (
                    // <input type="text" className="rounded-full border-2 size-24" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} />
                    <ImageUploder />
                ) : (
                    <img src={profilePic} alt={handle} className="rounded-full border-2 size-24" />
                )}
                <p className="text-xl font-mono font-bold">@{handle}</p>
                {isEditing ? (
                    <textarea className="w-2/3 p-3" value={bio} onChange={(e) => setBio(e.target.value)} />
                ) : (
                    <p className="w-2/3 text-center p-3">{bio}</p>
                )}
                {links.map((item, index) => (
                    <div key={index} className="w-2/3 flex items-center">
                        {isEditing ? (
                            <>
                                <input type="text" className="w-1/2 border p-2" value={item.lable} onChange={(e) => handleLinkChange(index, "lable", e.target.value)} placeholder="lable" />
                                <input type="text" className="w-1/2 border p-2" value={item.link} onChange={(e) => handleLinkChange(index, "link", e.target.value)} placeholder="Link" />
                                <button onClick={() => handleRemoveLink(index)} className="bg-red-500 text-white p-2 rounded-md ml-2">Remove</button>
                            </>
                        ) : (
                            <a href={item.link} target="_blank" className="bg-slate-100 border rounded-xl w-full flex justify-center p-2">{item.lable}</a>
                        )}
                    </div>
                ))}
                {isEditing && (
                    <>
                        <button onClick={handleAddLink} className="mt-2 bg-green-500 text-white p-2 rounded-md">Add Link</button>
                        <label className="flex items-center gap-2 mt-2">
                            <span className="text-gray-700">Solid Background:</span>
                            <input
                                type="color"
                                className="w-10 h-10 border cursor-pointer rounded"
                                value={solidBg}
                                onChange={(e) => setSolidBg(e.target.value)}
                            />
                        </label>

                        {/* <input type="text" className="w-2/3 border p-2 mt-2" placeholder="Background Image URL" value={background} onChange={(e) => setBackground(e.target.value)} /> */}
                    </>
                )}
                <div className="flex gap-2 mt-4">
                    {isEditing && (
                        <button onClick={handleCancel} className="bg-gray-400 p-2 rounded-lg">
                            Cancel
                        </button>
                    )}
                    <button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="bg-yellow-400 p-2 rounded-lg">
                        {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                </div>
            </div>
            <div className="hidden md:block min-h-screen"></div>
        </div>
    );
}
