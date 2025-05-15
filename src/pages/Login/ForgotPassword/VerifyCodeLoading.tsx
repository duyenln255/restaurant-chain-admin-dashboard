import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyCodeLoading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/reset-password');
    }, 2000); // giả lập loading 2s

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full bg-[#FCE2D1] items-center justify-center">
      <div className="flex w-[900px] h-[600px] shadow-lg overflow-hidden rounded-lg">
        {/* Left: Loading */}
        <div className="w-1/2 bg-[#F1F2FE] flex flex-col justify-center items-center px-8 relative">
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-sm text-gray-500 hover:underline">
            &lt; Back
          </button>

          <img src="/assets/images/email.png" className="w-16 mb-4" />
          <h2 className="text-xl font-bold text-[#4B3B39] mb-2">Vui lòng đợi trong giây lát</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Sẽ mất vài giây để chúng tôi xác nhận mã xác minh
          </p>

          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-[#4B3B39] rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
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
