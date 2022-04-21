// import logo from './logo.svg';
import './App.css';
import './components/colorScheme.css';
import Header from "./components/Header";
import Grid from "./components/Grid";
import Footer from "./components/Footer";
import Settings from "./components/settings";
import BrowserHandler from "./components/browserHandler";
import Legend from "./components/legend";

function App() {
  return (
    <div className="App">
        <Settings />
        {/*<Legend />*/}
        <Header />
        <Grid />
        <Footer />
        {/*<Settings />*/}
        <BrowserHandler />
    </div>
  );
}

export default App;
