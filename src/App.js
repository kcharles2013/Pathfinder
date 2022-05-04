import './App.css';
import './components/colorScheme.css';
import Header from "./components/Header";
import Grid from "./components/Grid";
import Footer from "./components/Footer";
import Settings from "./components/settings";
import "./components/eventListeners";
import {eventListenersHandler} from "./components/eventListeners";

function App() {
    // SETS ALL EVENT LISTENERS;
    eventListenersHandler();
  return (
    <div className="App light-color-scheme" id="App">
        <Settings />
        <Header />
        <Grid />
        <Footer />
    </div>
  );
}

export default App;
