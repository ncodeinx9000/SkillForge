import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

function OptionSelector({ options }) {
  const [showAll, setShowAll] = useState(false);

  const displayedOptions = showAll ? options : options.slice(0, 10);

  const [selectedOptions, setselectedOptions] = useState([]);

  const handleSkillClick = (option) => {
    if (selectedOptions.includes(option)) {
      setselectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setselectedOptions([...selectedOptions, option]);
    }
  };
  return (
    <>
      <div className="grid grid-cols-2">
        {displayedOptions.map((option, index) => (
          <button
            onClick={() => handleSkillClick(option)}
            key={index}
            className={`flex items-center gap-3 font-DM-Sans font-semibold m-2 px-5 py-5 rounded-2xl ${selectedOptions.includes(option) ? "bg-[#ecc5aed0] border-2 border-[#c4622a]" : "bg-[#fff]"}`}
          >
            <FaCircleCheck
              className={`${selectedOptions.includes(option) ? "text-[#c4622a]" : "text-white"}`}
            />
            {option}
          </button>
        ))}
      </div>
      ;
      {!showAll && (
        <div onClick={() => setShowAll(true)} className="flex justify-end mt-3">
          <button className="text-[13px] text-[#c4622a] font-DM-Sans font-semibold hover:underline">
            More Options +
          </button>
        </div>
      )}
    </>
  );
}

export default OptionSelector;
