import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    try {
        const body = await request.formData();
        const handle = body.get("handle");
        const email = body.get("email");

        if (!handle) {
            return Response.json({ 
                status: 400, success: false, error: true, message: "Handle is required!", result: null 
            });
        }

        if (!email || email === "undefined") {
            return Response.json({ 
                status: 400, success: false, error: true, message: "Please login to proceed!", result: null 
            });
        }

        const client = await clientPromise;
        const db = client.db("linknest");
        const collection = db.collection("links");

        // Check if handle already exists globally
        const existingHandle = await collection.findOne({ "handles.handle": handle });
        if (existingHandle) {
            return Response.json({ 
                status: 400, success: false, error: true, message: "Handle already exists! Try a different one.", result: null 
            });
        }

        // Fetch user document by email
        const userDoc = await collection.findOne({ email });

        if (userDoc) {
            const currentHandles = userDoc.handles || [];
            const handleLimit = userDoc.handleLimit || 1;

            if (currentHandles.length >= handleLimit) {
                return Response.json({ 
                    status: 400, success: false, error: true, message: "Handle limit exceeded! Upgrade to premium to add more.", result: null 
                });
            }

            currentHandles.push({
                handle,
                links: JSON.parse(body.get("links") || "[]"),
                bio: body.get("bio") || "",
                pic: body.get("pic") || "/profile.png",
            });

            await collection.updateOne(
                { email },
                { $set: { handles: currentHandles } }
            );

            return Response.json({ 
                success: true, error: false, message: "New handle added successfully!", result: currentHandles 
            });
        } else {
            const result = await collection.insertOne({
                email,
                handleLimit: 1,
                handles: [
                    {
                        handle,
                        links: JSON.parse(body.get("links") || "[]"),
                        bio: body.get("bio") || "",
                        pic: body.get("pic") || "/profile.png",
                    },
                ],
            });

            return Response.json({ 
                success: true, error: false, message: "Creating your ViewMee profile!", result 
            });
        }
    } catch (error) {
        console.error("Error in handle creation:", error);
        return Response.json({ 
            status: 500, success: false, error: true, message: "Internal Server Error.", result: null 
        });
    }
}
