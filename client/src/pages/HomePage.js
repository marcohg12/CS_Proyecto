import React from "react";
import HomeSideBar from "../components/sidebars/HomeSideBar";
import BaseWindow from "../components/BaseWindow";
import PublicTimeline from "../components/timelines/PublicTimeline";
import InfoSideBar from "../components/sidebars/InfoSideBar";

function HomePage(){

    return(
    <BaseWindow 
        leftSideBar={<HomeSideBar/>} 
        pageContent={<PublicTimeline />}
        rightSideBar={<InfoSideBar/>}
    />
    );

}

export default HomePage;