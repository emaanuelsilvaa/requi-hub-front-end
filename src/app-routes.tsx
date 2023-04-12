import React, { FC } from "react";
import { BrowserRouter, Route, Routes , Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import ButtonAppBar from "./components/appBar";
import Initial from "./pages/Initial/initial"
import CreateCatalog from "./pages/createCatalog";
import EditProfile from "./pages/Profile/EditProfile";
import ViewCatalog from "./pages/viewCatalog";

interface Props {
  component?: any,
  path?: string,
  render: (props: any) => Element
 
}

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<ButtonAppBar/>} />
      <Route path="/homev2" element={<Initial/>} />
      <Route path="/Login" element={<SignIn/>} />
      <Route path="/Cadastro" element={<SignUp/>} />
      <Route path="*" element={<h1>Page not found</h1>} />
      <Route path="/" element={<Navigate to="/homev2" replace />}/>
      <Route path="/profile/:name" element={<Profile />}/>
      <Route path="/profile/edit" element={<EditProfile/>} />
      <Route path="/Criar" element={<CreateCatalog/>} />
      <Route path="/Catalogo" element={<ViewCatalog/>} />
      
          
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;