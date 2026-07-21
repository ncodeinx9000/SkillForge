import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import skills from "../../data/skills";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice";

function Skills() {
  try {
    const handleSkills = async () => {
      const res = await api.post("/onboard/skills", [skills], {
        withCredentials: true,
      });

      dispatch(updateUser(res.data.user));
    };
  } catch (error) {}

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={4}
      stepTitle="STEP 1 OF 4 - INTERESTS"
      title="What are your main skills"
      subtitle="Select all that apply"
      onBack={() => navigate("/onboarding")}
      onNext={() => navigate("/onboarding/interests")}
    >
      <OptionSelector options={skills} />
    </OnboardingLayout>
  );
}

export default Skills;
