"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LiveMatches from "@/components/liveMatch/liveMatches";
import getUserFromToken from "@/utilities/getUserFromToken ";

export default function LiveMatche() {
  //const user = getUserFromToken();
  //console.log(user);
  const user1 = !true;

  return (
    <>
      {user1 ? (
        <DefaultLayout>
          <LiveMatches />
        </DefaultLayout>
      ) : (
        <LiveMatches />
      )}
    </>
  );
}
