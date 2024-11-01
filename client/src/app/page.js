import Image from "next/image";
import UploadPage from "./upload/page";
import AuthPage from "./pages/auth";
import AppHome from "./pages/appHome";
import NavBar from "./components/navbar";
import VideoPlayer from "./pages/videoPlayer";

export default function Home() {
  return (
    <>
      <NavBar />
      {/* <div><UploadPage/></div> */}
      <div>
        <VideoPlayer />
      </div>
      <div><AppHome /></div>
      {/* <div><AuthPage /></div> */}
    </>
  );
}
