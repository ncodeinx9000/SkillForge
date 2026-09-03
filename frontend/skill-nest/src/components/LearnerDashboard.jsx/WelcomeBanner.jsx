import { MdArrowRightAlt } from "react-icons/md";

function WelcomeBanner(){

    return (
        <div className="bg-[#1e3a1e] text-white rounded-2xl px-6 py-6 mb-4">
                  <p className="text-[#a1a1aa] font-DM-Sans text-[15px]">
                    Welcome back,
                  </p>
                  <h3 className="font-Outfit font-bold text-[27px] mb-1.5">
                    Kavitha Menon👋
                  </h3>
                  <div className="flex gap-2 items-center font-DM-Sans text-[12px] text-[#ececf0] mb-3">
                    <p className="bg-[#4d744d91] px-2 py-0.5 rounded-xl">
                      Cooking & Food Prep
                    </p>
                    <p className="bg-[#4d744d91] px-2 py-0.5 rounded-xl">
                      Retail & Trading
                    </p>
                  </div>
                  <p className="text-[14px] text-[#a1a1aa] mb-4">
                    Roadmap: <span className="text-[#c4622a]">49% complete</span> ·
                    Budget:
                    <span className="text-[#c4622a]">Rs.5,000 to 20,000</span> ·{" "}
                    <span className="text-[#c4622a]">Thrissur, Kerala</span>
                  </p>
                  <div className="flex gap-4 items-center text-[14px]  text-white font-DM-Sans">
                    <div className="flex gap-1.5 items-center bg-[#c4622a] px-4 py-2 rounded-2xl">
                      <p>Continue Roadmap </p>
                      <MdArrowRightAlt />
                    </div>
                    <div className="border-1 border-gray-400 px-2.5 py-1 rounded-xl">
                      Browse Ideas
                    </div>
                  </div>
                </div>
    )
}

export default WelcomeBanner;