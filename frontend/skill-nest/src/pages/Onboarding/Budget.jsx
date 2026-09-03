import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import budgets from "../../data/budgets";
import api from "../../lib/axios";
import { updateUser } from "../../redux/userSlice";

function Budget() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedBudget, setSelectedBudget] = useState("");

  const handleBudget = async () => {
    if (!selectedBudget) {
      return;
    }

    try {
      const res = await api.put(
        "/api/onboarding/budget",
        {
          budget: selectedBudget,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(updateUser(res.data.user));
      navigate("/onboarding/location");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={4}
      stepTitle="STEP 3 OF 4 - BUDGET"
      title="What's your budget range"
      subtitle="Select your comfortable investment range"
      onBack={() => navigate("/onboarding/interests")}
      onNext={handleBudget}
    >
      <OptionSelector
        options={budgets}
        value={selectedBudget}
        onChange={setSelectedBudget}
        multiple={false}
      />
    </OnboardingLayout>
  );
}

export default Budget;
