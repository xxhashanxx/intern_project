import React, { useEffect } from "react";
import DashboardHeader from "../../layout/DashboardLayout/DashboardHeader";
import { useHistory } from "react-router-dom";

export interface PageProps {
  title: string;
  children: JSX.Element;
}
const Page = (props: PageProps) => {
  const history = useHistory();

  const userDataObj = localStorage.getItem("userDataObj");

  if (!userDataObj) {
    history.push("/login");
  }

  return (
    <>
      <DashboardHeader title={props.title} />
      {props.children}
    </>
  );
};
export default Page;
