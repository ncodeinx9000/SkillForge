import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import skills from "../../data/skills";
import api from "../../lib/axios";


function Skills() {
  const navigate = useNavigate();


  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkills = async () => {
    if (selectedSkills.length === 0) {
      return;
    }

    try {
      const res = await api.put(
        "/onboarding/skills",
        {
          skills: selectedSkills,
        },
      );

      navigate("/onboarding/interests");
    

    } catch (error) {
       console.error(
      "Saving interests failed:",
      error.response?.data || error.message
    );
    }
  };

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={4}
      stepTitle="STEP 1 OF 4 - SKILLS"
      title="What are your main skills"
      subtitle="Select all that apply"
      onBack={() => navigate("/onboarding")}
      onNext={handleSkills}
    >
      <OptionSelector
        options={skills}
        value={selectedSkills}
        onChange={setSelectedSkills}
      />
    </OnboardingLayout>
  );
}

export default Skills;
