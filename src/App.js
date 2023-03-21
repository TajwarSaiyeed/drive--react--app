import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import Loading from "./components/Loading";

const App = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={routes} />
      </Suspense>
    </>
  );
};

export default App;
