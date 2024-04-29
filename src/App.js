import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import './App.css';
import Expense from "./Pages/expense";
import Expense2 from "./Pages/Expense2";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<Expense/>}/>
          <Route path="/2" element={<Expense2/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
