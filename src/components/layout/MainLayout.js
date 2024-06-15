"use client";
import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import Header3 from "../header/Header3";
import Breadcrumb from "./Breadcrumb";
import Footer from "../footer/Footer2";
import Home1Contact from "../contact/Home1Contact";

const MainLayout = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname

  const hideBreadcrumbRoutes = [
    "/shop",
    "/cechkout",
    "/cart",
    "/product-details",
  ]; // Add the routes where you want to hide the breadcrumb

  const shouldRenderBreadcrumb = !hideBreadcrumbRoutes.some(
    (route) => route === pathname
  );

  const words = ["service", "blog", "case-study","industry"];
  const regex = new RegExp(`^/(${words.join("|")})/.*$`);

  return (
    <>
      <Header3 />
      {!regex.test(pathname) && <Breadcrumb />}
      {children}

      {shouldRenderBreadcrumb && <Home1Contact />}
      <Footer />
    </>
  );
};

export default MainLayout;
