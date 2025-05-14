import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AddCustomer.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCustomerById,
  editCustomer,
} from "../../redux/slices/customerSlice";
import { useLoading } from "../../contexts/LoadingContext";
import type { RootState } from "../../redux/store";

const EditCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setLoading } = useLoading();
  const { selectedCustomer, loading, error } = useAppSelector(
    (state: RootState) => state.customers
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoBase64, setPhotoBase64] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(fetchCustomerById(id)).finally(() => {
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    if (selectedCustomer) {
      setFullName(selectedCustomer.full_name);
      setEmail(selectedCustomer.email);
      setPassword(selectedCustomer.password);
      setPhone(selectedCustomer.phone || "");
      setGender(selectedCustomer.gender || "");
    }
  }, [selectedCustomer]);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      try {
        const base64 = await convertFileToBase64(file);
        setPhotoBase64(base64);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Required";
    if (!email.trim()) newErrors.email = "Required";
    if (!password.trim()) newErrors.password = "Required";
    if (!phone.trim()) newErrors.phone = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !id || !selectedCustomer) return;

    try {
      setLoading(true);

      await dispatch(
        editCustomer({
          id,
          customer: {
            full_name: fullName,
            username: email.split("@")[0], // Generate username from email
            password: password,
            role: selectedCustomer.role,
            email: email,
            phone: phone,
            gender: gender || selectedCustomer.gender,
            address: selectedCustomer.address,
            member_information_id: selectedCustomer.member_information_id,
            brand_id: selectedCustomer.brand_id,
            status: selectedCustomer.status,
          },
        })
      ).unwrap();

      navigate("/customer");
    } catch (error) {
      console.error("Failed to update customer:", error);
      alert("Failed to update customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!selectedCustomer && !loading)
    return <div className="p-4 text-red-500">Customer not found.</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="main-content">
          <div className="dashboard-body p-6">
            <div className="mx-auto space-y-6">
              <div
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => navigate("/customer")}
              >
                ← Back to Customer List
              </div>

              <h1 className="text-3xl font-bold text-neutral-800">
                Edit Customer
              </h1>

              <div className="bg-white rounded-xl p-8 shadow-md px-[250px]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <div className="w-[72px] h-[72px] rounded-full bg-gray-100 flex items-center justify-center">
                        <img
                          src="/assets/icons/camera-icon.png"
                          alt="Upload"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                      />
                    </label>
                    <span className="text-sm text-blue-600 font-medium">
                      Upload New Photo
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        {errors.fullName && (
                          <span className="text-red-500 text-xs">
                            {errors.fullName}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          Password <span className="text-red-500">*</span>
                        </label>
                        {errors.password && (
                          <span className="text-red-500 text-xs">
                            {errors.password}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
                          autoComplete="new-password"
                        />
                        <img
                          src={`/assets/icons/${showPassword ? "eye-on.png" : "eye-off.png"}`}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                          alt="Toggle Password"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          Email <span className="text-red-500">*</span>
                        </label>
                        {errors.email && (
                          <span className="text-red-500 text-xs">
                            {errors.email}
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        {errors.phone && (
                          <span className="text-red-500 text-xs">
                            {errors.phone}
                          </span>
                        )}
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm mb-1 font-medium">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={`w-full border border-gray-300 rounded-md px-4 py-2 ${styles.dateInput}`}
                        placeholder="dd/mm/yyyy"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm mb-1 font-medium">
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="border border-gray-300 rounded-md h-[42px] px-4 text-sm text-gray-700 bg-white w-full custom-select"
                      >
                        <option value="">--- All Gender ---</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600"
                    >
                      Save Changes
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

export default EditCustomer;
