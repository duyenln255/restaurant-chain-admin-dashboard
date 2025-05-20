import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuImageUp } from "react-icons/lu";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { createEmployee } from "../../services/employee.service";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CustomDatePicker } from "../../components/CustomDatePicker/CustomDatePicker";

const AddBrandManager: React.FC = () => {
  const navigate = useNavigate();
  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const [photo, setPhoto] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [branch, setBranch] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName) newErrors.fullName = "Required";
    if (!username) newErrors.username = "Required";
    if (!password) newErrors.password = "Required";
    if (!email) newErrors.email = "Required";
    if (!phoneNumber) newErrors.phoneNumber = "Required";
    if (!brand) newErrors.brand = "Required";
    if (!branch) newErrors.branch = "Required";
    if (!position) newErrors.position = "Required";
    if (!salary) newErrors.salary = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await createEmployee({
        id: "",
        full_name: fullName,
        username,
        password,
        email,
        phone: phoneNumber,
        gender,
        position,
        salary: Number(salary),
        brand_id: "TODO",
        branch_id: "TODO",
        avatar: photo ? await convertToBase64(photo) : "",
        role: "Brand Manager",
        address: "",
        date_added: dob ? format(dob, "yyyy-MM-dd") : "",
        status: "Active",
        member_information_id: "",
        display_id: "",
        brand_name: brand,
        branch_address: branch,
        logo_url: "",
      });
      toast.success("Brand Manager created successfully!");
      navigate("/brand-manager");
    } catch (error) {
      toast.error("Failed to create brand manager.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 mx-auto space-y-6">
      <div
        className="text-sm text-blue-600 cursor-pointer"
        onClick={() => navigate("/brand-manager")}
      >
        ← Back to Brand Manager List
      </div>

      <h1 className="text-3xl font-bold text-neutral-800">Add Brand Manager</h1>

      <div className="bg-white rounded-xl p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Photo */}
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                {photo ? (
                  <>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPhoto(null);
                      }}
                      className="absolute top-1 right-1 bg-white rounded-full shadow p-1 hover:bg-red-500 hover:text-white"
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
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && setPhoto(e.target.files[0])}
              />
            </label>
            <span className="text-sm text-blue-600 font-medium">
              Upload Photo <span className="text-red-500">*</span>
            </span>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Full Name *" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input" />
            <input placeholder="Username *" value={username} onChange={(e) => setUsername(e.target.value)} className="input" />
            <input placeholder="Password *" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
            <input placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
            <input placeholder="Phone Number *" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input" />
            <input placeholder="Position *" value={position} onChange={(e) => setPosition(e.target.value)} className="input" />
            <input placeholder="Salary *" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="input" />

            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger><SelectValue placeholder="Select Brand *" /></SelectTrigger>
              <SelectContent><SelectItem value="Phuc Long Company">Phuc Long Company</SelectItem></SelectContent>
            </Select>

            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger><SelectValue placeholder="Select Branch *" /></SelectTrigger>
              <SelectContent><SelectItem value="Sài Gòn">Sài Gòn</SelectItem></SelectContent>
            </Select>

            <CustomDatePicker value={dob} onChange={setDob} placeholder="Date of Birth" />

            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-center pt-4">
            <button type="submit" className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600">Add Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrandManager;
