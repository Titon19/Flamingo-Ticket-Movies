import { useLoaderData } from "react-router-dom";
import type { Genre } from "../../../services/genres/genre.type";

const BrowseGenre = () => {
  const { genres } = useLoaderData() as { genres: Genre[] };

  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-md md:text-lg lg:text-xl font-bold">Browse Genre</h1>
      <div className="flex gap-3 overflow-x-auto md:text-base text-sm">
        <button className=" bg-pink-600 text-black border-2 border-pink-600 hover:border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer p-2 px-3 rounded-full">
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre._id}
            className="bg-neutral-800 border-2 hover:border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer p-2 px-3 rounded-full"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BrowseGenre;
