import './App.css';
import './components/colorScheme.css';
import Header from "./components/Header";
import Grid from "./components/Grid";
import Footer from "./components/Footer";
import Settings from "./components/settings";

// SET THE APPs THEME;
window.addEventListener("load",  () => {
    let classes = document.getElementById("App").classList;
    let currentScheme;
    for (let i = 0; i < classes.length; i++){
        console.log(`Class: ${classes[i]}`);
        switch (classes[i]) {
            case ('dark-color-scheme'):
                currentScheme = classes[i];
                console.log("true");
                break;
            case ('medium-color-scheme'):
                currentScheme = classes[i];
                break;
            case ('light-color-scheme'):
                currentScheme = classes[i];
                break;
            default:
                break;
        }
    }
    console.log(currentScheme);
    document.getElementById(currentScheme).classList.replace('settings-option-indicator-false', 'settings-option-indicator-true');
});

function App() {
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
