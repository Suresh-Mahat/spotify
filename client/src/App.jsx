import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContainer from "../src/pages/AuthContainer";
const App= () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authcontainer" element={<AuthContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;