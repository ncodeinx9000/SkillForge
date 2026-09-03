import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import OptionSelector from "../../components/onboarding/OptionSelector";
import locations from "../../data/locations";
import api from "../../lib/axios";
import { updateUser } from "../../redux/userSlice";

function Location() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocation = async () => {
    if (!selectedLocation) {
      return;
    }

    try {
      const res = await api.put(
        "/api/onboarding/location",
        {
          location: selectedLocation,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(updateUser(res.data.user));
      navigate("/learner");
    } catch (error) {
      console.log(error);
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
