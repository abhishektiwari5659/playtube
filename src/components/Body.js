
import { Outlet } from "react-router-dom";
import SiderBar from "./SiderBar";

const Body = () => {
    return (
        <div className="flex">
            <SiderBar />
            <Outlet />
        </div>
    )
}

export default Body;