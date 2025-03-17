"use client";

import { useState } from "react";

export default function EditableProfile({ selectedHandle }) {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(selectedHandle.bio || `Hi there! I'm ${selectedHandle.handle}`);
    const [links, setLinks] = useState(selectedHandle.links);
    const [background, setBackground] = useState(selectedHandle.pic);
    const [solidBg, setSolidBg] = useState(selectedHandle.solidBg || "");

    const handleSave = async () => {
        const response = await fetch("/api/update-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ handle: selectedHandle.handle, bio, links, background, solidBg })
        });
        if (response.ok) setIsEditing(false);
    };

    const handleLinkChange = (index, newLink) => {
        const updatedLinks = [...links];
        updatedLinks[index].link = newLink;
        setLinks(updatedLinks);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 bg-lime-100 h-screen absolute inset-0" 
             style={{ backgroundImage: solidBg ? "none" : `url(${background})`, backgroundColor: solidBg }}>
            <div className="hidden md:block min-h-screen"></div>
            <div className="col-span-1 h-[80vh] md:h-[95vh] text-sm flex flex-col justify-center items-center backdrop-blur-xl rounded-lg m-4 border border-double border-black">
                <img src={selectedHandle.pic} alt={selectedHandle.handle} className="rounded-full border-2 size-24" />
                <p className="text-xl font-mono font-bold">@{selectedHandle.handle}</p>
                {isEditing ? (
                    <textarea className="w-2/3 p-3" value={bio} onChange={(e) => setBio(e.target.value)} />
                ) : (
                    <p className="w-2/3 text-center p-3">{bio}</p>
                )}
                {links.map((item, index) => (
                    <div key={item.link} className="w-2/3">
                        {isEditing ? (
                            <input type="text" className="w-full border p-2" value={item.link} onChange={(e) => handleLinkChange(index, e.target.value)} />
                        ) : (
                            <a href={item.link} target="_blank" className="bg-slate-100 border rounded-xl w-full flex justify-center p-2">{item.label}</a>
                        )}
                    </div>
                ))}
                {isEditing && (
                    <>
                        <input type="text" className="w-2/3 border p-2 mt-2" placeholder="Solid Background Color (e.g., #f0f0f0)" value={solidBg} onChange={(e) => setSolidBg(e.target.value)} />
                        <input type="text" className="w-2/3 border p-2 mt-2" placeholder="Background Image URL" value={background} onChange={(e) => setBackground(e.target.value)} />
                    </>
                )}
                <button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="mt-4 bg-yellow-400 p-2 rounded-lg">
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
            </div>
            <div className="hidden md:block min-h-screen"></div>
        </div>
    );
}
