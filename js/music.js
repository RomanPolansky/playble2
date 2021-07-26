const bgSound = new Howl({
    src: bgSoundURI,
    loop: true,
    autoplay: true,
});

const clickSound = new Howl({
    src: clickSoundURI
});

const starSound = new Howl({
    src: starSoundURI
});

const bingoSound = new Howl({
    src: bingoSoundURI
});
  
bgSound.play();