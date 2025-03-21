import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../utils/API";

const CreateCommunity = () => {
  const router = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([
    { _id: "1", name: "Technology" },
    { _id: "2", name: "Gaming" },
    { _id: "3", name: "Music" },
    { _id: "4", name: "Movies" },
    { _id: "5", name: "Books" },
    { _id: "6", name: "Sports" },
    { _id: "7", name: "Science" },
    { _id: "8", name: "Food" },
    { _id: "9", name: "Travel" },
    { _id: "10", name: "Fashion" },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    categories: [],
    guidelines: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    bio: "",
    categories: "",
  });
  const [guidelineInput, setGuidelineInput] = useState("");

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", bio: "", categories: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Community name is required";
      valid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = "Community name must be at least 3 characters";
      valid = false;
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
      valid = false;
    } else if (formData.bio.length < 10) {
      newErrors.bio = "Bio must be at least 10 characters";
      valid = false;
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "Select at least one category";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter((cat) => cat !== value),
    }));

    // Clear category error when selecting
    if (errors.categories && checked) {
      setErrors((prev) => ({
        ...prev,
        categories: "",
      }));
    }
  };

  const addGuideline = () => {
    if (guidelineInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        guidelines: [...prev.guidelines, guidelineInput.trim()],
      }));
      setGuidelineInput("");
    }
  };

  const removeGuideline = (index) => {
    setFormData((prev) => ({
      ...prev,
      guidelines: prev.guidelines.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await API.post("/community/create", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Community created successfully!");
      //   router(`/communities/${data.community._id}`);
    } catch (error) {
      console.error("Error creating community:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" grainy-light py-10 pb-20">
      <div className="max-w-3xl border border-gray-500 mx-auto p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Create a New Community</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Community Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Community Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter community name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Community Bio*
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              className={`w-full px-3 py-2 border rounded-md ${
                errors.bio ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe your community"
            ></textarea>
            {errors.bio && (
              <p className="mt-1 text-sm text-red-500">{errors.bio}</p>
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories*
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category._id}`}
                    value={category.name}
                    checked={formData.categories.includes(category.name)}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`category-${category._id}`}
                    className="text-sm"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.categories && (
              <p className="mt-1 text-sm text-red-500">{errors.categories}</p>
            )}
          </div>

          {/* Guidelines */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Community Guidelines (Optional)
            </label>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={guidelineInput}
                onChange={(e) => setGuidelineInput(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                placeholder="Add a guideline"
              />
              <button
                type="button"
                onClick={addGuideline}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add
              </button>
            </div>

            {formData.guidelines.length > 0 && (
              <ul className="mt-2 space-y-2 bg-gray-50 p-3 rounded-md">
                {formData.guidelines.map((guideline, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{guideline}</span>
                    <button
                      type="button"
                      onClick={() => removeGuideline(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isSubmitting ? "Creating..." : "Create Community"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunity;
