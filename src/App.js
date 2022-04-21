// import logo from './logo.svg';
import './App.css';
import './components/colorScheme.css';
import Header from "./components/Header";
import Grid from "./components/Grid";
import Footer from "./components/Footer";
import Settings from "./components/settings";
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
    </div>
  );
}

export default App;
