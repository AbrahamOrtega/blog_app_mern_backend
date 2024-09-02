import { RiBarChartHorizontalLine } from "react-icons/ri";
import { GoScreenFull } from "react-icons/go";
import { IoMdNotifications } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { BiExitFullscreen } from "react-icons/bi";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Header() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { data: session } = useSession();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };

  return (
    <>
      <header className="header flex flex-sb">
        <div className="logo flex gap-2">
          <h1>ADMIN</h1>
          <div className="headerham flex flex-center">
            <RiBarChartHorizontalLine />
          </div>
        </div>
        <div className="rightnav flex gap-2">
          <div onClick={toggleFullScreen}>
            {isFullScreen ? <BiExitFullscreen /> : <GoScreenFull />}
          </div>
          <div className="notification">
            <IoMdNotifications />
          </div>
          <div className="profilenav" width={32} height={32}>
            {session ? (
              <img
                style={{ width: "40px" }}
                src={session.user.image}
                alt="user"
              />
            ) : (
              <FaRegUser style={{ fontSize: "32px" }} />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
