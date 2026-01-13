interface CommentSectionProps {
  comments: string[];
  newComment: string;
  onCommentChange: (value: string) => void;
  onAddComment: () => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  newComment,
  onCommentChange,
  onAddComment
}) => {
  return (
    <div className="border-t border-stone-200 pt-6">
      <h3 className="text-sm font-medium text-stone-700 mb-4">Notes</h3>
      
      {comments.length > 0 && (
        <div className="space-y-2 mb-4">
          {comments.map((comment, idx) => (
            <div key={idx} className="bg-amber-50 p-3 rounded-lg border border-amber-200">
              <p className="text-sm text-stone-700">{comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Add a note..."
          className="flex-1 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && onAddComment()}
        />
        <button
          onClick={onAddComment}
          className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
};