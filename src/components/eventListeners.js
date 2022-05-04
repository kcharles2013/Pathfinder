export function eventListenersHandler(){
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

    // SETS THE INITIAL ANIMATION CLASS FOR SETTINGS PAGE: ON LOAD;
    window.addEventListener('load', function (){
        // console.log("Page has loaded: ", `width, height: ${window.innerWidth}, ${window.innerHeight}`);
        if (window.innerWidth <= 810) {
            document.getElementById('settings-container').classList.replace('settings-container-anim', 'settings-container-mobile-anim');
        }
    });

// UPDATES THE SETTINGS ANIMATION BASED ON RESIZING OF THE SCREEN'S WIDTH;
    window.addEventListener('resize', function(){
        // console.log(`Window width: ${window.innerWidth}`);
        let isMobile = true;
        for (let i = 0; i < document.getElementById('settings-container').classList.length; i++){
            if (document.getElementById('settings-container').classList[i] === 'settings-container-anim'){
                isMobile = false;
            }
        }
        if (window.innerWidth <= 767 && isMobile === false){
            document.getElementById('settings-container').classList.replace('settings-container-anim', 'settings-container-mobile-anim');
        } else if (window.innerWidth > 767){
            document.getElementById('settings-container').classList.replace('settings-container-mobile-anim', 'settings-container-anim');
        }
    });
}