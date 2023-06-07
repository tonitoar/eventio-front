import { Outlet } from "react-router-dom";

export default function OutletWrapper() {
  return (
    <div className="bg-custom-image1">
      <Outlet />
    </div>
  );
}