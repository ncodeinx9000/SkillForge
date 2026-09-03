import { LuDot } from "react-icons/lu";
import { BiComment } from "react-icons/bi";

function MentorMentees(){
    return(
       <div>
            <h4 className="text-[14px] font-Outfit font-bold border-b py-4 px-3 mb-3">My Mentees</h4>
             <div className="flex gap-2 w-full">
                             <img src="" alt="" />
                             <div className="w-full">
                                 <div className="flex items-center gap-2 mb-1.5">
                                     <p className="text-[13px] ">Arun Kumar</p>
                                     <div className="bg-[#e8e4da] text-[10px] font-DM-Sans font-semibold text-gray-600 px-2 py-0.5 rounded-2xl">Today</div>
                                 </div>
                                
                                <div className="flex justify-between">
                                    <div className="flex items-center text-[11px] text-gray-600">
                                     <p>Home Tiffin Service</p>
                                     <LuDot />
                                     <p>Legal & Registration</p>
                                 </div>

                                 <div className="flex  gap-4">
                                     <div className="bg-blue-100 text-[10px] font-DM-Sans font-semibold text-blue-600 px-2 py-0.5 rounded-2xl">On Track</div>
                                     <div className="text-gray-500 border px-1.5 py-1 rounded">
                                        <BiComment />
                                     </div>
                                 </div>
                                
                                </div>

                                <p className="text-[11px] text-gray-500">45%</p>
                                 
                                 
                             </div>
                         </div>

       </div>
    )
}

export default MentorMentees;