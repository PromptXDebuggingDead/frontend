import { useEffect, useRef } from "react";

const CloudinaryUploadWidget = ({
  cloudName,
  uploadPreset,
  onSuccess,
  buttonText = "Upload",
  multiple = false,
}) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        multiple,
        // Other options as needed
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          onSuccess(result.info);
        }
      }
    );
  }, [cloudName, uploadPreset, onSuccess, multiple]);

  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
      onClick={() => widgetRef.current.open()}
    >
      {buttonText}
    </button>
  );
};

export default CloudinaryUploadWidget;
