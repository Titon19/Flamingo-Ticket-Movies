import BrowseGenre from "../../components/Customer/Home/BrowseGenre";
import CardHorizontal from "../../components/Customer/CardHorizontal/CardHorizontal";
import { CarouselMovies } from "../../components/Customer/Home/CarouselMovies";
import Navbar from "../../components/Customer/Navbar";
import CardVertical from "../../components/Customer/CardVertical/CardVertical";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-9 min-h-screen">
        <CarouselMovies />
        <BrowseGenre />
        <CardHorizontal />
        <CardVertical />
      </div>
    </div>
  );
};

export default Home;
