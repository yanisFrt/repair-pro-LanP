import { ConfirmationModalPopup } from "@/components/ConfirmationModal";
import RPLanding from "./contentPage";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <RPLanding />

      <Suspense>
        <ConfirmationModalPopup />
      </Suspense>
    </>
  );
}
