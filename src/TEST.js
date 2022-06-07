let bear = {
    sound: 'roar',
    roar(){
        console.log(this.sound);

    }
}

bear.sound = 'grunt';
let bearSound = bear.roar;
bearSound();