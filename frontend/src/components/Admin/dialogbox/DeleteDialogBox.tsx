import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function DeleteDialogBox({deleteOpen, setDeleteOpen, selectedField, deleteField}:any)
{
return(
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button
              variant="submit"
              className="bg-gray-500 hover:bg-gray-700 border-gray-100"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="submit"
              className="bg-red-500 hover:bg-red-700 border-gray-100"
              disabled={deleteField?.isPending}
              onClick={() => {
                if (!selectedField) return;

                deleteField.mutate(selectedField?.id, {
                  onSuccess: (res) => {
                    toast.success(res.message);
                    setDeleteOpen(false);
                    selectedField(null);
                  },
                });
              }}
            >
              {deleteField?.isPending?"Deleting...":"Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
)
}
export default DeleteDialogBox