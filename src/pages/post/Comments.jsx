// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
// import { IoShareSocialOutline } from "react-icons/io5";
// import { LuMessageCircle } from "react-icons/lu";

// const Comment = ({ comment, loadNestedComments }) => {
//   const [nestedComments, setNestedComments] = useState([]);
//   const [showNested, setShowNested] = useState(false);
//   const [isReplyVisible, setIsReplyVisible] = useState(false);
//   const [reply, setReply] = useState("");

//   const handleLoadNestedComments = async () => {
//     const response = await loadNestedComments(comment._id);
//     setNestedComments(response.data);
//     setShowNested(true);
//   };

//   const handleReplySubmit = async () => {
//     // Handle reply submit logic
//     console.log("Reply submitted:", reply);
//     setIsReplyVisible(false);
//     setReply("");
//   };

//   return (
//     <div
//       style={{ marginLeft: comment.parentComment ? 20 : 0 }}
//       className="border-b border-gray-300 py-2"
//     >
//       <div className="flex items-center justify-between">
//         <div>{comment.comment}</div>
//         <div className="flex items-center gap-2">
//           <TbArrowBigUp className="cursor-pointer" />
//           <span>{comment.likes.length}</span>
//           <TbArrowBigDown className="cursor-pointer" />
//           <IoShareSocialOutline className="cursor-pointer" />
//           <LuMessageCircle
//             className="cursor-pointer"
//             onClick={() => setIsReplyVisible(!isReplyVisible)}
//           />
//         </div>
//       </div>
//       <div className="flex items-center gap-2 mt-2">
//         {nestedComments.length > 0 && !showNested && (
//           <button onClick={handleLoadNestedComments} className="text-blue-500">
//             Load more comments
//           </button>
//         )}
//       </div>
//       {isReplyVisible && (
//         <div className="mt-2">
//           <textarea
//             onChange={(e) => setReply(e.target.value)}
//             rows={3}
//             className="w-full border border-gray-400 rounded-lg p-2"
//             placeholder="Write a reply..."
//           />
//           <button
//             onClick={handleReplySubmit}
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full"
//           >
//             Submit
//           </button>
//         </div>
//       )}
//       {nestedComments.map((nestedComment) => (
//         <Comment
//           key={nestedComment._id}
//           comment={nestedComment}
//           loadNestedComments={loadNestedComments}
//         />
//       ))}
//     </div>
//   );
// };

// const Comments = ({ id }) => {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       // Dummy data
//       const response = {
//         data: [
//           {
//             _id: 1,
//             comment: "This is a comment",
//             parentComment: null,
//             likes: [{ user: 123 }, { user: 213 }],
//           },
//           {
//             _id: 2,
//             comment: "This is another comment",
//             parentComment: null,
//             likes: [
//               { user: 123 },
//               { user: 213 },
//               { user: 1234 },
//               { user: 2413 },
//             ],
//           },
//         ],
//       };
//       setComments(response.data);
//     };

//     fetchComments();
//   }, [id]);

//   const loadNestedComments = async (parentId) => {
//     // Dummy data for nested comments
//     return {
//       data: [
//         {
//           _id: 3,
//           comment: "This is a nested comment",
//           parentComment: 1,
//           likes: [{ user: 123 }, { user: 213 }],
//         },
//       ],
//     };
//   };

//   return (
//     <div>
//       {comments.map((comment) => (
//         <Comment
//           key={comment._id}
//           comment={comment}
//           loadNestedComments={loadNestedComments}
//         />
//       ))}
//     </div>
//   );
// };

