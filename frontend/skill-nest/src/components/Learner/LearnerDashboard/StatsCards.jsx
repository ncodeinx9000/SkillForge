function StatsCard({icon:Icon, iconColor, iconBgColor ,stats, statName, weekStat}){
    return(
         <div className="bg-[#fff] px-5 py-5 rounded-2xl">
                    <div className="flex items-start justify-between mb-3.5 ">
                      <div className={`${iconBgColor} px-2.5 py-2.5 rounded-xl`}>
                        <Icon className={`${iconColor}`}/>
                      </div>
                      <div className="text-[11px] font-DM-Sans text-green-700 bg-green-100 font-semibold px-1 py-0.5 rounded-2xl">
                        {weekStat}
                      </div>
                    </div>
                    <h3 className="text-[25px] font-Outfit font-extrabold mb-1">{stats}</h3>
                    <p className="text-[12px] font-DM-Sans text-gray-500">
                      {statName}
                    </p>
                  </div>
    )
}

export default StatsCard;