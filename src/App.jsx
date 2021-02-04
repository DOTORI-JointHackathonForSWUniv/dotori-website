import logo from "./logo.svg";
import "./App.css";
import FirebaseTest from "./pages/FirebaseTest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FirebaseTest />
      </header>
    </div>
  );
}

export default App;
