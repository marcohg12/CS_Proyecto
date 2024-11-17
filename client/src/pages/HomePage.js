import React from "react";
import HomeSideBar from "../components/HomeSideBar";
import BaseWindow from "../components/BaseWindow";
import Timeline from "../components/Timeline";

function HomePage(){

    return(
    <BaseWindow 
        leftSideBar={<HomeSideBar/>} 
        pageContent={<Timeline type="public"/>}
    />);

}

export default HomePage;