// "use client"
import Link from "next/link"
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const handle = (await params).handle

    const client = await clientPromise;
    const db = client.db("linknest");
    const collection = db.collection("links");

    const item = await collection.findOne({ handle: handle })

    if (!item) {
        return notFound();
    }

    return <div className={`grid grid-cols-3 bg-lime-100 bg-cover h-screen md:backdrop-blur-3xl bg-white/30 absolute inset-0`}
    style={{ backgroundImage: `url(${item.pic})` }}
    >
        <div className=""></div>
        <div className="col-span-1 text-sm flex flex-col justify-center items-center backdrop-blur-xl rounded-lg m-4 border border-black">
            <img src={item.pic} alt="item.handle" className="rounded-full size-24" />
            <p className="text-xl font-bold">@{item.handle}</p>
            <p className="w-2/3 text-center text-wrap p-3 px-4">{item.bio === "" ? `Hi there! I'm ${handle}` : item.bio }</p>
            {item.links.map(item => {
                return <div key={item.link} className="w-2/3">
                    <Link href={item.link} alt={item.lable} target="__blank" className="bg-white rounded-lg shadow-md font-bold w-full m-1 flex justify-center">
                        <div className="w-full flex justify-center items-center py-3 p-2">{item.lable}</div>
                    </Link>
                </div>
            })}
        </div>
        <div className="blur-xl min-h-screen hover:blur-xl"></div>
    </div>
} 