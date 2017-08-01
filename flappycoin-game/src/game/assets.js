game.module(
  'game.assets'
)
.require(
  'engine.sound'
)
.body(function() {

  // Sprites
  game.addAsset(MEDIA_PATH + 'media/coin1.png');
  game.addAsset(MEDIA_PATH + 'media/coin2.png');
  game.addAsset(MEDIA_PATH + 'media/coin3.png');
  // game.addAsset(MEDIA_PATH + 'media/logo2.png');
  game.addAsset(MEDIA_PATH + 'media/logo1.png');
  game.addAsset(MEDIA_PATH + 'media/cloud4.png');
  game.addAsset(MEDIA_PATH + 'media/cloud3.png');
  game.addAsset(MEDIA_PATH + 'media/cloud2.png');
  game.addAsset(MEDIA_PATH + 'media/cloud1.png');
  game.addAsset(MEDIA_PATH + 'media/ground.png');
  game.addAsset(MEDIA_PATH + 'media/bushes.png');
  game.addAsset(MEDIA_PATH + 'media/parallax3.png');
  game.addAsset(MEDIA_PATH + 'media/parallax2.png');
  game.addAsset(MEDIA_PATH + 'media/parallax1.png');
  game.addAsset(MEDIA_PATH + 'media/particle.png');
  game.addAsset(MEDIA_PATH + 'media/particle2.png');
  game.addAsset(MEDIA_PATH + 'media/bar.png');
  game.addAsset(MEDIA_PATH + 'media/gameover.png');
  game.addAsset(MEDIA_PATH + 'media/new.png');
  game.addAsset(MEDIA_PATH + 'media/restart.png');
  game.addAsset(MEDIA_PATH + 'media/poweredby.png');
  game.addAsset(MEDIA_PATH + 'media/soundon.png');
  game.addAsset(MEDIA_PATH + 'media/soundoff.png');

  // Font
  game.addAsset(MEDIA_PATH + 'media/font.fnt');

  // Sounds
  game.addSound(MEDIA_PATH + 'media/sound/explosion.m4a', 'explosion');
  game.addSound(MEDIA_PATH + 'media/sound/jump.m4a', 'jump');
  game.addSound(MEDIA_PATH + 'media/sound/score.m4a', 'score');
  game.addSound(MEDIA_PATH + 'media/sound/highscore.m4a', 'highscore');

  // Music
  game.addMusic(MEDIA_PATH + 'media/sound/music.m4a', 'music');
});

