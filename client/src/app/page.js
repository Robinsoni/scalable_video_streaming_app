import Image from "next/image";
import UploadPage from "./pages/uploadPage";
import AuthPage from "./pages/auth";
import AppHome from "./pages/appHome";

export default function Home() {
  return ( 
    <>
      {<div><UploadPage/></div>}
      <div> test ytb</div>
      <div><AppHome /></div>
     {/* <div><AuthPage /></div> */}
    </>
  );
}
