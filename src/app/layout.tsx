import { Outlet } from "react-router-dom";

export default function layout() {
  return (
    <>
      <h1>허스키 테스트</h1>
      <Outlet />
    </>
  );
}
