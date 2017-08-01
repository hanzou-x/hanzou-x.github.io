MEDIA_PATH = "";
game.module(
  'game.main'
)
.require(
  'engine.core',
  'engine.particle',
  'game.assets',
  'game.objects',
  'game.scenes'
)
.body(function(){

  game.Storage.id = 'net.pandajs.flyingdog';
  game.System.idtkScale = 'ScaleAspectFill';
  game.System.canvasContainerId = 'canvas_container';
  game.System.position = 'inherit';

  game.start(SceneGame, 768, 1024);

});

