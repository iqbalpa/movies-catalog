import React from 'react';
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
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

interface IMyAlertDialog {
  movieId: number;
  handleDelete: (id: number) => void;
}

const MyAlertDialog: React.FC<IMyAlertDialog> = ({ movieId, handleDelete }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md p-1 duration-150 hover:cursor-pointer hover:bg-red-500 hover:bg-opacity-40 hover:text-red-500">
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(movieId)}
            className="bg-red-500 hover:bg-red-500 hover:bg-opacity-85"
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MyAlertDialog;
