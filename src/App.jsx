import AddQuestion from "./components/AddQuestion";
import Questions from "./components/Questions";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Questions />} />
          <Route path="/new" element={<AddQuestion />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
