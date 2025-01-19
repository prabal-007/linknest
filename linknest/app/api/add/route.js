import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    const body = await request.formData();

    const handle = body.get('handle');
    const email = body.get('email');
    if (!handle) {
        return Response.json({ status: 400, success: false, error: true, message: "Handle is required!", result: null });
    }

    const client = await clientPromise;
    const db = client.db("linknest");
    const collection = db.collection("links");

    // const doc = await collection.findOne({ handle: { $regex: `^${body.handle}$`, $options: "i" } });
    const existingHandle = await collection.findOne({ handle: handle });
    const existinmgEmail = await collection.findOne({ email: email });

    if (existingHandle || existinmgEmail) {
        return Response.json({ status: 400, success: false, error: true, message: "Handle or Email already exists! Try a different one.", result: null });
    }

    const result = await collection.insertOne({
        handle: handle,
        email: email,
        links: JSON.parse(body.get('links')),
        bio: body.get('bio'),
        pic: body.get('pic')
    });
    return Response.json({ success: true, error: false, message: "Creating your LinkNest!", result: result });
}
