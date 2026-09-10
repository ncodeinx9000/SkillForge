import { useState } from "react";
import { useNavigate } from "react-router-dom";


import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import budgets from "../../data/budgets";
import api from "../../lib/axios";

function Budget() {
  const navigate = useNavigate();


  const [selectedBudget, setSelectedBudget] = useState("");

  const handleBudget = async () => {
    if (!selectedBudget) {
      return;
    }

    try {
      const res = await api.put(
        "/onboarding/budget",
        {
          budget: selectedBudget,
        },
      );

      navigate("/onboarding/location");
    

    } catch (error) {
       "Saving budget failed:",
      error.response?.data || error.message
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
