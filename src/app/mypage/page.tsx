'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

type TabType = 'profile' | 'artist' | 'orders';

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  if (status === 'loading') {
    return (
      <section className="py-16 container mx-auto px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
          <p className="mt-4">로딩 중...</p>
        </div>
      </section>
    );
  }

  if (!session) {
    router.push('/signin');
    return null;
  }

  const tabs = [
    { id: 'profile', label: '프로필 작성', icon: '👤' },
    { id: 'artist', label: '작가 등록', icon: '🎨' },
    { id: 'orders', label: '주문내역', icon: '📦' },
  ];

  return (
    <section className="py-16 container mx-auto px-4 max-w-4xl">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">마이페이지</h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            안녕하세요, {session.user?.name || '사용자'}님!
          </p>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-sm text-gray-500 hover:text-black transition"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === tab.id
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="min-h-[400px]">
        {activeTab === 'profile' && <ProfileTab session={session} />}
        {activeTab === 'artist' && <ArtistTab session={session} />}
        {activeTab === 'orders' && <OrdersTab session={session} />}
      </div>
    </section>
  );
}

// 프로필 탭 컴포넌트
function ProfileTab({ session }: { session: any }) {
  const [profile, setProfile] = useState({
    bio: '',
    location: '',
    website: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 프로필 저장 로직
    console.log('프로필 저장:', profile);
    alert('프로필이 저장되었습니다.');
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">프로필 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">자기소개</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
            placeholder="자신에 대해 소개해주세요..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">위치</label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) =>
              setProfile({ ...profile, location: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
            placeholder="도시, 국가"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">웹사이트</label>
          <input
            type="url"
            value={profile.website}
            onChange={(e) =>
              setProfile({ ...profile, website: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">전화번호</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
            placeholder="+82 10-1234-5678"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          프로필 저장
        </button>
      </form>
    </div>
  );
}

// 작가 등록 탭 컴포넌트
function ArtistTab({ session }: { session: any }) {
  const [isArtist, setIsArtist] = useState(session.user?.isArtist || false);
  const [verificationData, setVerificationData] = useState({
    institution: '',
    studentId: '',
    country: '',
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleVerification = async () => {
    // AI 학생증 인증 로직
    setIsVerifying(true);
    // 실제 구현에서는 AI 인증 API 호출
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult({
        success: true,
        message: 'AI 인증이 완료되었습니다!',
      });
      setIsArtist(true);
    }, 3000);
  };

  if (isArtist) {
    return (
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">작가 등록</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">✅</span>
            <h3 className="text-lg font-semibold text-green-800">
              작가 인증 완료
            </h3>
          </div>
          <p className="text-green-700 mb-4">
            축하합니다! 학생 인증이 완료되어 작가로 등록되었습니다. 이제 작품을
            업로드하고 판매할 수 있습니다.
          </p>
          <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
            작품 업로드하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">작가 등록</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          학생 인증이 필요합니다
        </h3>
        <p className="text-blue-700">
          작가로 등록하려면 학생 인증이 필요합니다. AI가 학생증을 자동으로
          검증해드립니다.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">국가 *</label>
          <select
            value={verificationData.country}
            onChange={(e) =>
              setVerificationData({
                ...verificationData,
                country: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
          >
            <option value="">국가를 선택하세요</option>
            <option value="korea">대한민국</option>
            <option value="uk">영국</option>
            <option value="france">프랑스</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            학교/대학교명 *
          </label>
          <input
            type="text"
            value={verificationData.institution}
            onChange={(e) =>
              setVerificationData({
                ...verificationData,
                institution: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
            placeholder="예: 서울대학교"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">학번 *</label>
          <input
            type="text"
            value={verificationData.studentId}
            onChange={(e) =>
              setVerificationData({
                ...verificationData,
                studentId: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
            placeholder="예: 2023123456"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            학생증 사진 *
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
          />
          <p className="text-sm text-gray-600 mt-1">
            학생증의 앞면을 명확하게 촬영하여 업로드해주세요.
          </p>
        </div>
        <button
          type="button"
          onClick={handleVerification}
          disabled={isVerifying}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isVerifying ? 'AI 인증 중...' : '🤖 AI로 학생증 인증하기'}
        </button>
      </form>

      {verificationResult && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700">{verificationResult.message}</p>
        </div>
      )}
    </div>
  );
}

// 주문내역 탭 컴포넌트
function OrdersTab({ session }: { session: any }) {
  const orders = [
    {
      id: '1',
      date: '2024-01-15',
      status: '배송완료',
      items: ['Product Name 1', 'Product Name 2'],
      total: '€50.00',
    },
    {
      id: '2',
      date: '2024-01-10',
      status: '배송중',
      items: ['Product Name 3'],
      total: '€25.00',
    },
  ];

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">주문내역</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">주문 #{order.id}</h3>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === '배송완료'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <p key={index} className="text-sm">
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="font-semibold">총액: {order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
