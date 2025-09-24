import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface PageDetails {
  pageId: string;
  pageTitle: string;
  rootFolderId: string;
  directoryDetailResponses: Array<{
    folderId: string;
    folderName: string;
    isFavorite: boolean;
    createdDate: string;
    orderIndex: number;
  }>;
}

const PopUpApp: React.FC = () => {
  const [pageDetails, setPageDetails] = useState<PageDetails | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState('');

  useEffect(() => {
    //url 자동 입력
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const url = tab?.url;
      const title = tab?.title;

      if (url) setLinkUrl(url);
      if (title) {
        const truncatedTitle = title.length > 29 ? title.slice(0, 29) : title;
        setLinkName(truncatedTitle);
      }
    });
  }, []);

  useEffect(() => {
    chrome.runtime.sendMessage(
      { type: 'GET_PERSONAL_PAGE_DATA' },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(
            'personalPageData 요청 중 에러:',
            chrome.runtime.lastError.message
          );
          return;
        }

        if (response && response.data) {
          try {
            const parsedData = JSON.parse(response.data);
            setPageDetails(parsedData?.data?.data?.pageDetails);
          } catch (e) {
            console.error('personalPageData 파싱 실패:', e);
          }
        }
      }
    );

    chrome.storage.local.get(['access_token'], (result) => {
      if (chrome.runtime.lastError) {
        console.error(
          'access_token 요청 중 에러:',
          chrome.runtime.lastError.message
        );
        return;
      }

      const token = result.access_token;
      if (token) {
        console.log('받아온 access_token:', token);
        setAccessToken(token);
      }
    });
  }, []);

  //폴더 기본값 세팅
  useEffect(() => {
    if (pageDetails && selectedFolderId === '') {
      setSelectedFolderId(pageDetails.rootFolderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageDetails]);

  const handleSave = async () => {
    try {
      const response = await fetch('https://api.linkrew.com/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          baseRequest: {
            pageId: pageDetails?.pageId ?? '',
            commandType: 'CREATE',
          },
          linkName,
          linkUrl,
          folderId: selectedFolderId,
          description: '',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`요청 실패: ${errorText}`);
      }

      toast.success('저장에 성공했습니다.');
    } catch (error) {
      console.error('링크 생성 실패:', error);
      toast.error('저장에 실패했습니다. :' + (error as any).detail);
    }
  };

  const handleLogin = () => {
    window.open('https://linkrew.com/', '_blank');
  };

  return accessToken ? (
    <div className="rounded-2 flex h-full w-[300px] flex-col gap-4 border border-[#D8D8D8] bg-[#FFFFFF] p-4 shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]">
      {/* 헤더 */}
      <div className="flex justify-between">
        <img src="/logo.png" alt="Linkrew Logo" className="h-[18px] w-[90px]" />
        <img
          src="/close.png"
          alt="Close"
          onClick={() => window.close()}
          className="cursor-pointer"
        />
      </div>
      {/* 컨텐츠 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <textarea
            className="bg-gray-5 border-gray-5 text-gray-90 line-clamp-3 h-[72px] resize-none rounded-[8px] border p-4 text-[15px] font-semibold break-all whitespace-pre-wrap placeholder:text-gray-50 focus:outline-none"
            placeholder="링크 이름을 입력해주세요"
            value={linkName}
            maxLength={29}
            onChange={(e) => {
              const content = e.target.value;
              setLinkName(content);
            }}
          >
            {linkName}
          </textarea>

          <div
            contentEditable
            className="line-clamp-3 resize-none overflow-hidden text-[13px] font-[400] break-all whitespace-pre-wrap text-[#8E8E8E] placeholder:text-gray-50 empty:before:text-gray-50 empty:before:content-[attr(data-placeholder)] focus:outline-none"
            data-placeholder="링크 주소를 입력해주세요"
            onInput={(e) => {
              const content = e.currentTarget.textContent || '';
              setLinkUrl(content);
            }}
            suppressContentEditableWarning={true}
            style={{
              maxHeight: '60px',
            }}
          >
            {linkUrl}
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <p className="text-gray-70 mb-2 text-[14px] font-[500]">페이지</p>
          <div className="border-gray-30 rounded-[8px] border p-2 text-sm">
            개인 페이지
          </div>

          <p className="text-gray-70 mt-4 mb-2 text-[14px] font-[500]">
            폴더(선택)
          </p>
          <select
            className="border-gray-30 focus:ring-primary-30 focus:border-primary-40 hover:border-primary-40 flex h-[44px] items-center rounded-[8px] border p-2 text-sm placeholder:text-gray-50 focus:outline-none"
            value={selectedFolderId}
            onChange={(e) => setSelectedFolderId(e.target.value)}
          >
            <option value={pageDetails?.rootFolderId ?? ''}>선택 안 함</option>
            {(pageDetails?.directoryDetailResponses || []).map((folder) => (
              <option key={folder.folderId} value={folder.folderId}>
                {folder.folderName}
              </option>
            ))}
          </select>
        </div>

        <button
          className="text-primary-0 bg-primary-50 flex flex-1 cursor-pointer items-center justify-center rounded-[8px] px-[16px] py-[10px] text-center text-[14px] font-[600]"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </div>
  ) : (
    // accesstoken이 없을 경우 렌더링

    <div className="rounded-2 flex h-full w-[300px] flex-col gap-4 border border-[#D8D8D8] bg-[#FFFFFF] p-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.08)]">
      {/* 헤더 */}
      <div className="flex justify-between">
        <img src="/logo.png" alt="Linkrew Logo" className="h-[18px] w-[90px]" />
        <img
          src="/close.png"
          alt="Close"
          onClick={() => window.close()}
          className="cursor-pointer"
        />
      </div>
      {/* 컨텐츠 */}
      <div className="mt-9 text-[16px] font-[700] text-gray-100">
        간편 로그인 후 <br /> 링크를 저장할 수 있어요.
      </div>
      {/* 버튼 */}
      <button
        className="bg-primary-50 text-primary-0 mt-[10px] cursor-pointer items-center justify-center rounded-[8px] px-[16px] py-[10px] text-center text-[16px] font-[600]"
        onClick={handleLogin}
      >
        로그인
      </button>
    </div>
  );
};

export default PopUpApp;
