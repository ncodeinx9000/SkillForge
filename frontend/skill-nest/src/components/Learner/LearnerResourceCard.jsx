function LearnerResourceCard({Icon, resource, description, duration, status}){
    return(
        <div className="bg-white px-6 py-6 rounded-2xl mb-4">
                    <div className="mb-3 text-[11px] font-DM-Sans">
                      <div className="bg-pink-100 font-semibold w-9 px-2.5 py-2.5 rounded-xl">
                        <Icon className="text-[15px] text-pink-700 font-DM-Sans" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 font-DM-Sans font-semibold mb-1">
                      {resource}
                    </p>
                    <p className="text-[14px] font-DM-Sans font-semibold mb-1">
                       {description}
                    </p>
                    <div className="bg-[#c4622a] w-full py-[3px] rounded-2xl mb-1"></div>
                    <p className="text-[12px] font-DM-Sans text-gray-600 font-bold">
                      {status}
                    </p>
                  </div>
    )
}

export default LearnerResourceCard;