import Image from "next/image";

export const BrowserComponent = () => {
  return (
    <div className="group relative mt-14">
      <div className="lg:-top-8 -translate-x-1/2 absolute top-2 left-1/2 mx-auto h-24 w-[90%] transform rounded-full blur-3xl lg:h-80 shadow-lg" />

      {/* Browser Navigation Bar */}
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="flex h-10 items-center rounded-t-lg bg-white px-4">
          {/* Traffic Light Buttons */}
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          {/* URL Bar */}
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 w-1/3">
            <div className="flex h-6 items-center justify-center rounded-md bg-secondary/50 px-3">
              <div className="text-muted-foreground text-xs">{"Repair PRO"}</div>
            </div>
          </div>
        </div>
      </div>

      <Image
        width={1200}
        height={1200}
        className="relative mx-auto max-w-5xl flex w-full items-center rounded-b-lg "
        src={"/images/repairPro.png"}
        alt="dashboard"
      />

      {/* <div className="absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b from-background/0 via-background/50 to-background md:h-28" /> */}
    </div>
  );
};
