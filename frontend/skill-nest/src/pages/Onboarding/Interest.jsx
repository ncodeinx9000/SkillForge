import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import businessInterests from "../../data/businessInterests";
import api from "../../lib/axios";

function Interest() {
  const navigate = useNavigate();

  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterest = async () => {
    if (selectedInterests.length === 0) {
      return;
    }

    try {
      const res = await api.put(
        "/onboarding/interests",
        {
          interests: selectedInterests,
        },
      );

      navigate("/onboarding/budget");
    

    } catch (error) {
      console.error(
      "Saving budget failed:",
      error.response?.data || error.message
    );
    }
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      stepTitle="STEP 2 OF 4 - INTERESTS"
      title="What are your main interests"
      subtitle="Select all that apply"
      onBack={() => navigate("/onboarding/skills")}
      onNext={handleInterest}
    >
      <OptionSelector
        options={businessInterests}
        value={selectedInterests}
        onChange={setSelectedInterests}
      />
    </OnboardingLayout>
  );
}

export default Interest;
