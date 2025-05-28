import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Edit2 } from "lucide-react";
import AlertDelete from "../../../components/alert-delete";
import useDelete from "../../../hooks/useDelete";
import { deleteMovie } from "../../../services/movies/movie.service";

interface ActionProps {
  id: string;
}

const ActionColumn = ({
  id,
  onAfterDelete,
}: ActionProps & { onAfterDelete: () => void }) => {
  const { handleDelete } = useDelete(() => deleteMovie(id), onAfterDelete);
  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <Button asChild className="bg-black hover:bg-neutral-700" size={"sm"}>
        <Link to={`/admin/movies/edit/${id}`}>
          <Edit2 />
        </Link>
      </Button>

      <AlertDelete handleDelete={handleDelete} />
    </div>
  );
};

export default ActionColumn;
