import React from "react";
import HomeSideBar from "../components/HomeSideBar";
import BaseWindow from "../components/BaseWindow";
import PublicTimeline from "../components/timelines/PublicTimeline";

function HomePage(){

    return(
    <BaseWindow 
        leftSideBar={<HomeSideBar/>} 
        pageContent={<PublicTimeline />}
    />
    );

}

export default HomePage;