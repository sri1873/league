/* TODO

Use NavBar component in root folder


tremor (package used for charts) doesn't use css values for colors and takes a string of a color
See https://www.tremor.so/docs/layout/color-palette for more info
In this file, there are only one entry where this is used (the tabSelect)

*/

import { Card, Tab, TabList } from "@tremor/react";
import "@tremor/react/dist/esm/tremor.css";
import TempNav from "./TempNav";
import Dashboard from "./dashboard/DashBoard";
import "./adminPage.css";
import { useState } from "react";
import AdminControls from "./adminControls/Wrapper";

const AdminWrapper = () => {
  const [showCard, setShowCard] = useState("dashboard");

  return (
    <main className="admin-wrapper">
      <Card maxWidth="max-w-7xl" marginTop="mt-8">
        <TabList
          defaultValue={"dashboard"}
          marginTop="mt-3"
          onValueChange={setShowCard}
          value={showCard}
          color="blue"
        >
          <Tab value={"dashboard"} text="Dashboard" />
          <Tab value={"manage booking"} text="Manage Bookings" />
        </TabList>
      </Card>
      <Card maxWidth="max-w-7xl" marginTop="mt-3">
        {showCard === "dashboard" && <Dashboard></Dashboard>}
        {showCard === "manage booking" && <AdminControls></AdminControls>}
      </Card>

    </main>
  );
};

export default AdminWrapper;
