const DropDownInline = (type: 'directory' | 'site') => {
  if (type === 'directory') {
    return (
      <div className="p-[8px] border border-gray-30 rounded-[10px] ">
        <p className="font-bold">디렉토리명 입력</p>
        <button>📤 전송하기</button>
        <button>📋 복사하기</button>
        <button className="text-red-500">🗑 삭제하기</button>
      </div>
    );
  }

  if (type === 'site') {
    return (
      <div className="dropdown-box">
        <p className="font-bold">사이트명 입력</p>
        <p className="text-sm text-gray-500">
          링크를 입력하세요 링크를 입력하세요
        </p>
        <button className="text-red-500">🗑 삭제하기</button>
      </div>
    );
  }
};

export default DropDownInline;
