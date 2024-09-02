import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import Head from "next/head";
import { BsPostcard } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";

export default function DeleteBlog() {
  //loading first
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

  //blog edit
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get(`/api/blogapi/?id=${id}`).then((res) => {
        setProductInfo(res.data);
      });
    }
  }, [id]);

  //Cancel the delete and go back
  function goBack() {
    router.back();
  }

  //Dlete one blog
  async function deleteBlog() {
    await axios.delete(`/api/blogapi/?id=${id}`);
    goBack();
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Edit Blog</title>
          <meta name="description" content="Edit Blog" />
        </Head>
        <div className="blogpage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Delete <span>{productInfo?.title}</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb">
              <BsPostcard /> <span>/</span>
              <span>Delete Blog</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="deletesec flex flex-center w_100">
              <div className="deletecard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="6em"
                  fill="red"
                  height="6em"
                  viewBox="0 0 32 32"
                >
                  <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
                </svg>
                <p className="cookieHeading">Are you sure?</p>
                <p className="cookiesDescription">
                  If you delete this blog content it will be permenent delete
                  your blog
                </p>

                <div className="buttonContainer">
                  <button onClick={deleteBlog} className="declineButton">
                    Delete
                  </button>
                  <button onClick={goBack} className="acceptButton">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
