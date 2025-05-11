import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { LuImageUp } from "react-icons/lu"
import { X } from "lucide-react"
import type { BrandItem } from "../../types/BrandItem"
import { mockBrands } from "../../mocks/mockBrand"

const EditBrand: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [brand, setBrand] = useState<BrandItem | null>(null)
  const [logo, setLogo] = useState<File | null>(null)
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Active")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const found = mockBrands.find(b => b.id === id)
    if (found) {
      setBrand(found)
      setName(found.name)
      setLink(found.link)
      setDescription(found.description)
      setStatus(found.status || "Active")
    }
  }, [id])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!name.trim()) newErrors.name = "Required"
    if (!description.trim()) newErrors.description = "Required"
    if (!link.trim()) newErrors.link = "Required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    console.log({
      id,
      name,
      link,
      description,
      status,
      logo: logo ?? brand?.logo
    })

    navigate("/brand")
  }

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="main-content">
          <div className="dashboard-body p-6">
            <div className="max-w-[800px] mx-auto space-y-6">
              <div className="text-sm text-blue-600 cursor-pointer" onClick={() => navigate("/brand")}>
                ← Back to Brand List
              </div>

              <h1 className="text-3xl font-bold text-neutral-800">Edit Brand</h1>

              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-md space-y-6">
                {/* Upload Logo */}
                <div className="flex flex-col items-center space-y-2 relative">
                  {logo && (
                    <button
                      type="button"
                      onClick={() => setLogo(null)}
                      className="absolute -top-2 -right-2 bg-white z-20 rounded-full shadow-md p-1 hover:bg-red-500 hover:text-white transition-all"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="relative w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                      {logo ? (
                        <img
                          src={URL.createObjectURL(logo)}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-full"
                        />
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
                      onChange={(e) => setLogo(e.target.files?.[0] || null)}
                    />
                  </label>
                  <span className="text-sm text-blue-600 font-medium">Upload Brand Photo</span>
                </div>

                {/* Brand Name */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">Brand Name <span className="text-red-500">*</span></label>
                    {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-4 py-2"
                  />
                </div>

                {/* Website Link */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">Website Link <span className="text-red-500">*</span></label>
                    {errors.link && <span className="text-red-500 text-xs">{errors.link}</span>}
                  </div>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-4 py-2"
                  />
                </div>

                {/* Description */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">Description <span className="text-red-500">*</span></label>
                    {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-neutral-300 rounded-md px-4 py-2 min-h-[120px]"
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

                <div className="text-center pt-4">
                  <button type="submit" className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBrand
