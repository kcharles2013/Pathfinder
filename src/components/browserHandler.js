// let possibleBrowser = ['Chrome', 'Firefox', 'Safari'];
// const ua = navigator.userAgent;
const ba = navigator.userAgent;

console.log("Browser script is working");
// document.getElementById('footer-container').classList.add('safari-mobile-browser');
const footer = document.getElementById('footer-container');
footer.classList.add('safari-mobile-browser');
// alert(ba);

// if (ba.indexOf(possibleBrowser[2]) > -1){
    // document.getElementById('footer-container').classList.add('safari-mobile-browser');
    // console.log(document.getElementById('footer-container').classList);
    // alert('You are using a safari-browser');
// }

// for (let i = 0; i < possibleBrowser.length; i++){
//     if (ba.indexOf(ba[i]) > -1){
//
//     }
// }
alert(`userAgent: ${ba}`);
// alert(`browser.family: ${ua.browser.family.toString()}`);
// alert(`os.family: ${ua.os.family.toString()}`);
// if (navigator.userAgent.indexOf("Safari") !== -1){
//     document.getElementById('footer-container').classList.add('safari-mobile-browser');