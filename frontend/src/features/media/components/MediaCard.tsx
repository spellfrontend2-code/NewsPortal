function MediaCard({media,onSelect }){
    return (
       <div
                    key={media.id}
                    className="relative h-[220px] w-full border border-[var(--color-secondary)] rounded-xl  hover:scale-105 transition-all duration-300 group cursor-pointer"
      onClick={() => onSelect?.(media)}

                  >
                    <div className=" w-full h-full flex justify-center items-center ">
                      {media.file_type === "video" ? (
                        <video
                          src={media.file_url}
                          disablePictureInPicture
                          className="w-full h-full rounded-xl"
                        />
                      ) : (
                        <img
                          src={media.file_url}
                          className="w-full h-full rounded-xl"
                        />
                      )}
                      
                    </div>
                    <div className="absolute inset-0 h-full w-full flex flex-col justify-between items-center overflow-hidden opacity-0 group-hover:opacity-100 bg-gray-500/10 rounded-xl">
                       <div className="flex justify-center items-center h-[20px] w-[110px] bg-[var(--color-primary)] mt-2 px-2 py-1 rounded-full text-white text-sm ">
                        {media.category}
                      </div>
                      <div className="text-gray-800 bg-gray-300 w-full rounded-b-xl text-sm font-semibold text-center">
                        {media.file_name?.split(".")[0]}
                      </div>
                    </div>
                  </div>
    )
}
export default MediaCard