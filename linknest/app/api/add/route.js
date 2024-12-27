import clientPromise from "@/app/lib/mongodb";


export async function POST(request) {
    const body = await request.json();
    // console.log(body)
    const client = await clientPromise;
    const db = await client.db("linknest");
    const collection = await db.collection("links")

    const doc = await collection.findOne({handle: body.handle});

    if (doc) {
        return Response.json({ status: 400, success: false, error: true, message: "Handle already exist! Try a differnt handle." });
    }

    const result = await collection.insertOne({body})
    return Response.json({success: true, error: false, message: "Your LinkNest created successfully!", result: result})
}