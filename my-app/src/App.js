import Home from "./components/Home";  // ✅ Import your component
import "./styles/home.css";  // ✅ Import styles if needed
import Donate from "./components/Donate";
import "./styles/donate.css";

function App() {
  return (
    <div className="App">
      <Donate />  {/* ✅ Render your main component */}
    </div>
  );
}

export default App;
