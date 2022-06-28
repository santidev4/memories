import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js"

export default function App(){
    

    return(
        <BrowserRouter>

            <Container maxWidth="lg">
                <NavBar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/auth" element={<Auth />} />
                    <Route />
                </Routes>
                <Home />
            </Container>
        </BrowserRouter>
    )
}