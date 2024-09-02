import { FaRegUser } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

export default function Login() {
  const { data: session, status } = useSession();
  if (status === "loading")
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );

  const router = useRouter();

  async function login() {
    await router.push("/");
    await signIn();
  }

  if (session) {
    router.push("/");
    return null;
  }

  if (!session) {
    return (
      <>
        <div className="loginfront flex flex-center flex-col full-w">
          <FaRegUser style={{ fontSize: "128px" }} />
          <h1>Welcome Admin 👋</h1>
          <p>
            Visit our main website{" "}
            <a href="https://www.abrahamortegadev.software">abrahamortegadev</a>
          </p>
          <button onClick={login} className="mt-2">
            Login with Google
          </button>
        </div>
      </>
    );
  }
}
