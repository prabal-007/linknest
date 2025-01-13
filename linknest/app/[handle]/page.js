// "use client"
import Link from "next/link"
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const handle = (await params).handle

    const client = await clientPromise;
    const db = client.db("linknest");
    const collection = db.collection("links");

    const items = await collection.findOne({ handle: handle })

    if (!items) {
        return notFound();
    }

    return <div className={`grid grid-cols-1 md:grid-cols-3 bg-lime-100 bg-cover h-screen md:backdrop-blur-3xl bg-white/30 absolute inset-0`}
        style={{ backgroundImage: `url(${items.pic})` }}
    >
        <div className="hidden md:block blur-xl min-h-screen hover:blur-xl"></div>
        <div className="col-span-1 h-[80vh] md:h-[95vh] text-sm flex flex-col justify-center items-center backdrop-blur-xl rounded-lg m-4 border border-double border-black">
            <img src={items.pic} alt={items.handle?.[0]} className="rounded-full border-2 size-24" />
            <Link href={`/${items.handle}`}><p className="text-xl font-bold">@{items.handle}</p></Link>
            <p className="w-2/3 text-center text-white text-wrap p-3 px-4">{items.bio === "" ? `Hi there! I'm ${items.handle}` : items.bio}</p>
            {items.links.map(item => {
                return <div key={item.link} className="w-2/3">
                    <Link href={item.link} alt={item.lable} target="__blank" className="bg-slate-100 hover:bg-white border border-yellow-400 hover:border-black rounded-xl shadow-lg font-bold w-full m-1 flex justify-center hover:animate-pulse">
                        <div className="w-full flex justify-center items-center py-3 p-2">{item.lable}</div>
                    </Link>
                </div>
            })}
            <Link href="/" alt={items.lable} target="__blank" className="bg-yellow-400 bottom-1 absolute border border-yellow-400 active:border-black rounded-3xl shadow-md font-bold px-4 m-1 flex justify-center font-mono hover:bg-yellow-500 active:bg-yellow-600 w-fit">
                <div className="w-full flex justify-center items-center py-3 p-2">Get Your LinkNest for Free!</div>
            </Link>
        </div>
        <div className="hidden md:block blur-xl min-h-screen hover:blur-xl"></div>
    </div>
}