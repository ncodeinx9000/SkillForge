import { useState } from "react";
import { useNavigate } from "react-router-dom";


import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import locations from "../../data/locations";
import api from "../../lib/axios";

function Location() {
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocation = async () => {
    if (!selectedLocation) {
      return;
    }

    try {
      const res = await api.put(
        "/onboarding/location",
        {
          location: selectedLocation,
        },
      );

      navigate("/learner/dashboard");
    

    } catch (error) {
      console.error(
      "Saving location failed:",
      error.response?.data || error.message
      );
    }
  };

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={4}
      stepTitle="STEP 4 OF 4 - LOCATION"
      title="Where are you located?"
      subtitle="This helps us show relevant opportunities"
      onBack={() => navigate("/onboarding/budget")}
      onNext={handleLocation}
    >
      <OptionSelector
        options={locations}
        value={selectedLocation}
        onChange={setSelectedLocation}
        multiple={false}
      />
    </OnboardingLayout>
  );
}

export default Location;
