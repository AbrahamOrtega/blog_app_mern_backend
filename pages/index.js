import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoHome } from "react-icons/io5";
import useFetchData from "@/hooks/useFetchData";
import Dataloading from "@/components/Dataloading";
import {
  Chart as ChartJS,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineController,
  LinearScale,
  plugins,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function Home() {
  //use this on top for render error
  const { alldata, loading } = useFetchData("/api/blogapi");

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  ChartJS.register(
    CategoryScale,
    LineController,
    Title,
    Tooltip,
    Legend,
    BarElement,
    LinearScale,
    plugins
  );

  //define options with in the component scope

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blogs Created Monthly By Year",
      },
    },
  };

  // Aggreagate data by year and month
  const monthlyData = alldata
    .filter((data) => data.status === "publish")
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear(); // get year
      const month = new Date(blog.createdAt).getMonth(); // get month
      acc[year] = acc[year] || Array(12).fill(0); // create year array if not exist

      acc[year][month]++; // increment month count
      return acc;
    }, {});

  const currentYear = new Date().getFullYear(); // get current year
  const years = Object.keys(monthlyData); // get years and sort
  const labels = [
    "Januaty",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0), // fill missing month with 0
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
  }));

  const data = {
    labels,
    datasets,
  };

  if (session) {
    return (
      <>
        <Head>
          <title>Admin Dashboard</title>
          <meta name="description" content="admin dashboard next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="dashboard">
          {/* title */}
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>
                Blogs <span>Dashboard</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <IoHome /> <span>/</span>
              <span>Dashboard</span>
            </div>
          </div>
          {loading ? (
            <div className="loadingdata flex flex-col flex-center wh_100">
              <Dataloading />
            </div>
          ) : (
            <>
              {/* dashboard cards */}
              <div className="topfourcards flex flex-sb">
                <div className="four_card" data-aos="fade-right">
                  <h2>Total Blogs</h2>
                  <span>
                    {alldata.filter((blog) => blog.status === "publish").length}
                  </span>
                </div>
                <div className="four_card" data-aos="fade-right">
                  <h2>Total Topics</h2>
                  <span>4</span>
                </div>
                <div className="four_card" data-aos="fade-left">
                  <h2>Total Tags</h2>
                  <span>6</span>
                </div>
                <div className="four_card" data-aos="fade-left">
                  <h2>Draft Blogs</h2>
                  <span>
                    {alldata.filter((blog) => blog.status === "draft").length}
                  </span>
                </div>
              </div>
              {/* year overview */}
              <div className="year_overview flex flex-sb">
                <div className="leftyearoverview" data-aos="fade-up">
                  <div className="flex flex-sb">
                    <h3>Year Overview</h3>
                    <ul className="creative-dots">
                      <li className="big-dot"></li>
                      <li className="semi-big-dot"></li>
                      <li className="medium-dot"></li>
                      <li className="semi-medium-dot"></li>
                      <li className="semi-small-dot"></li>
                      <div className="small-dot"></div>
                    </ul>
                    <h3 className="text-center">
                      10 / 365 <br /> <span>Total published</span>
                    </h3>
                  </div>
                  <Bar data={data} options={options} />
                </div>
                <div className="right_salescont" data-aos="fade-up">
                  <div>
                    <h3>Blogs by Category</h3>
                    <ul className="creative-dots">
                      <li className="big-dot"></li>
                      <li className="semi-big-dot"></li>
                      <li className="medium-dot"></li>
                      <li className="semi-medium-dot"></li>
                      <li className="semi-small-dot"></li>
                      <div className="small-dot"></div>
                    </ul>
                  </div>
                  <div className="blogscategory flex flex-center">
                    <table>
                      <thead>
                        <tr>
                          <td>Topics</td>
                          <td>Data</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Html, Css & JavaScript</td>
                          <td>5</td>
                        </tr>
                        <tr>
                          <td>Next Js, React Js</td>
                          <td>5</td>
                        </tr>
                        <tr>
                          <td>Database</td>
                          <td>5</td>
                        </tr>
                        <tr>
                          <td>Deployment</td>
                          <td>5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
