import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    const body = await req.json();
    const { handle, bio, links, background, solidBg, email, profilePic } = body;

    const client = await clientPromise;
    const db = client.db("linknest");
    const collection = db.collection("links");

    try {
        const userDoc = await collection.findOne({ email });
        if (!userDoc) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }
        const updatedHandles = userDoc.handles.map(h => {
            if (h.handle === handle) {
                return { ...h, bio, links, pic: profilePic, solidBg, };
            }
            return h;
        });

        const result = await collection.updateOne(
            { email },
            { $set: { handles: updatedHandles } }
        );

        if (result.modifiedCount === 1) {
            return new Response(JSON.stringify({ message: "Profile updated successfully" }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: "Profile not updated" }), { status: 500 });
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}
