
import Link from "next/link"
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function HandlePage({ params }) {
    const { handle } = await params;
    const session = await getServerSession({ authOptions });

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    const email = session.user.email;

    const client = await clientPromise;
    const db = client.db("linknest");
    const collection = db.collection("links");

    const userDoc = await collection.findOne({ email });
    // const selectedHandle = await collection.findOne({ handle: handle })
    // { console.log("userDoc : ", userDoc) }

    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    if (userDoc) {
        const allHandles = userDoc.handles || [];

        const selectedHandle = allHandles.find((handleObj) => handleObj.handle === handle);

        if (!selectedHandle) {
            return {
                notFound: true,
            };
        }

        return (<>
            <div className={`grid grid-cols-1 md:grid-cols-3 bg-lime-100 bg-cover h-screen md:backdrop-blur-3xl bg-white/30 absolute inset-0`}
                style={{ backgroundImage: `url(${selectedHandle.pic})` }}
            >
                <div className="hidden md:block blur-xl min-h-screen hover:blur-xl"></div>
                <div className="col-span-1 h-[80vh] md:h-[95vh] text-sm flex flex-col justify-center items-center backdrop-blur-xl rounded-lg m-4 border border-double border-black">
                    <img src={selectedHandle.pic} alt={selectedHandle.handle?.[0]} className="rounded-full border-2 size-24 hover:size-28 hover:border-black" />
                    <Link href={`/${selectedHandle.handle}`}><p className="text-xl invert font-mono font-bold">@{selectedHandle.handle}</p></Link>
                    <p className="w-2/3 text-center text-white text-wrap p-3 px-4">{selectedHandle.bio === "" ? `Hi there! I'm ${selectedHandle.handle}` : selectedHandle.bio}</p>
                    {selectedHandle.links.map(item => {
                        return <div key={item.link} className="w-2/3">
                            <Link href={item.link} alt={item.lable} target="__blank" className="bg-slate-100 hover:bg-white border border-yellow-400 hover:border-black rounded-xl shadow-lg font-bold w-full m-1 flex justify-center hover:animate-pulse">
                                <div className="w-full flex justify-center items-center py-3 p-2">{item.lable}</div>
                            </Link>
                        </div>
                    })}
                    <Link href="/" alt={selectedHandle.lable} target="__blank" className="bg-yellow-400 bottom-1 absolute border border-yellow-400 active:border-black rounded-3xl shadow-md font-bold px-4 m-1 flex justify-center font-mono hover:bg-yellow-500 active:bg-yellow-600 w-fit">
                        <div className="w-full flex justify-center items-center py-3 p-2">Get Your ViewMee for Free!</div>
                    </Link>
                </div>
                <div className="hidden md:block blur-xl min-h-screen hover:blur-xl"></div>
            </div>
        </>
        );
    } else {
        return {
            notFound: true,
        };
    }
}