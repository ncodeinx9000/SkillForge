import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import businessInterests from "../../data/businessInterests";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice";

function Interest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInterest = async () => {
    try {
      const res = await axios.post(
        "https://localhost:3000/api/onboarding/interest",
        {
          Interest: selectedSkills,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(updateUser(res.data.user));
    } catch (error) {}
  };
  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      stepTitle="STEP 2 OF 4 - INTERESTS"
      title="What are your main interests"
      subtitle="Select all that apply"
      onBack={() => navigate("/onboarding/skills")}
      onNext={() => navigate("/onboarding/budget")}
    >
      <OptionSelector options={businessInterests} />
    </OnboardingLayout>
  );
}

export default Interest;
