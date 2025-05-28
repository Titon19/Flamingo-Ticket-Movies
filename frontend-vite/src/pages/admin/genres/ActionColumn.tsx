import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { Edit2 } from "lucide-react";
import AlertDelete from "../../../components/alert-delete";
import useDelete from "../../../hooks/useDelete";
import { deleteGenre } from "../../../services/genres/genre.service";

interface ActionProps {
  id: string;
}

const ActionColumn = ({
  id,
  onAfterDelete,
}: ActionProps & { onAfterDelete: () => void }) => {
  const { handleDelete } = useDelete(() => deleteGenre(id), onAfterDelete);

  return (
    <div className="flex gap-2">
      <Button asChild className="bg-black hover:bg-neutral-700" size={"sm"}>
        <Link to={`/admin/genres/edit/${id}`}>
          <Edit2 />
        </Link>
      </Button>
      <AlertDelete handleDelete={handleDelete} />
    </div>
  );
};

export default ActionColumn;
