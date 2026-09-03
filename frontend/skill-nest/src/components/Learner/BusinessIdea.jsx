function BusinessIdeaCard({img, title, category, description, investment, estimatedIncome, matchScore, difficulty}){
    return (

        <div className="rounded-2xl border overflow-hidden">
            <img src={img} alt="" className="mb-6 object-cover"/>
            <div className="px-4">
                <p className="text-[10.5px] font-DM-Sans text-gray-800 mb-1">{category}</p>
            <p className="text-[14px] font-DM-Sans font-semibold mb-2">{title}</p>
            <p className="font-DM-Sans text-[11.5px] text-gray-600 mb-3">{description}</p>
            <div className="flex items-center justify-between font-DM-Sans text-[11.5px] text-gray-600 mb-1">
                <p>Investment</p>
                <p>Rs.{investment}</p>
            </div> 
            <div className="flex items-center justify-between font-DM-Sans text-[11.5px] text-gray-600 mb-1">
                <p>Est. income</p>
                <p>Rs.{estimatedIncome}</p>
            </div>
            <div  className="flex items-center justify-between font-DM-Sans text-[11.5px] text-gray-600 mb-1">
                <p>Skill match</p>
                <div>
                    <p>96%</p>
                </div>
            </div>
            </div>
            
        </div>
    
    )
}

export default BusinessIdeaCard;