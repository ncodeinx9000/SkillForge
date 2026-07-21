import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import locations from "../../data/locations";
import { useDispatch } from "react-redux";

function Location() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLocation = async () => {
    try {
      const res = await axios.post(
        "https://localhost:3000/api/onboarding/location",
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
      currentStep={4}
      totalSteps={4}
      stepTitle="STEP 4 OF 4 - INTERESTS"
      title="Where are you located?"
      subtitle="This helps us show relevant opportunities"
      onBack={() => navigate("/onboarding/budget")}
      onNext={() => navigate("/learner")}
    >
      <OptionSelector options={locations} />
    </OnboardingLayout>
  );
}

export default Location;
