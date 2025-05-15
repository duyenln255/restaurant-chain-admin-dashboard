import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const navigate = useNavigate();
  const [values, setValues] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]!.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = values.join('');
    console.log('Verify code:', code);
    if (code.length === 6) {
      navigate('/loading');
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FCE2D1] items-center justify-center">
      <div className="flex w-[900px] h-[600px] shadow-lg overflow-hidden rounded-lg">
        {/* Left: Form */}
        <div className="w-1/2 p-10 bg-[#F1F2FE] flex flex-col justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-sm text-gray-500 hover:underline"
          >
            &lt; Back
          </button>

          <div className="flex flex-col items-center">
            <img
              src="/assets/images/email.png"
              alt="Email icon"
              className="w-16 mb-4"
            />
            <h2 className="text-xl font-bold text-[#4B3B39] mb-1">Kiểm tra thư của bạn</h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Chúng tôi đã gửi mã xác minh đến email của bạn
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full space-y-4">
              <div className="flex gap-2">
                {values.map((val, i) => (
                  <input
                    key={i}
                    ref={(el: HTMLInputElement | null) => {
                      inputsRef.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="w-10 h-12 border border-gray-400 rounded-md text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#4B3B39]"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="mt-4 w-full py-2 bg-[#4B3B39] text-white rounded-lg text-sm hover:bg-[#3a2e2c] transition"
              >
                Xác nhận
              </button>

              <button
                type="button"
                onClick={() => console.log('Resend code')}
                className="text-xs text-blue-500 hover:underline"
              >
                Không nhận được mã xác minh?
              </button>
            </form>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-1/2 bg-[#4B3B39] relative">
          <img
            src="/assets/images/coffee-grinder.png"
            alt="Coffee grinder"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
