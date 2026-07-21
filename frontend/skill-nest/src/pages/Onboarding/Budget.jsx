import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import budgets from "../../data/budgets";
import { useDispatch } from "react-redux";

function Budget() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBudget = async () => {
    try {
      const res = await axios.post(
        "https://localhost:3000/api/onboarding/budget",
        {
          Interest: selectedSkills,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(updateUser(res.data.user));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      stepTitle="STEP 3 OF 4 - INTERESTS"
      title="What's your budget range"
      subtitle="Select your comfortable investment range"
      onBack={() => navigate("/onboarding//interests")}
      onNext={() => navigate("/onboarding/location")}
    >
      <OptionSelector options={budgets} />
    </OnboardingLayout>
  );
}

export default Budget;
