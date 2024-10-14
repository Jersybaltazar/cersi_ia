import React from "react";
import SignUpFormProvider from "@/components/forms/sign-up/form-provider";
import RegistrationFormStep from "@/components/forms/sign-up/registration-step";
import ButtonHandler from "@/components/forms/sign-up/button-handler";
import HighLigthBar from "@/components/forms/sign-up/high-ligth-bar";
type Props = {};
const SignUp = (props: Props) => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignUpFormProvider>
          <div className="flex flex-col gap-3">
            <RegistrationFormStep />
            <ButtonHandler />
          </div>
          <HighLigthBar />
        </SignUpFormProvider>
      </div>
    </div>
  );
};

export default SignUp;
