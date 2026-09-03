import { GoDash } from "react-icons/go";

function InterestCard(){
    return(
        <div className="bg-[#fff] font-DM-Sans px-6 py-6 rounded-2xl mb-4">
                      <div className="flex items-end justify-between gap-1 mb-5">
                        <div className="flex items-center gap-1 text-[11px] tracking-wide text-[#c4622a] font-semibold">
                          <GoDash />
                          <p>YOUR INTERESTS</p>
                        </div>
                        <a href="" className="text-[10px] text-[#c4622a] font-bold">
                          See ideas
                        </a>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-gray-600">
                        <div className="bg-[#eae3d29d] px-2 py-1 rounded-2xl">
                          Home-Based Business
                        </div>
                        <div className="bg-[#eae3d29d] px-2 py-1 rounded-2xl">
                          Food & Beverage
                        </div>
                      </div>
                    </div>
    )
}

export default InterestCard;