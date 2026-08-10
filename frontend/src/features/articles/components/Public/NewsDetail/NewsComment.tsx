import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MousePointer2 } from "lucide-react";
import { useArticlesHooks } from "@/features/articles/hooks/useArticles";
import { toast } from "sonner";
import CommentItem from "../../CommentUI";

type FormValues = {
  comment: string;
};

function NewsComment({ articleId, articleComments }: any) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { ref, ...rest } = register("comment");

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  const articleHook = useArticlesHooks();
  const commentArticle = articleHook.useCommentPublicArticle();
  const onSubmit = (data: FormValues) => {
    const commentData = { content: data.comment, article_id: articleId };
    commentArticle.mutate(
      { commentData },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Commented successfully");
          reset();
        },
        onError: (err) => {
          toast.error(err?.message || "Something went wrong");
          reset();
        },
      },
    );

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };
  const [visibleComments, setVisibleComments] = useState(2);
  return (
    <div className=" w-full flex justify-center">
      <div className="flex flex-col gap-6 justify-between bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 w-full shadow-sm">
        <p className="font-semibold text-lg text-slate-800">
          Comments
        </p>
        <div className="space-y-4">
          {articleComments?.slice(0, visibleComments).map((comment: any) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={0}
              module="public"
              articleId={articleId}
            />
          ))}

          <div className="flex justify-end gap-4">
            {visibleComments > 2 && (
              <button
                type="button"
                onClick={() => setVisibleComments(2)}
                className="cursor-pointer text-slate-500 hover:text-slate-700 text-sm"
              >
                Show less
              </button>
            )}
            {articleComments?.length > visibleComments && (
              <button
                type="button"
                onClick={() => setVisibleComments((prev) => prev + 2)}
                className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Show more
              </button>
            )}
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-200/60" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4 items-end w-full border border-slate-200/60 rounded-3xl p-4 md:p-6 shadow-sm">
            <textarea
              rows={1}
  {...rest}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  }}              ref={(e) => {
                ref(e);
                textareaRef.current = e;
              }}
              onInput={handleInput}
              placeholder="Write a comment..."
              className="w-full resize-none overflow-hidden bg-transparent text-slate-800 placeholder:text-slate-400 p-2 outline-none"
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors duration-200 shrink-0"
            >
              <MousePointer2 className="rotate-90" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsComment;
