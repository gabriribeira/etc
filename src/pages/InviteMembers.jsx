import React from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import AddMembers from "./AddMembers";
import Button from "../components/common/Button";
import { useCreateRequestMutation, useGetHouseholdQuery } from "../app/api";
import { useSelector } from "react-redux";
import Image from "../assets/imgs/etc/logo_dots.png";

const InviteMembers = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: household } = useGetHouseholdQuery();
  const [createRequest] = useCreateRequestMutation();
  const [members, setMembers] = React.useState([]);
  const [step, setStep] = React.useState(0);

  const handleInviteMembers = async () => {
    try {
      await Promise.all(
        members.map((userId) =>
          createRequest({
            householdId: household.data.id,
            userId: userId.id,
            type: "invite",
          }).unwrap()
        )
      );
      setStep(1);
    } catch (error) {
      console.error("Error inviting members:", error);
    }
  };

  return (
    <div className="relative bg-white min-h-screen">
      <TopBar />
      {step === 0 && (
        <main className="pt-32">
          <form className="flex flex-1 flex-col w-full h-auto justify-between px-5">
            <div className="flex flex-col gap-y-3">
              <h2 className="text-lg font-semibold text-black">
                Invite Members
              </h2>
              <p className="text-base text-black50 font-medium">
                Invite some members to join your household.
              </p>
            </div>
            <div className="flex flex-col w-full gap-y-6 h-auto">
              <AddMembers
                authUser={user}
                authHousehold={household}
                members={members}
                setMembers={setMembers}
                invite={true}
              />
            </div>
          </form>
          <div className="h-full my-6 px-5">
            <Button
              label="Next"
              action={handleInviteMembers}
            />
          </div>
        </main>
      )}
      {step === 1 && (
        <main className="pt-32">
          <div className="flex flex-col gap-y-4 mt-6 h-full">
            <div className="flex flex-col gap-y-5">
              <img
                src={Image}
                alt="Household"
                className="w-[150px] h-[150px] rounded-full m-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-y-5">
              <p className="text-lg font-semibold">Requests Sent!</p>
              <p className="text-black50 w-[90%] text-center">
                Your requests have been sent to the selected members. They will be able to join your household once they accept the invitation.
              </p>
            </div>
            <div className="px-5 w-full">
              <Button to="/household" label="Return to Household" />
            </div>
          </div>
        </main>
      )}
      <BottomBar />
    </div>
  );
};

export default InviteMembers;