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
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const DeleteDialog = ({
  onDelete,
  id,
  isPending,
}: {
  onDelete: (id: string) => void;
  id: string;
  isPending: boolean;
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        isPending={isPending}
        className="rounded-full bg-red-600 hover:bg-red-500"
        size={"icon"}
      >
        <Trash2 />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirmation Delete</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your data
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => onDelete(id)}
          className="bg-red-600 hover:bg-red-500 cursor-pointer"
        >
          <Trash2 />
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteDialog;
