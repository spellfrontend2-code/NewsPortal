import {
  ChevronDown,
  ChevronUp,
  Clock,
  MessageCircle,
  MousePointer2,
  Trash2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useArticlesHooks } from "../hooks/useArticles";
import { getAvatarColor } from "@/components/shared/getAvatarColor";

type ReplyFormValues = {
  reply: string;
};

/* ─── Inline reply box ─── */
function ReplyBox({
  articleId,
  onClose,
  comment,
  setExpanded
}: {
  articleId: number;
  onClose: () => void;
  avatarColor: string;
  comment: any;
}) {
  const { register, handleSubmit, reset } = useForm<ReplyFormValues>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, ...rest } = register("reply", { required: true });

  const articleHook = useArticlesHooks();
  const commentArticle = articleHook.useCommentPublicArticle();

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const onSubmit = (data: ReplyFormValues) => {
    if (!data.reply.trim()) return;
    const commentData = {
      content: data.reply,
      article_id: articleId,
      parent_id: comment?.id,
    };
    commentArticle.mutate(
      { commentData },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Reply posted successfully");
          reset();
          if (textareaRef.current) textareaRef.current.style.height = "auto";
          setExpanded(true);
          onClose();
        },
        onError: (err: any) => {
          toast.error(err?.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <div className="mt-2 animate-in slide-in-from-top-2 fade-in duration-200">
      <div className="flex gap-3 items-start">
        {/* Left accent line */}
        <div className="w-0.5 bg-indigo-200 rounded-full self-stretch ml-3" />

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <div className="flex gap-3 items-end w-full border border-indigo-200 bg-indigo-50/40 rounded-2xl px-4 py-3 shadow-sm focus-within:border-indigo-400 focus-within:bg-white transition-all duration-200">

            <div className="flex-1">
              {comment?.author_name && (
                <p className="text-[10px] font-semibold text-indigo-400 mb-1">
                  Replying to
                  <span className="text-indigo-600">@{comment.author_name}</span>
                </p>
              )}
              <textarea
                rows={1}
                {...rest}
                ref={(e) => {
                  ref(e);
                  textareaRef.current = e;
                }}
                onInput={handleInput}
                placeholder={`Reply to ${comment?.author_name ?? "comment"}…`}
                autoFocus
                className="w-full resize-none overflow-hidden bg-transparent text-slate-800 text-sm placeholder:text-slate-400 outline-none leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors duration-150"
                title="Cancel"
              >
                <X size={14} />
              </button>
              <button
                type="submit"
                disabled={commentArticle.isPending}
                className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white p-2 rounded-xl transition-colors duration-200 shrink-0"
                title="Post reply"
              >
                <MousePointer2 size={14} className="rotate-90" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Comment item ─── */
function CommentItem({
  comment = [],
  depth = 0,
  module = "admin",
  articleId,
}: {
  comment: any;
  depth?: number;
  module?: "admin" | "public";
  articleId?: number;
}) {
  const avatarColor= getAvatarColor(comment?.user_id) ?? "bg-indigo-500";
  const initials = comment.author_name
    ? comment.author_name.slice(0,1).toUpperCase()
    : "??";
  const articleHook = useArticlesHooks();
  const deleteAdminComment = articleHook.useAdminCommentDelete();
  const deletePublicComment = articleHook.usePublicCommentDelete();

  const [expanded, setExpanded] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const handleDelete = (id: number) => {
    if (module === "admin") {
      deleteAdminComment.mutate(id, {
        onSuccess: (res) =>
          toast.success(res?.message || "Comment deleted successfully"),
        onError: (err) => toast.error(err?.message || "Something went wrong"),
      });
    } else {
      deletePublicComment.mutate(id, {
        onSuccess: (res) =>
          toast.success(res?.message || "Comment deleted successfully"),
        onError: (err) => toast.error(err?.message || "Something went wrong"),
      });
    }
  };


  const hasReplies = comment.replies && comment.replies.length > 0;

  // Only allow reply on root-level comments (depth 0) in public module
  const canReply = module === "public" && depth === 0;
  return (
    <div className={`flex gap-3 ${depth > 0 ? "ml-8 mt-3" : ""}`}>
      {/* Avatar column */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div
          className={`flex items-center justify-center rounded-full font-bold text-white text-xs select-none
          h-9 w-9 bg-gradient-to-tr ${avatarColor}`}
        >
          {comment.author_avatar ? (
            <img
              src={comment.author_avatar}
              alt={comment.author_name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        {/* Thread line */}
        {(hasReplies && expanded) || showReply ? (
          <div className="w-px flex-1 bg-slate-100 mt-1 min-h-[12px]" />
        ) : null}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          {/* Header row */}
          <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-800">
                {comment.author_name ?? "Anonymous"}
              </span>
              {depth === 0 && (
                <span className="text-[10px] text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">
                  #{comment.id}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
             

              {/* Action buttons */}
              <div className="flex items-center gap-1.5">
                {module === "public" && (
                  <>
                    {/* Reply — only on root comments */}
                    {canReply && (
                      <button
                        onClick={() => setShowReply((v) => !v)}
                        title="Reply"
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer
                          ${
                            showReply
                              ? "border-indigo-300 bg-indigo-100 text-indigo-700"
                              : "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                          }`}
                      >
                        <MessageCircle size={12} />
                        <span className="hidden sm:inline">
                          {showReply ? "Cancel" : "Reply"}
                        </span>
                      </button>
                    )}
</>
                   
                )}

                {module === "admin" && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    disabled={
                      deleteAdminComment.isPending ||
                      deletePublicComment.isPending
                    }
                    title="Delete comment"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-medium transition-all duration-150 disabled:opacity-50 cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Comment text */}
          <p className="text-sm text-slate-700 leading-relaxed break-words">
            {comment.content}
          </p>

          {/* Footer stats */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock size={11} />
                {new Date(comment.created_at).toLocaleString()}
              </span>
            {hasReplies && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="ml-auto flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors duration-150 cursor-pointer"
              >
                {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                {comment.replies.length}
                {comment.replies.length === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>
        </div>

        {/* ── Inline reply box ── */}
        {showReply && articleId && (
          <ReplyBox
            articleId={articleId}
            onClose={() => setShowReply(false)}
            avatarColor={avatarColor}
            comment={comment}
            setExpanded={setExpanded}
          />
        )}

        {/* ── Nested replies ── */}
        {hasReplies && expanded && (
          <div className="mt-2 flex flex-col gap-2">
            {comment.replies.map((reply: any) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                depth={depth + 1}
                module={module}
                articleId={articleId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
