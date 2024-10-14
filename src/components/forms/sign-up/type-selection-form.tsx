import { FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./use-type-card";
type Props = {
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};
const TypeSelectionForm = ({ register, setUserType, userType }: Props) => {
  return (
    <>
      <h2 className="tex-gravel md:text-4xl font-bold">Crea una cuenta</h2>
      <p className="text-iridium md:text-sm">
        Cuentanos sobre ti! ¿a que te dedicas ? vamos a personalizar 
        <br />
        tu experiencia para que se adapte mejor a ti.
      </p>
      <UserTypeCard
      register={register}
      setUserType={setUserType}
      userType={userType}
      value="owner"
      title='Tengo una empresa o Negocio'
      text="Configurar una cuenta para mi empresa"
      />
      <UserTypeCard
      register={register}
      setUserType={setUserType}
      userType={userType}
      value="student"
      title='Soy estudiante'
      text="Busco aprender sobre la herramienta"
      />
    </>
  );
};

export default TypeSelectionForm;
