// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const TranslucentButton = ({
  title,
  onClick,
  bold,
  link,
  className,
  children,
}: {
  title?: string;
  onClick?: () => void;
  bold?: boolean;
  link?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  const handleClick = () => {
    if (link) {
      window.location.href = link;
    } else if (onClick) {
      onClick?.();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={`rounded-full w-fit items-center flex flex-row p-4 border border-gray-100/35 bg-gray-100/10 shadow-black/2 shadow-sm md:backdrop-blur-sm text-white  hover:bg-gray-100/20 duration-200 transition-all ${bold && "font-bold"} ${className} ${link || onClick ? " cursor-pointer" : ""}`}
    >
      <span>{title}</span>

      {children}
    </div>
  );
};
