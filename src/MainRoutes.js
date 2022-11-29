import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";


const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/:id",
      element: <Home/>,
      id: 1,
    },
    
  ];
  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  );
};

export default MainRoutes;