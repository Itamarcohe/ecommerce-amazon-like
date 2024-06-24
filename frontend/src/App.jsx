import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import HomePage from "./pages/HomePage.jsx";
import Footer from "./components/shared/Footer.jsx";
import Header from "./components/shared/Header.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <>
        <BrowserRouter>
            <div className='d-flex flex-column side-allPage min-width'>
                <Header />
                <main>
                    <Container className='mt-3'>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                        </Routes>
                    </Container>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    </>
  )
}

export default App
