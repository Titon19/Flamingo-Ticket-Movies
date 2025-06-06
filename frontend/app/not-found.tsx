import Image from "next/image";
import NotFoundImage from "@/public/404.png";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-3 min-h-screen w-full justify-center items-center">
      <Image
        src={NotFoundImage}
        alt="404"
        width={500}
        height={300}
        className="bg-muted rounded-lg"
      />
      <h1 className="text-2xl font-bold">
        Page <span className="text-pink-600">Not</span> Found
      </h1>
    </div>
  );
};

export default NotFound;
