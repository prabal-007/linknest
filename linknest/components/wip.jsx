

export const Wip = ({ title }) => {
    return (
        <div className='w-full h-full flex items-center'>
            <div className='w-full p-4 flex flex-col bg-slate-950 justify-center items-center border-2 rounded-lg shadow-md'>
                <img src="/gifs/soon.gif" alt="" className='size-40' />
                <div className="text-white text-2xl flex flex-col items-center justify-center m-2">
                    <h1>{title}</h1>
                    <h2 className='font-mono m-2'>Under Construction</h2>
                </div>
            </div>
        </div>
    )
}