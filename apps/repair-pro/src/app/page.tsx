import { ConfirmationModalPopup } from "@/components/ConfirmationModal";
import RPLanding from "./contentPage";

export default async function Page() {
  return (
    <>
      <RPLanding />

      <ConfirmationModalPopup />
    </>
  );
}
