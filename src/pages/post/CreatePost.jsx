// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// import CloudinaryUploadWidget from "../../components/global/CloudinaryUploadWidget";
// import { useNavigate } from "react-router-dom";
// import API from "../../utils/API";

// // Cloudinary configuration
// const CLOUDINARY_UPLOAD_PRESET = "ml_default";
// const CLOUDINARY_CLOUD_NAME = "dtbbuevez";

// const CreatePost = () => {
//   const router = useNavigate();
//   const [communities, setCommunities] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     images: [],
//     video: "",
//     category: "",
//     community: "",
//   });
//   const [errors, setErrors] = useState({});

//   // Fetch communities on component mount
//   useEffect(() => {
//     const fetchCommunities = async () => {
//       try {
//         const { data } = await API.get("/community/me");
//         if (data.success) {
//           setCommunities(data.communities);
//         }
//       } catch (error) {
//         console.error("Error fetching communities:", error);
//         toast.error("Failed to load communities");
//       }
//     };

//     fetchCommunities();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handleImagesUploadSuccess = (info) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: [...prev.images, info.secure_url],
//     }));
//     toast.success("Image uploaded successfully!");
//   };

//   const handleVideoUploadSuccess = (info) => {
//     setFormData((prev) => ({
//       ...prev,
//       video: info.secure_url,
//     }));
//     toast.success("Video uploaded successfully!");
//   };

//   const removeImage = (indexToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, index) => index !== indexToRemove),
//     }));
//   };

