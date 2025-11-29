import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMembers, AdminMember } from '@/apis/admin-apis/getMembers';
import { updateMemberGrade } from '@/apis/admin-apis/updateMemberGrade';
import { deleteMember } from '@/apis/admin-apis/deleteMember';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [error, setError] = useState('');

  const fetchMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getMembers({
        search: search || undefined,
        page,
        size: 30,
      });
      setMembers(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (err: any) {
      setError('회원 목록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [page]);

  const handleSearch = () => {
    setPage(0);
    fetchMembers();
  };

  const handleGradeChange = async (memberId: string, newGrade: string) => {
    try {
      await updateMemberGrade({ memberId, memberGrade: newGrade });
      fetchMembers();
    } catch (err: any) {
      alert('등급 변경에 실패했습니다.');
      console.error(err);
    }
  };

  const handleDelete = async (memberId: string) => {
    if (!confirm('정말 이 회원을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteMember(memberId);
      fetchMembers();
    } catch (err: any) {
      alert('회원 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_access_token');
    navigate('/admin');
  };

  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-50">회원 관리</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            로그아웃
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="이메일 또는 닉네임 검색"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-50 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="rounded-lg bg-gray-50 px-6 py-2 text-white hover:bg-gray-100"
          >
            검색
          </button>
        </div>

        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    이메일
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    닉네임
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    등급
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    역할
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    가입일
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      로딩 중...
                    </td>
                  </tr>
                ) : members.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      회원이 없습니다.
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member.memberId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {member.memberId.slice(-8)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {member.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {member.nickname}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <select
                          value={member.memberGrade}
                          onChange={(e) =>
                            handleGradeChange(member.memberId, e.target.value)
                          }
                          className="rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-gray-50 focus:outline-none"
                        >
                          <option value="BASIC">BASIC</option>
                          <option value="PRO">PRO</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {member.role}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(member.createdAt).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => handleDelete(member.memberId)}
                          className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              이전
            </button>
            <span className="px-4 py-2 text-sm text-gray-700">
              {page + 1} / {totalPages} (총 {totalElements}명)
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboardPage;
