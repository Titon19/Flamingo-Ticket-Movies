import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash2 } from "lucide-react";

type ActionProps = {
  handleDelete: () => void;
};

const AlertDelete = ({ handleDelete }: ActionProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="py-1 bg-red-500 hover:bg-red-400 text-white cursor-pointer px-2 rounded-sm transition-colors duration-100 ease-in-out">
        <Trash2 className="w-5 h-5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete this data?
          </AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this data, you will not be able to recover it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDelete;
