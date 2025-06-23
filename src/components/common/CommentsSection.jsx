import { useRef, useState } from "react";
import { imageAPI } from "../../api/api";
import { MdMoreVert } from "react-icons/md";
import { useClickOutside } from "../../hooks/useClickOutside";

const CommentsSection = ({ imageData }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(imageData?.comments || []);

  // Create a new comment
  const handlePostComment = async () => {
    try {
      const response = await imageAPI.addComment(
        imageData.albumId,
        imageData._id,
        {
          comment: newComment,
        }
      );
      if (response.status === 200) {
        setComments(response.data?.commented?.comments);
        setNewComment("");
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  return (
    <div className="bg-white p-6 space-y-4 border-l-4 border-blue-100 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Comments
        {comments?.length > 0 ? ` (${comments.length})` : ""}
      </h3>
      <div className="space-y-4">
        {comments?.map((comment, index) => (
          <div
            key={`comment ${index}`}
            className="flex space-x-3 p-3 hover:bg-gray-50 transition-colors"
          >
            {/* <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
              {index}
            </div> */}
            <div className="flex-1">
              {/* <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-900">User {index}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{index * 2}h ago</span>
              </div> */}
              <p className="text-gray-700 mt-1">{comment}</p>
            </div>
            <div>
              <MdMoreVert />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <textarea
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write a comment..."
          rows="3"
          value={newComment}
        />
        <button
          onClick={handlePostComment}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
