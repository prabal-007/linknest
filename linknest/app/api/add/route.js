import clientPromise from "@/app/lib/mongodb";

export async function POST(request) {
    const body = await request.json();

    if (!body.handle) {
        return Response.json({ status: 400, success: false, error: true, message: "Handle is required!", result: null });
    }

    const client = await clientPromise;
    const db = client.db("linknest");
    const collection = db.collection("links");

    // const doc = await collection.findOne({ handle: { $regex: `^${body.handle}$`, $options: "i" } });
    const doc = await collection.findOne({ handle: body.handle });

    if (doc) {
        return Response.json({ status: 400, success: false, error: true, message: "Handle already exists! Try a different handle.", result: null });
    }

    const result = await collection.insertOne(body);
    return Response.json({ success: true, error: false, message: "Creating your LinkNest!", result: result });
}
