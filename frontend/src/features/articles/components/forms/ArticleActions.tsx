import { Button } from "@/components/ui/button";

type Props = {
  isPending: boolean;
  buttonText: string;
  onCancel: () => void;
};

function ArticleActions({
  isPending,
  buttonText,
  onCancel,
}: Props) {
  return (
    <div className="flex justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        variant="submit"
        disabled={isPending}
      >
        {buttonText}
      </Button>
    </div>
  );
}
export default ArticleActions;