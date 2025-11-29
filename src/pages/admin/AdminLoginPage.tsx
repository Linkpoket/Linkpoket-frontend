import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '@/apis/admin-apis/adminLogin';
import Logo from '@/assets/widget-ui-assets/Logo.svg?react';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await adminLogin({ email, password });
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          '로그인에 실패했습니다. 다시 시도해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <section className="flex w-full max-w-[460px] flex-col items-start px-4">
        <Logo />
        <div className="mt-4 mb-8 flex flex-col text-left text-[26px] font-bold">
          <span className="text-gray-50">관리자 로그인</span>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              아이디
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-50 focus:outline-none"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-50 focus:outline-none"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-50 py-3 font-medium text-white hover:bg-gray-100 active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminLoginPage;
