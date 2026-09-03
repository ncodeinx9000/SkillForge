import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import skills from "../../data/skills";
import api from "../../lib/axios";
import { updateUser } from "../../redux/userSlice";

function Skills() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkills = async () => {
    if (selectedSkills.length === 0) {
      return;
    }

    try {
      const res = await api.put(
        "/api/onboarding/skills",
        {
          skills: selectedSkills,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(updateUser(res.data.user));
      navigate("/onboarding/interests");
    } catch (error) {
      console.log(error);
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
