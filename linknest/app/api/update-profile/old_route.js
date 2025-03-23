import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    try {
        const { handle, bio, links, background, solidBg } = await req.json();

        const client = await clientPromise;
        const db = client.db("linknest");

        const result = await db.collection("links").updateOne(
            { "handles.handle": handle },
            { $set: { "handles.$.bio": bio, "handles.$.links": links, "handles.$.pic": background, "handles.$.solidBg": solidBg } }
        );

        if (result.modifiedCount === 0) {
            return new Response(JSON.stringify({ error: "Update failed" }), { status: 400 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
