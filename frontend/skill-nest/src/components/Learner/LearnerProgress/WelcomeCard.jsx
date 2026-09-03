import { MdArrowRightAlt } from "react-icons/md";

function WelcomeBanner(){

    return (
        <div className="bg-[#1e3a1e] text-white rounded-2xl px-6 py-6 mb-4">
                  <p className="text-[#a1a1aa] font-DM-Sans text-[15px]">
                    Progress Report
                  </p>
                  <h3 className="font-Outfit font-bold text-[27px] mb-1.5">
                    Kavitha Menon
                  </h3>
                
                  <div className="py-1 bg-white"></div>

                  <p>49% of roadmap complete · Step 3 of 5 in progress</p>

                  <div>
                    <div>
                        <p><span>2/8</span>Resources done</p>
                    </div>
                    <div>
                        <p><span>2/6</span>Badges earned</p>
                    </div>
                    <div>
                        <p><span>8</span>Days active</p>
                    </div>
                  </div>
                </div>
    )
}

export default WelcomeBanner;