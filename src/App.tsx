import React from "react";
import "./App.css";
import { TopMenu } from "./components/TopMenu/TopMenu";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { MessageModal } from "./components/MessageModal/MessageModal";
import { useAppSelector } from "./store/helpers";
import Loader from "./components/UI/Loader/Loader";

function App() {
  const { user, token, isLoading, error } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="page_wrap">
        {isLoading ? (
          <Loader />
        ) : user ? (
          <div className="page">
            <TopMenu />
            <Routes>
              {privateRoutes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={Element}></Route>
              ))}
            </Routes>
          </div>
        ) : (
          <div className="page">
            <Routes>
              {publicRoutes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={Element}></Route>
              ))}
            </Routes>
          </div>
        )}

        <Footer />
        <MessageModal />
      </div>
    </BrowserRouter>
  );
}

export default App;
