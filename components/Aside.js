import { FaHome } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

export default function Aside() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleClickLink = (link) => {
    setActiveLink(link);
    setClicked(false);
  };

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <aside className="asideleft">
        <ul>
          <Link href="/">
            <li
              className={activeLink === "/" ? "navactive" : ""}
              onClick={() => {
                handleClickLink("/");
              }}
            >
              <FaHome />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link href="/blogs">
            <li
              className={activeLink === "/blogs" ? "navactive" : ""}
              onClick={() => {
                handleClickLink("/blogs");
              }}
            >
              <BsPostcard />
              <span>Blogs</span>
            </li>
          </Link>
          <Link href="/blogs/addblog">
            <li
              className={activeLink === "/blogs/addblog" ? "navactive" : ""}
              onClick={() => {
                handleClickLink("/blogs/addblog");
              }}
            >
              <MdOutlineAddPhotoAlternate />
              <span>AddBlog</span>
            </li>
          </Link>
          <Link href="/draft">
            <li
              className={activeLink === "/draft" ? "navactive" : ""}
              onClick={() => {
                handleClickLink("/draft");
              }}
            >
              <MdOutlinePendingActions />
              <span>Pending</span>
            </li>
          </Link>
          <Link href="/setting">
            <li
              className={activeLink === "/settings" ? "navactive" : ""}
              onClick={() => {
                handleClickLink("/settings");
              }}
            >
              <IoSettingsOutline />
              <span>Settings</span>
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
}
