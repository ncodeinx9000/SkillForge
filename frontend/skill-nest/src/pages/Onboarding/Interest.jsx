import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import businessInterests from "../../data/businessInterests";
import api from "../../lib/axios";
import { updateUser } from "../../redux/userSlice";

function Interest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterest = async () => {
    if (selectedInterests.length === 0) {
      return;
    }

    try {
      const res = await api.put(
        "/api/onboarding/interests",
        {
          interests: selectedInterests,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(updateUser(res.data.user));
      navigate("/onboarding/budget");
    } catch (error) {
      console.log(error);
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
