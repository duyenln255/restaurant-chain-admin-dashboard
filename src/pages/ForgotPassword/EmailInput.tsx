import { useState } from "react";
import { useNavigate } from "react-router-dom";
import grinderImage from "../../../public/assets/images/coffee-grinder.png";

export default function EmailInput() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Tạm thời chỉ điều hướng, bạn có thể gắn API ở đây
    navigate("/verify-code"); // giả sử route tiếp theo là /verify-code
  };

  return (
    <div className="flex w-[900px] h-[600px] shadow-lg overflow-hidden rounded-lg">
      {/* Left: Form */}
      <div className="w-1/2 p-10 bg-[#F1F2FE] flex flex-col justify-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-sm text-gray-500 hover:underline"
        >
          &lt; Back
        </button>
        <h2 className="text-2xl font-bold text-[#4B3B39] mb-2">
          Đặt lại mật khẩu
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Nhập địa chỉ email của bạn và chúng tôi sẽ gửi mã xác minh để đặt lại
          mật khẩu của bạn
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B3B39]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#4B3B39] text-white rounded-lg text-sm hover:bg-[#3a2e2c] transition"
          >
            Gửi hướng dẫn
          </button>
        </form>
      </div>

      {/* Right: Image */}
      <div className="w-1/2 bg-[#4B3B39] relative">
        <img
          src={grinderImage}
          alt="coffee grinder"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
