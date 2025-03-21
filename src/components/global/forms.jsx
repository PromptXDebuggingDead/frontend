// FormComponents.js
import React, { useState } from "react";

// Text Input Component
export const TextField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  type = "text",
}) => {
  return (
    <div className={`mb-4 ${fullWidth ? "w-full" : ""}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } 
          rounded-md shadow-sm focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-blue-500 
          ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
      />
      {helperText && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Select Dropdown Component
export const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  placeholder = "Select an option",
}) => {
  return (
    <div className={`mb-4 ${fullWidth ? "w-full" : ""}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } 
          rounded-md shadow-sm focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-blue-500 
          ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Checkbox Component
export const Checkbox = ({
  label,
  name,
  checked,
  onChange,
  error,
  helperText,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded 
            ${disabled ? "opacity-60" : ""}`}
        />
        <label
          htmlFor={name}
          className={`ml-2 block text-sm text-gray-700 ${
            disabled ? "text-gray-500" : ""
          }`}
        >
          {label}
        </label>
      </div>
      {helperText && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Radio Button Group Component
export const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300
                ${disabled ? "opacity-60" : ""}`}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={`ml-2 block text-sm text-gray-700 ${
                disabled ? "text-gray-500" : ""
              }`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {helperText && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Switch / Toggle Component
export const Switch = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="mb-4 flex items-center">
      <div className="relative inline-block w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`block w-10 h-6 rounded-full ${
            checked ? "bg-blue-600" : "bg-gray-300"
          } ${disabled ? "opacity-60" : ""}`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
            checked ? "transform translate-x-4" : ""
          }`}
        ></div>
      </div>
      <label
        htmlFor={name}
        className={`text-sm text-gray-700 ${disabled ? "text-gray-500" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

// File Upload Component
export const FileUpload = ({
  label,
  name,
  onChange,
  accept,
  error,
  helperText,
  required = false,
  disabled = false,
  multiple = false,
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(
        multiple
          ? `${e.target.files.length} files selected`
          : e.target.files[0].name
      );
    } else {
      setFileName("");
    }

    onChange(e);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center">
        <label
          htmlFor={name}
          className={`px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
            font-medium text-gray-700 hover:bg-gray-50 cursor-pointer
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          Choose File
          <input
            type="file"
            id={name}
            name={name}
            onChange={handleFileChange}
            accept={accept}
            className="sr-only"
            disabled={disabled}
            multiple={multiple}
          />
        </label>
        <span className="ml-3 text-sm text-gray-500 truncate max-w-xs">
          {fileName || "No file chosen"}
        </span>
      </div>
      {helperText && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Text Area Component
export const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  helperText,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } 
          rounded-md shadow-sm focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-blue-500 
          ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
      />
      {helperText && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Date Picker Component
export const DatePicker = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  min,
  max,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } 
          rounded-md shadow-sm focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-blue-500 
          ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
      />
      {helperText && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Form Buttons Component
export const FormButtons = ({
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  submitDisabled = false,
  isSubmitting = false,
}) => {
  return (
    <div className="flex justify-end space-x-3 mt-6">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm 
            text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          {cancelText}
        </button>
      )}
      <button
        type="submit"
        onClick={onSubmit}
        disabled={submitDisabled || isSubmitting}
        className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white 
          ${
            submitDisabled || isSubmitting
              ? "bg-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          submitText
        )}
      </button>
    </div>
  );
};

// Form Group Component (for organizing form fields in rows)
export const FormGroup = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-wrap -mx-2 ${className}`}>
      {React.Children.map(children, (child) => (
        <div className="px-2 w-full sm:w-1/2">{child}</div>
      ))}
    </div>
  );
};

// Form Section Component (for grouping related fields with a header)
export const FormSection = ({ title, description, children }) => {
  return (
    <div className="mb-8 pb-4 border-b border-gray-200">
      {title && (
        <h3 className="text-lg font-medium text-gray-800 mb-1">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// Number Input Component
export const NumberField = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  step = 1,
  error,
  helperText,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } 
          rounded-md shadow-sm focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-blue-500 
          ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
      />
      {helperText && (
        <p
          className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

// Complete Form Example (for reference)
export const FormContainer = ({ children, onSubmit, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      )}
      {description && <p className="text-gray-600 mb-6">{description}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </div>
  );
};
