import { MdArrowRightAlt } from "react-icons/md";
import { LuDot } from "react-icons/lu";

function WelcomeBanner(){

    return (
        <div className="bg-[#1e3a1e] text-white rounded-2xl px-6 py-6 mb-4">
                  <div className="flex items-start gap-5">
                    <div className="px-5 py-2.5 bg-[#8a533077]  text-[22px] font-Outfit font-semibold rounded-2xl border border-2 border-[#a4867477]">
                        <p>R</p>
                        </div>
                    <div>
                        <div className="flex items-center font-Outfit">
                            <p className="text-[19px] font-extrabold mr-3">Rajan Pillai</p>
                            <p className="text-[10px] bg-[#c4622a] px-1.5 py-0.5 rounded-2xl">SBA Verified</p>
                        </div>
                        <div className="flex items-center text-[14px] text-gray-300 mb-2">
                            <p>Mentor</p>
                            <LuDot />
                            <p>Thrissur,Kerela</p>
                        </div>

                        <div className="text-[10px] flex items-center gap-2">
                            <p className="bg-[#3d513d] px-2 py-0.5 rounded-2xl">Food & Beverage</p>
                            <p className="bg-[#3d513d] px-2 py-0.5 rounded-2xl">MSME & Legal</p>
                        </div>
                    </div>
                  </div>
                 
                  
        </div>
    )
}

export default WelcomeBanner;