// export default Comments;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import { IoShareSocialOutline } from "react-icons/io5";
import { LuMessageCircle } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const Comment = ({
  comment,
  loadNestedComments,
  onLike,
  onReply,
  currentUserId,
}) => {
  const [nestedComments, setNestedComments] = useState([]);
  const [showNested, setShowNested] = useState(false);
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [reply, setReply] = useState("");
  const [isLiked, setIsLiked] = useState(
    comment.likes.some((like) => like.user === currentUserId)
  );
  const [likeCount, setLikeCount] = useState(comment.likes.length);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadNestedComments = async () => {
    setIsLoading(true);
    try {
      const response = await loadNestedComments(comment._id);
      setNestedComments(response.data);
      setShowNested(true);
    } catch (error) {
      console.error("Failed to load nested comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplySubmit = async () => {
    if (!reply.trim()) return;

    try {
      await onReply(comment._id, reply);

      // If replies are already shown, fetch the updated list
      if (showNested) {
        const response = await loadNestedComments(comment._id);
        setNestedComments(response.data);
      } else {
        // Otherwise just increment the count
        setShowNested(true);
        handleLoadNestedComments();
      }

      setIsReplyVisible(false);
      setReply("");
    } catch (error) {
      console.error("Failed to submit reply:", error);
    }
  };

  const handleLike = async () => {
    try {
      await onLike(comment._id);
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  return (
    <div
      className="border-l-2 border-gray-200 pl-4 my-4"
      style={{ marginLeft: comment.parentComment ? 16 : 0 }}
    >
      <div className="bg-gray-50 p-3 rounded-lg">
        {/* Comment header with user info */}
        <div className="flex items-center mb-2">
          {comment.user.profilePicture ? (
            <img
              src={comment.user.profilePicture}
              alt={comment.user.username}
              className="w-8 h-8 rounded-full mr-2"
            />
          ) : (
            <FaUserCircle className="w-8 h-8 text-gray-400 mr-2" />
          )}
          <div>
            <div className="font-medium text-sm text-blue-600">
              u/{comment.user.username}
            </div>
            <div className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>

        {/* Comment body */}
        <div className="text-gray-800 mb-2">{comment.comment}</div>

        {/* Comment actions */}
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <div
            className={`flex items-center mr-4 cursor-pointer ${
              isLiked ? "text-orange-500" : ""
            }`}
            onClick={handleLike}
          >
            <TbArrowBigUp
              className={`mr-1 ${isLiked ? "text-orange-500" : ""}`}
            />
            <span>{likeCount}</span>
            <TbArrowBigDown className="ml-1" />
          </div>

          <div
            className="flex items-center mr-4 cursor-pointer hover:text-gray-700"
            onClick={() => setIsReplyVisible(!isReplyVisible)}
          >
            <LuMessageCircle className="mr-1" />
            <span>Reply</span>
          </div>

          <div className="flex items-center cursor-pointer hover:text-gray-700">
            <IoShareSocialOutline className="mr-1" />
            <span>Share</span>
          </div>
        </div>
      </div>

      {/* Reply form */}
      {isReplyVisible && (
        <div className="mt-3 pl-4">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="What are your thoughts?"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setIsReplyVisible(false)}
              className="px-4 py-1 mr-2 text-sm rounded-full border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleReplySubmit}
              disabled={!reply.trim()}
              className={`px-4 py-1 text-sm text-white rounded-full ${
                reply.trim()
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              Comment
            </button>
          </div>
        </div>
      )}

      {/* Show nested comments button */}
      {comment.replyCount > 0 && !showNested && (
        <button
          onClick={handleLoadNestedComments}
          className="flex items-center mt-1 ml-2 text-sm text-blue-500 hover:text-blue-700"
        >
          {isLoading ? (
            <span>Loading replies...</span>
          ) : (
            <>
              <span className="mr-1">▼</span>
              <span>
                {comment.replyCount}{" "}
                {comment.replyCount === 1 ? "reply" : "replies"}
              </span>
            </>
          )}
        </button>
      )}

      {/* Nested comments */}
      {showNested && nestedComments.length > 0 && (
        <div className="ml-2">
          {nestedComments.map((nestedComment) => (
            <Comment
              key={nestedComment._id}
              comment={nestedComment}
              loadNestedComments={loadNestedComments}
              onLike={onLike}
              onReply={onReply}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const currentUserId = "user123"; // This would come from auth context in a real app

  // Fetch all root comments for a post
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be:
        // const response = await axios.get(`/api/comments/post/${postId}`);

        // Using dummy data for now
        setTimeout(() => {
          setComments(dummyComments);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  // Load nested comments (replies)
  const loadNestedComments = async (parentId) => {
    // In a real app, this would be:
    // return await axios.get(`/api/comments/${parentId}/replies`);

    // Using dummy data for now
    return new Promise((resolve) => {
      setTimeout(() => {
        const replies = dummyReplies.filter(
          (reply) => reply.parentComment === parentId
        );
        resolve({ data: replies });
      }, 500);
    });
  };

  // Handle liking a comment
  const handleLikeComment = async (commentId) => {
    // In a real app, this would be:
    // return await axios.post(`/api/comments/${commentId}/like`, { userId: currentUserId });

    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      // In a real app, this would be:
      // await axios.post(`/api/comments`, {
      //   post: postId,
      //   comment: newComment,
      //   user: currentUserId
      // });

      // Dummy implementation
      const newCommentObj = {
        _id: `new-${Date.now()}`,
        comment: newComment,
        createdAt: new Date().toISOString(),
        user: {
          _id: currentUserId,
          username: "current_user",
          profilePicture: null,
        },
        likes: [],
        replyCount: 0,
        parentComment: null,
      };

      setComments((prev) => [newCommentObj, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  // Handle replying to a comment
  const handleReplyToComment = async (parentId, replyText) => {
    // In a real app, this would be:
    // return await axios.post(`/api/comments`, {
    //   post: postId,
    //   comment: replyText,
    //   parentComment: parentId,
    //   user: currentUserId
    // });

    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  };

  return (
    <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {/* Add new comment */}
      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          placeholder="What are your thoughts?"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className={`px-4 py-2 text-white rounded-full ${
              newComment.trim()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Comment
          </button>
        </div>
      </div>

      {/* Comments list */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              loadNestedComments={loadNestedComments}
              onLike={handleLikeComment}
              onReply={handleReplyToComment}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Dummy data
const dummyComments = [
  {
    _id: "comment1",
    comment:
      "This post is really insightful. I've been thinking about this topic for a while, and I appreciate the nuanced perspective presented here.",
    createdAt: "2025-03-19T08:30:00Z",
    user: {
      _id: "user1",
      username: "tech_enthusiast",
      profilePicture: "https://i.pravatar.cc/150?img=1",
    },
    likes: [{ user: "user2" }, { user: "user3" }, { user: "user4" }],
    replyCount: 2,
    parentComment: null,
  },
  {
    _id: "comment2",
    comment:
      "I disagree with some points here. In my experience, the approach suggested doesn't work in all contexts. Would be interested to hear others' thoughts on this.",
    createdAt: "2025-03-19T10:15:00Z",
    user: {
      _id: "user2",
      username: "critical_thinker",
      profilePicture: "https://i.pravatar.cc/150?img=2",
    },
    likes: [{ user: "user3" }],
    replyCount: 1,
    parentComment: null,
  },
  {
    _id: "comment3",
    comment:
      "Has anyone actually implemented this in a production environment? I'm curious about real-world results.",
    createdAt: "2025-03-20T14:22:00Z",
    user: {
      _id: "user3",
      username: "practical_dev",
      profilePicture: null,
    },
    likes: [
      { user: "user1" },
      { user: "user5" },
      { user: "user6" },
      { user: "user7" },
    ],
    replyCount: 0,
    parentComment: null,
  },
  {
    _id: "comment4",
    comment:
      "Great post! I'd love to see a follow-up that explores the implications for smaller teams.",
    createdAt: "2025-03-21T09:45:00Z",
    user: {
      _id: "user4",
      username: "startup_founder",
      profilePicture: "https://i.pravatar.cc/150?img=4",
    },
    likes: [],
    replyCount: 0,
    parentComment: null,
  },
];

const dummyReplies = [
  {
    _id: "reply1",
    comment:
      "I agree with you. The perspective shared here resonates with what I've observed in my work as well.",
    createdAt: "2025-03-19T09:10:00Z",
    user: {
      _id: "user5",
      username: "industry_veteran",
      profilePicture: "https://i.pravatar.cc/150?img=5",
    },
    likes: [{ user: "user1" }],
    replyCount: 1,
    parentComment: "comment1",
  },
  {
    _id: "reply2",
    comment:
      "While I see your point, I think there's value in exploring multiple approaches.",
    createdAt: "2025-03-19T11:05:00Z",
    user: {
      _id: "user6",
      username: "balanced_view",
      profilePicture: "https://i.pravatar.cc/150?img=6",
    },
    likes: [{ user: "user2" }, { user: "user3" }],
    replyCount: 0,
    parentComment: "comment2",
  },
  {
    _id: "reply3",
    comment:
      "To add to this conversation, I've found that contextual factors play a huge role here.",
    createdAt: "2025-03-19T13:30:00Z",
    user: {
      _id: "user7",
      username: "context_matters",
      profilePicture: null,
    },
    likes: [{ user: "user5" }],
    replyCount: 0,
    parentComment: "comment1",
  },
  {
    _id: "reply4",
    comment:
      "Actually, I've been working on implementing something similar. Happy to share my experience offline.",
    createdAt: "2025-03-20T16:15:00Z",
    user: {
      _id: "user8",
      username: "helpful_coder",
      profilePicture: "https://i.pravatar.cc/150?img=8",
    },
    likes: [{ user: "user3" }, { user: "user7" }],
    replyCount: 0,
    parentComment: "reply1",
  },
];

export default Comments;
