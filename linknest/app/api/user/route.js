import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return Response.json({ success: false, message: "Email is required." }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("linknest");
  const collection = db.collection("links");

  const userDoc = await collection.findOne({ email });
  if (!userDoc) {
    return Response.json({ success: false, message: "User not found." }, { status: 404 });
  }

  return Response.json({ success: true, handles: userDoc.handles || [] });
}
