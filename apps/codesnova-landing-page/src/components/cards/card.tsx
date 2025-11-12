// import Image from "next/image";

export const Card = ({
  title,
  description,
  image,
  color,
  svg,
}: {
  title: string;
  description: string;
  image?: string;
  color?: string;
  svg?: string | React.ReactNode;
}) => {
  return (
    <>
      <div className="card relative min-w-64 cursor-pointer bg-custom-teal/20 border-transparent hover:border-custom-teal border-2 p-6 rounded-2xl shadow-md hover:shadow-xl  transition-all duration-300 hover:!blur-none hover:!opacity-100">
        <div>
          {image ? (
            <img
              src={image}
              alt={title}
              width={50}
              height={50}
              color={color}
              className="bg-black/20 text-white p-2 rounded-lg"
            />
          ) : null}
          {svg ? <svg /> : null}
        </div>
        <h3 className="text-xl font-semibold text-white mt-4 uppercase">{title}</h3>
        <p className="text-white/45 mt-2 text-justify">{description}</p>
      </div>
      <style jsx>{`
        .group:has(.card:hover) .card {
          filter: blur(2px);
          opacity: 0.8;
          transform: scale(0.95);
        }

        .group:has(.card:hover) .card:hover {
          filter: none;
          opacity: 1;
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};
