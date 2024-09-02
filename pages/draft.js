import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import Dataloading from "@/components/Dataloading";
import { BsPostcard } from "react-icons/bs";

export default function Draft() {
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerpage] = useState(5);

  //fetch data from api with custom hook
  const { alldata, loading } = useFetchData("/api/blogapi");

  //funtion to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filtering draft blogs
  const draftBlogs = alldata.filter((blog) => blog.status === "draft");

  // Search Query
  const [searchQuery, setSearchQuery] = useState("");
  const filterBlogs =
    searchQuery.trim() === ""
      ? draftBlogs
      : draftBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = filterBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const allblog = filterBlogs.length;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  // Session and router
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (session) {
    return (
      <>
        <div className="blogpage">
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>
                All Draft <span>Blogs</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <BsPostcard /> <span>/</span>
              <span>Draft Blogs</span>
            </div>
          </div>

          <div className="blogstable" data-aos="fade-up">
            <div className="flex gap-2 mb-1">
              <h2>Search Blogs: </h2>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="search by title..."
              />
            </div>

            <table className="table table-styling">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <tr>
                      <td>
                        <Dataloading />
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {currentBlogs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No Draft Blog
                        </td>
                      </tr>
                    ) : (
                      currentBlogs.map((blog, index) => (
                        <tr key={blog._id}>
                          <td>{indexOfFirstBlog + index + 1}</td>
                          <td>
                            <h3>{blog.title}</h3>
                          </td>
                          <td>
                            <pre>{blog.slug}</pre>
                          </td>
                          <td>
                            <div className="flex gap-2 flex-center">
                              <Link href={"/blogs/edit/" + blog._id}>
                                <button title="edit">
                                  <FaEdit />
                                </button>
                              </Link>
                              <Link href={"/blogs/delete/" + blog._id}>
                                <button title="delete">
                                  <RiDeleteBin6Line />
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </>
                )}
              </tbody>
            </table>

            {currentBlogs.length === 0 ? (
              ""
            ) : (
              <div className="blogpagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {pageNumbers
                  .slice(
                    Math.max(currentPage - 3, 0),
                    Math.min(currentPage + 2, pageNumbers.length)
                  )
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={currentPage === number ? "active" : ""}
                    >
                      {number}
                    </button>
                  ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={filterBlogs.length <= perPage * currentPage}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