//   const removeVideo = () => {
//     setFormData((prev) => ({
//       ...prev,
//       video: "",
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) {
//       newErrors.title = "Title is required";
//     }

//     if (!formData.content.trim()) {
//       newErrors.content = "Content is required";
//     }

//     if (!formData.community) {
//       newErrors.community = "Please select a community";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fix the errors in the form");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data } = await API.post("/post/create", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (data.success) {
//         toast.success("Post created successfully!");
//       } else {
//         toast.error(data.message || "Failed to create post");
//       }
//     } catch (error) {
//       console.error("Error creating post:", error);
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Title */}
//         <div>
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Title *
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded-md ${
//               errors.title ? "border-red-500" : "border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             placeholder="Enter post title"
//           />
//           {errors.title && (
//             <p className="mt-1 text-xs text-red-500">{errors.title}</p>
//           )}
//         </div>

//         {/* Content */}
//         <div>
//           <label
//             htmlFor="content"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Content *
//           </label>
//           <textarea
//             id="content"
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//             rows={6}
//             className={`w-full px-3 py-2 border rounded-md ${
//               errors.content ? "border-red-500" : "border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             placeholder="Write your post content here..."
//           />
//           {errors.content && (
//             <p className="mt-1 text-xs text-red-500">{errors.content}</p>
//           )}
//         </div>

//         {/* Community */}
//         <div>
//           <label
//             htmlFor="community"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Community *
//           </label>
//           <select
//             id="community"
//             name="community"
//             value={formData.community}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded-md ${
//               errors.community ? "border-red-500" : "border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//           >
//             <option value="">Select a community</option>
//             {communities.map((community) => (
//               <option key={community._id} value={community._id}>
//                 {community.name}
//               </option>
//             ))}
//           </select>
//           {errors.community && (
//             <p className="mt-1 text-xs text-red-500">{errors.community}</p>
//           )}
//         </div>

//         {/* Category */}
//         <div>
//           <label
//             htmlFor="category"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Category (Optional)
//           </label>
//           <input
//             type="text"
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter category (optional)"
//           />
//         </div>

//         {/* Images Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Images (Optional)
//           </label>

//           {formData.images.length > 0 && (
//             <div className="grid grid-cols-3 gap-4 mb-4">
//               {formData.images.map((image, index) => (
//                 <div
//                   key={index}
//                   className="relative h-32 border rounded overflow-hidden"
//                 >
//                   <img
//                     src={image}
//                     alt={`Uploaded image ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
//                     aria-label="Remove image"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           <CloudinaryUploadWidget
//             cloudName={CLOUDINARY_CLOUD_NAME}
//             uploadPreset={CLOUDINARY_UPLOAD_PRESET}
//             onSuccess={handleImagesUploadSuccess}
//             buttonText="Upload Images"
//             multiple={true}
//             resourceType="image"
//           />
//         </div>

//         {/* Video Upload */}
//         {/* <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Video (Optional)
//           </label>

//           {formData.video ? (
//             <div className="mt-2 relative w-full h-64 border rounded overflow-hidden">
//               <video
//                 src={formData.video}
//                 controls
//                 className="w-full h-full object-cover"
//               />
//               <button
//                 type="button"
//                 onClick={removeVideo}
//                 className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
//                 aria-label="Remove video"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//           ) : (
//             <CloudinaryUploadWidget
//               cloudName={CLOUDINARY_CLOUD_NAME}
//               uploadPreset={CLOUDINARY_UPLOAD_PRESET}
//               onSuccess={handleVideoUploadSuccess}
//               buttonText="Upload Video"
//               multiple={false}
//               resourceType="video"
//             />
//           )}
//         </div> */}

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//               loading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Creating..." : "Create Post"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import CloudinaryUploadWidget from "../../components/global/CloudinaryUploadWidget";
import { useNavigate } from "react-router-dom";
import API from "../../utils/API";

// Cloudinary configuration
const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dtbbuevez";

const CreatePost = () => {
  const router = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moderationLoading, setModerationLoading] = useState(false);
  const [moderationResults, setModerationResults] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [],
    video: "",
    category: "",
    community: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch communities on component mount
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const { data } = await API.get("/community/me");
        if (data.success) {
          setCommunities(data.communities);
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
        toast.error("Failed to load communities");
      }
    };

    fetchCommunities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear moderation results when user makes changes
    setModerationResults(null);

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImagesUploadSuccess = async (info) => {
    // Check image moderation before adding to form data
    setModerationLoading(true);
    try {
      const imageUrl = info.secure_url;
      const { data } = await API.post("/moderate", { imageUrl });

      if (data.success) {
        const imageModeration = data.data;

        // Check for offensive content
        const hasOffensiveContent =
          imageModeration.nudity?.sexual_activity > 0.5 ||
          imageModeration.nudity?.sexual_display > 0.5 ||
          imageModeration.nudity?.erotica > 0.5 ||
          imageModeration.weapon?.classes?.firearm > 0.5 ||
          imageModeration.recreational_drug?.prob > 0.5 ||
          imageModeration.offensive?.nazi > 0.5 ||
          imageModeration.offensive?.supremacist > 0.5 ||
          imageModeration.offensive?.terrorist > 0.5 ||
          imageModeration.offensive?.middle_finger > 0.5 ||
          imageModeration.self_harm?.prob > 0.5;

        if (hasOffensiveContent) {
          setModerationResults({
            type: "image",
            passed: false,
            details: imageModeration,
          });
          toast.error(
            "Image contains inappropriate content and cannot be uploaded"
          );
          return;
        }

        // If no offensive content, add the image
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, imageUrl],
        }));
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error checking image moderation:", error);
      toast.error("Failed to check image content");
    } finally {
      setModerationLoading(false);
    }
  };

  const handleVideoUploadSuccess = (info) => {
    setFormData((prev) => ({
      ...prev,
      video: info.secure_url,
    }));
    toast.success("Video uploaded successfully!");
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeVideo = () => {
    setFormData((prev) => ({
      ...prev,
      video: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.community) {
      newErrors.community = "Please select a community";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkContentModeration = async () => {
    setModerationLoading(true);
    try {
      // Check title moderation
      const titleResponse = await API.post("/moderate", {
        text: formData.title,
      });
      const contentResponse = await API.post("/moderate", {
        text: formData.content,
      });

      if (titleResponse.data.success && contentResponse.data.success) {
        const titleModeration = titleResponse.data.data;
        const contentModeration = contentResponse.data.data;

        // Check if title has any offensive content
        const hasTitleOffensiveContent =
          titleModeration.profanity?.matches.length > 0 ||
          titleModeration.extremism?.matches.length > 0 ||
          titleModeration.violence?.matches.length > 0 ||
          titleModeration["self-harm"]?.matches.length > 0;

        // Check if content has any offensive content
        const hasContentOffensiveContent =
          contentModeration.profanity?.matches.length > 0 ||
          contentModeration.extremism?.matches.length > 0 ||
          contentModeration.violence?.matches.length > 0 ||
          contentModeration["self-harm"]?.matches.length > 0;

        if (hasTitleOffensiveContent || hasContentOffensiveContent) {
          setModerationResults({
            type: "text",
            passed: false,
            title: hasTitleOffensiveContent ? titleModeration : null,
            content: hasContentOffensiveContent ? contentModeration : null,
          });
          return false;
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking content moderation:", error);
      toast.error("Failed to check content moderation");
      return false;
    } finally {
      setModerationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Check content moderation before submitting
    const passedModeration = await checkContentModeration();
    if (!passedModeration) {
      toast.error("Your post contains inappropriate content");
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post("/post/create", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.success) {
        toast.success("Post created successfully!");
        router("/"); // Navigate to homepage or post list
      } else {
        toast.error(data.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Display moderation report
  const renderModerationReport = () => {
    if (!moderationResults) return null;

    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
        <h3 className="text-lg font-semibold text-red-700 mb-2">
          Content Moderation Report
        </h3>

        {moderationResults.type === "text" ? (
          <div>
            {moderationResults.title && (
              <div className="mb-3">
                <h4 className="font-medium text-red-600">
                  Title contains inappropriate content:
                </h4>
                <ul className="list-disc ml-5">
                  {moderationResults.title.profanity?.matches.map(
                    (match, idx) => (
                      <li key={`title-profanity-${idx}`} className="text-sm">
                        Profanity detected: "{match.match}" (intensity:{" "}
                        {match.intensity})
                      </li>
                    )
                  )}
                  {moderationResults.title.extremism?.matches.map(
                    (match, idx) => (
                      <li key={`title-extremism-${idx}`} className="text-sm">
                        Extremist content detected
                      </li>
                    )
                  )}
                  {moderationResults.title.violence?.matches.map(
                    (match, idx) => (
                      <li key={`title-violence-${idx}`} className="text-sm">
                        Violent content detected
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {moderationResults.content && (
              <div>
                <h4 className="font-medium text-red-600">
                  Post content contains inappropriate content:
                </h4>
                <ul className="list-disc ml-5">
                  {moderationResults.content.profanity?.matches.map(
                    (match, idx) => (
                      <li key={`content-profanity-${idx}`} className="text-sm">
                        Profanity detected: "{match.match}" (intensity:{" "}
                        {match.intensity})
                      </li>
                    )
                  )}
                  {moderationResults.content.extremism?.matches.map(
                    (match, idx) => (
                      <li key={`content-extremism-${idx}`} className="text-sm">
                        Extremist content detected
                      </li>
                    )
                  )}
                  {moderationResults.content.violence?.matches.map(
                    (match, idx) => (
                      <li key={`content-violence-${idx}`} className="text-sm">
                        Violent content detected
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h4 className="font-medium text-red-600">
              Image contains inappropriate content:
            </h4>
            <p className="text-sm mt-1">
              Your image was flagged for inappropriate content and cannot be
              uploaded. Please upload a different image.
            </p>
          </div>
        )}

        <div className="mt-3">
          <p className="text-sm font-medium text-red-700">
            Please modify your content to comply with community guidelines.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

      {/* Moderation Report */}
      {moderationResults && renderModerationReport()}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.content ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Write your post content here..."
          />
          {errors.content && (
            <p className="mt-1 text-xs text-red-500">{errors.content}</p>
          )}
        </div>

        {/* Community */}
        <div>
          <label
            htmlFor="community"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Community *
          </label>
          <select
            id="community"
            name="community"
            value={formData.community}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.community ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select a community</option>
            {communities.map((community) => (
              <option key={community._id} value={community._id}>
                {community.name}
              </option>
            ))}
          </select>
          {errors.community && (
            <p className="mt-1 text-xs text-red-500">{errors.community}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category (Optional)
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category (optional)"
          />
        </div>

        {/* Images Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images (Optional)
          </label>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-32 border rounded overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                    aria-label="Remove image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <CloudinaryUploadWidget
            cloudName={CLOUDINARY_CLOUD_NAME}
            uploadPreset={CLOUDINARY_UPLOAD_PRESET}
            onSuccess={handleImagesUploadSuccess}
            buttonText="Upload Images"
            multiple={true}
            resourceType="image"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || moderationLoading}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading || moderationLoading
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
          >
            {loading
              ? "Creating..."
              : moderationLoading
              ? "Checking content..."
              : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
