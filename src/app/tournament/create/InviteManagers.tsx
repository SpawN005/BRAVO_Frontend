import { useTournamentStore } from "@/app/store/zustand";
import FormInput from "@/components/DefaultInput/FormInput";
import React from "react";
import { useForm } from "react-hook-form";
import touramentsService from "@/app/service/tournament/tournamentsService";
import { useRouter } from "next/navigation";

const InviteManagers = ({ onNextStep, onPrevStep }: any) => {
  const router = useRouter();

  const { tournament, updateTournament, resetTournament } =
    useTournamentStore();
  console.log(tournament);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data: any) => {
    const updatedTournament = { ...tournament, ...data };

    try {
      const res = await touramentsService.CreateTournament(updatedTournament);

      resetTournament();

      router.push(`/tournament/manage/${res._id}`);
    } catch (error) {
      console.error("Error creating tournament:", error);
    }
  };

  const cardHeight = 128 + tournament?.rules?.nbTeams * 48;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex w-1/3 flex-col justify-center space-y-8 rounded-lg border border-slate-400 p-4 h-[${cardHeight}px]`}
    >
      <h1 className="text-2xl font-bold text-black">Invite Managers</h1>
      <h2>Share Via Email</h2>
      {[...Array(tournament?.rules?.nbTeams)].map((_, index) => (
        <FormInput
          key={index}
          placeholder={`Team ${index + 1} Manager Email`}
          {...register(`managerEmails[${index}]`, {
            required: `Email for Team ${index + 1} is required`,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
      ))}
      {errors.managerEmails &&
        errors.managerEmails.map((error, index) => (
          <p key={index} className="text-red-500">
            {error.message}
          </p>
        ))}
      <div className="flex w-full justify-between">
        <button
          onClick={onPrevStep}
          className="mt-2 h-12 w-20 rounded-md bg-green-500 font-semibold text-white"
        >
          Previous
        </button>
        <button
          type="submit"
          className={`mt-2 h-12 w-20 rounded-md font-semibold text-white transition-colors delay-150 duration-300 ease-in-out ${
            isValid ? "bg-green-500" : "bg-neutral-400"
          }`}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InviteManagers;
