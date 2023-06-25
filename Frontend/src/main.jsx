import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import { PlatformProvider } from "./context/PlatformContext";
import { ServiceProvider } from "./context/ServiceContext";
import { ProfileProvider } from "./context/ProfileContext";
import { AuthProvider } from "./context/AuthContext";
import MyServices from "./routes/myServices";
import Service from "./routes/service";
import NewService from "./routes/newService";
import Services from "./routes/services";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Governance from "./routes/goverance";
import Users from "./routes/users";

ReactDOM.render(
  <AuthProvider>
    <PlatformProvider>
        <ServiceProvider>
          <ProfileProvider>
            <Router>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
                  <Route path="services" element={<Services />} />
                  <Route path="services/new" element={<NewService />} />
                  <Route path="services/:id" element={<Service />} />
                  <Route path="myservices" element={<MyServices />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="users" element={<Users />} />
                  <Route path="governance" element={<Governance />} />
                  <Route
                    path="*"
                    element={(
                      <main className="text-white p-1 min-h-screen">
                        <h1 className="text-center">There is nothing here!</h1>
                      </main>
                    )}
                  />
                </Route>
              </Routes>
            </Router>
          </ProfileProvider>
        </ServiceProvider>
    </PlatformProvider>
  </AuthProvider>,
  document.getElementById("root")
);
