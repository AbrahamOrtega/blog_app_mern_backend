import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosA() {
  useEffect(() => {
    AOS.init({
      //Global settings for AOS
      duration: 1000, // values from 0 to 3000, with step 50ms
      offset: 200, // offset (in px) from the original trigger point
      easing: "ease", // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return <></>;
}
