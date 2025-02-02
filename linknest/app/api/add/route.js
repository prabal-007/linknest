import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    const body = await request.formData();

    const handle = body.get('handle');
    const email = body.get('email');
    if (!handle) {
        return Response.json({ status: 400, success: false, error: true, message: "Handle is required!", result: null });
    }
    if (email == 'undefined') {
        return Response.json({ status: 400, success: false, error: true, message: "Please login to proceed!", result: null });
    }

    const client = await clientPromise;
    const db = client.db("linknest");
    const collection = db.collection("links");

    const userDoc = await collection.findOne({ email });

    if (userDoc) {
        const currentHandles = userDoc.handles || [];
        const handleLimit = userDoc.handleLimit || 1;

        if (currentHandles.length >= handleLimit) {
            return Response.json({ status: 400, success: false, error: true, message: "Handle limit exceeded! Upgrade to premium to add more.", result: null });
        }

        const handleExists = currentHandles.some((h) => h.handle.toLowerCase() === handle.toLowerCase());
        if (handleExists) {
            return Response.json({ status: 400, success: false, error: true, message: "Handle already exists! Try a different one.", result: null });
        }

        currentHandles.push({
            handle,
            links: JSON.parse(body.get('links')) || [],
            bio: body.get('bio') || "",
            pic: body.get('pic'),
        });

        await collection.updateOne(
            { email },
            { $set: { handles: currentHandles } }
        );

        return Response.json({ success: true, error: false, message: "New handle added successfully!", result: currentHandles });
    } else {
        const result = await collection.insertOne({
            email,
            handleLimit: 1,
            handles: [
                {
                    handle,
                    links: JSON.parse(body.get('links')) || [],
                    bio: body.get('bio') || "",
                    pic: body.get('pic') || "/default.png"
                }
            ]
        });
        return Response.json({ success: true, error: false, message: "Creating your ViewMee profile!", result: result });
    }
}
