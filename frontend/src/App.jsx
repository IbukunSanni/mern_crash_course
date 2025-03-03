import { useState } from "react";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {Navbar} from "./components/Navbar";

import {CreatePage} from "./pages/CreatePage";
import HomePage from "./pages/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}

export default App;
