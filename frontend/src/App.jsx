import { useEffect, useState } from "react"
import Add from "./components/Add";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import View from "./components/View";
import Edit from "./components/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
