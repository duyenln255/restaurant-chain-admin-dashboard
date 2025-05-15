import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    console.log('Resetting password to:', password);
    navigate('/', {
        replace: true,
        state: {
          resetSuccess: true
        }
      });
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FCE2D1] items-center justify-center">
      <div className="flex w-[900px] h-[600px] shadow-lg overflow-hidden rounded-lg">
        {/* Left */}
        <div className="w-1/2 p-10 bg-[#F1F2FE] flex flex-col justify-center relative">
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-sm text-gray-500 hover:underline">
            &lt; Back
          </button>

          <h2 className="text-2xl font-bold text-[#4B3B39] mb-2">Tạo mật khẩu mới</h2>
          <p className="text-sm text-gray-600 mb-6">
            Mật khẩu mới của bạn phải khác mật khẩu trước đó
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4B3B39]"
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4B3B39]"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-[#4B3B39] text-white rounded-lg text-sm font-medium hover:bg-[#3a2e2c] transition"
            >
              Đặt lại mật khẩu
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="w-1/2 bg-[#4B3B39] relative">
          <img
            src="/assets/images/coffee-grinder.png"
            alt="coffee grinder"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
