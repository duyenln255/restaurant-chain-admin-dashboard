import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { LuImageUp } from "react-icons/lu";
import { X } from "lucide-react";

const AddBrand: React.FC = () => {
  const navigate = useNavigate();

  const [logo, setLogo] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("Active");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Required";
    if (!description.trim()) newErrors.description = "Required";
    if (!link.trim()) newErrors.link = "Required";
    // if (!logo) newErrors.logo = "Required";
    if (!openingHour) newErrors.openingHour = "Required";
    if (!closingHour) newErrors.closingHour = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log({
      logo,
      name,
      description,
      link,
      status,
      openingHour,
      closingHour,
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  return (
  <div className="p-6 mx-auto space-y-6 ">
    <div
      className="text-sm text-blue-600 cursor-pointer"
      onClick={() => navigate("/brand")}
    >
      ← Back to Brand List
    </div>

    <h1 className="text-3xl font-bold text-neutral-800">
      Add New Brand
    </h1>

    <div className="bg-white rounded-xl p-8 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Logo */}
        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="logo-upload" className="cursor-pointer">
            <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              {logo ? (
                <>
                  <img
                    src={URL.createObjectURL(logo)}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-full overflow-hidden"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setLogo(null);
                    }}
                    className="absolute top-1 right-1 bg-white rounded-full shadow p-1 hover:bg-red-500 hover:text-white transition-all overflow-visible"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <LuImageUp className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </label>
          <span className="text-sm text-blue-600 font-medium">
            Upload Brand Photo <span className="text-red-500">*</span>
          </span>
          {errors.logo && (
            <span className="text-red-500 text-xs">{errors.logo}</span>
          )}
        </div>

        {/* Brand Name */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">
              Brand Name <span className="text-red-500">*</span>
            </label>
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name}</span>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter brand name"
            className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description}
              </span>
            )}
          </div>
          <textarea
            placeholder="Enter description"
            className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2 min-h-30"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Website Link */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">
              Website Link <span className="text-red-500">*</span>
            </label>
            {errors.link && (
              <span className="text-red-500 text-xs">{errors.link}</span>
            )}
          </div>
          <input
            type="url"
            placeholder="https://..."
            className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        {/* Opening Hour */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">
              Opening Hour <span className="text-red-500">*</span>
            </label>
            {errors.openingHour && (
              <span className="text-red-500 text-xs">{errors.openingHour}</span>
            )}
          </div>
          <input
            type="time"
            className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2"
            value={openingHour}
            onChange={(e) => setOpeningHour(e.target.value)}
          />
        </div>

        {/* Closing Hour */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">
              Closing Hour <span className="text-red-500">*</span>
            </label>
            {errors.closingHour && (
              <span className="text-red-500 text-xs">{errors.closingHour}</span>
            )}
          </div>
          <input
            type="time"
            className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2"
            value={closingHour}
            onChange={(e) => setClosingHour(e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="space-y-1">
          <label className="text-sm font-medium block">Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600"
          >
            Add Now
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddBrand;