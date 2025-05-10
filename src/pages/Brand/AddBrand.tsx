import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import Header from "../../components/Header/Header";

const AddBrand: React.FC = () => {
  const navigate = useNavigate();

  const [logo, setLogo] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Required";
    if (!description.trim()) newErrors.description = "Required";
    if (!link.trim()) newErrors.link = "Required";
    if (!logo) newErrors.logo = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log({ logo, name, description, link, status: "Active" });
    // Redirect or further logic here
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {/* <Sidebar /> */}
        <div className="main-content">
          {/* <Header /> */}
          <div className="dashboard-body p-6">
            <div className=" mx-auto space-y-6">
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
                      <div className="w-[72px] h-[72px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src="/assets/icons/camera-icon.png"
                          alt="Upload"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-600 font-medium">
                        Upload Logo <span className="text-red-500">*</span>
                      </span>
                      {errors.logo && (
                        <span className="text-red-500 text-xs">
                          {errors.logo}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Brand Name */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium">
                          Brand Name <span className="text-red-500">*</span>
                        </label>
                        {errors.name && (
                          <span className="text-red-500 text-xs">
                            {errors.name}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Enter brand name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
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
                        className="w-full border border-gray-300 rounded-md px-4 py-2 min-h-[120px]"
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
                          <span className="text-red-500 text-xs">
                            {errors.link}
                          </span>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="https://..."
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>

                    {/* Status (Disabled) */}
                    <div>
                      <label className="text-sm font-medium block mb-1">
                        Status
                      </label>
                      <select
                        value="Active"
                        disabled
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-500 custom-select"
                      >
                        <option value="Active">Active</option>
                      </select>
                    </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
