import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const handle = searchParams.get("handle");

    const client = await clientPromise;
    const db = client.db("linknest");
    const userDoc = await db.collection("links").findOne({ "handles.handle": handle });

    if (!userDoc) {
        return new Response(JSON.stringify(null), { status: 404 });
    }

    const selectedHandle = userDoc.handles.find((h) => h.handle === handle);
    return new Response(JSON.stringify({ ...selectedHandle, email: userDoc.email }), { status: 200 });
}
