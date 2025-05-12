import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { LuImageUp } from "react-icons/lu";
import { X } from "lucide-react";
import type { BrandItem } from "../../types/BrandItem";
// import { mockBrands } from "../../mocks/mockBrand"; // Bạn thay bằng API thực nếu có

const EditBrand: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState<BrandItem | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("Active");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // const found = mockBrands.find((b) => b.id === id); // Replace with API fetch
    // if (found) {
    //   setBrand(found);
    //   setName(found.name);
    //   setDescription(found.description);
    //   setLink(found.link);
    //   setStatus(found.status || "Active");
    //   setOpeningHour(found.opening_hours?.slice(0, 5) || "");
    //   setClosingHour(found.closed_hours?.slice(0, 5) || "");
    // }
  }, [id]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Required";
    if (!description.trim()) newErrors.description = "Required";
    if (!link.trim()) newErrors.link = "Required";
    if (!openingHour) newErrors.openingHour = "Required";
    if (!closingHour) newErrors.closingHour = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log({
      id,
      name,
      description,
      link,
      status,
      openingHour,
      closingHour,
      logo: logo ?? brand?.logo,
    });

    navigate("/brand");
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  return (
    <div className="p-6 mx-auto space-y-6">
      <div className="text-sm text-blue-600 cursor-pointer" onClick={() => navigate("/brand")}>
        ← Back to Brand List
      </div>

      <h1 className="text-3xl font-bold text-neutral-800">Edit Brand</h1>

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
                  <img
                    src={brand?.logo}
                    alt="Current Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
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
              Upload Brand Photo
            </span>
          </div>

          {/* Brand Name */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">
                Brand Name <span className="text-red-500">*</span>
              </label>
              {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">
                Description <span className="text-red-500">*</span>
              </label>
              {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2 min-h-[120px]"
            />
          </div>

          {/* Website Link */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">
                Website Link <span className="text-red-500">*</span>
              </label>
              {errors.link && <span className="text-red-500 text-xs">{errors.link}</span>}
            </div>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Opening Hour */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">
                Opening Hour <span className="text-red-500">*</span>
              </label>
              {errors.openingHour && <span className="text-red-500 text-xs">{errors.openingHour}</span>}
            </div>
            <input
              type="time"
              value={openingHour}
              onChange={(e) => setOpeningHour(e.target.value)}
              className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Closing Hour */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">
                Closing Hour <span className="text-red-500">*</span>
              </label>
              {errors.closingHour && <span className="text-red-500 text-xs">{errors.closingHour}</span>}
            </div>
            <input
              type="time"
              value={closingHour}
              onChange={(e) => setClosingHour(e.target.value)}
              className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2"
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBrand;
