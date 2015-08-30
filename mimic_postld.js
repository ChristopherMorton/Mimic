'use strict';

var mimic_canvas = $('#mimic_canvas')[0]
var mimic_context = mimic_canvas.getContext('2d');

/////////////////////////////////////////////////////////////////////
// Images ---


var img_pl_idle_n1 = new Image();
var img_pl_idle_n2 = new Image();
var img_pl_closed_n = new Image();
var img_pl_idle_e1 = new Image();
var img_pl_idle_e2 = new Image();
var img_pl_closed_e = new Image();
var img_pl_idle_s1 = new Image();
var img_pl_idle_s2 = new Image();
var img_pl_closed_s = new Image();
var img_pl_idle_w1 = new Image();
var img_pl_idle_w2 = new Image();
var img_pl_closed_w = new Image();

var img_pl_eat_n1 = new Image();
var img_pl_eat_n2 = new Image();
var img_pl_eat_n3 = new Image();
var img_pl_eat_n4 = new Image();
var img_pl_eat_n5 = new Image();
var img_pl_eat_n6 = new Image();
var img_pl_eat_n7 = new Image();
var img_pl_eat_n8 = new Image();
var img_pl_eat_e1 = new Image();
var img_pl_eat_e2 = new Image();
var img_pl_eat_e3 = new Image();
var img_pl_eat_e4 = new Image();
var img_pl_eat_e5 = new Image();
var img_pl_eat_e6 = new Image();
var img_pl_eat_e7 = new Image();
var img_pl_eat_e8 = new Image();
var img_pl_eat_s1 = new Image();
var img_pl_eat_s2 = new Image();
var img_pl_eat_s3 = new Image();
var img_pl_eat_s4 = new Image();
var img_pl_eat_s5 = new Image();
var img_pl_eat_s6 = new Image();
var img_pl_eat_s7 = new Image();
var img_pl_eat_s8 = new Image();
var img_pl_eat_w1 = new Image();
var img_pl_eat_w2 = new Image();
var img_pl_eat_w3 = new Image();
var img_pl_eat_w4 = new Image();
var img_pl_eat_w5 = new Image();
var img_pl_eat_w6 = new Image();
var img_pl_eat_w7 = new Image();
var img_pl_eat_w8 = new Image();

var img_enemy_n = new Image();
var img_enemy_e = new Image();
var img_enemy_s = new Image();
var img_enemy_w = new Image();
var img_enemy_sword_n = new Image();
var img_enemy_sword_e = new Image();
var img_enemy_sword_s = new Image();
var img_enemy_sword_w = new Image();
var img_enemy_hands_n = new Image();
var img_enemy_hands_e = new Image();
var img_enemy_hands_s = new Image();
var img_enemy_hands_w = new Image();

var img_wallN = new Image();
var img_wallE = new Image();
var img_wallW = new Image();
var img_wallS = new Image();
var img_cornerNE = new Image();
var img_cornerSE = new Image();
var img_cornerSW = new Image();
var img_cornerNW = new Image();
var img_endN = new Image();
var img_endE = new Image();
var img_endW = new Image();
var img_endS = new Image();
var img_middleNS = new Image();
var img_middleEW = new Image();
var img_rock1 = new Image();
var img_rock2 = new Image();
var img_rock3 = new Image();
var img_inside = new Image();

var img_sound = new Image();
var img_nosound = new Image();
var img_music = new Image();
var img_nomusic = new Image();

/////////////////////////////////////////////////////////////////////
// Sounds ---

var snd_ahah = new Audio('Mimic\ Ahah\ 1.ogg');
var snd_coin1 = new Audio('Mimic\ Coin\ 1.ogg');
var snd_coin2 = new Audio('Mimic\ Coin\ 2.ogg');
var snd_coin3 = new Audio('Mimic\ Coin\ 3.ogg');
var snd_die1 = new Audio('Mimic\ Die\ 1.ogg');
var snd_die2 = new Audio('Mimic\ Die\ 2.ogg');
var snd_eh2 = new Audio('Mimic\ Eh\ 2.ogg');
var snd_footstep1 = new Audio('Mimic\ Footstep\ 1.ogg');
var snd_footstep2 = new Audio('Mimic\ Footstep\ 2.ogg');
var snd_footstep4 = new Audio('Mimic\ Footstep\ 4.ogg');
var snd_huh1 = new Audio('Mimic\ Huh\ 1.ogg');
var snd_huh2 = new Audio('Mimic\ Huh\ 2.ogg');
var snd_monster1 = new Audio('Mimic\ Monster\ 1.ogg');
var snd_monster2 = new Audio('Mimic\ Monster\ 2.ogg');
var snd_ohoh = new Audio('Mimic\ Ohoh\ 1.ogg');
var snd_ooh = new Audio('Mimic\ Ooh\ 1.ogg');
var snd_qua = new Audio('Mimic\ Qua\ 1.ogg');
var snd_slurp1 = new Audio('Mimic\ Slurp\ 1.ogg');
var snd_slurp2 = new Audio('Mimic\ Slurp\ 2.ogg');
var snd_what = new Audio('Mimic\ What\ 1.ogg');

var snd_ambient = new Audio('Mimic\ Ambient.ogg');

var ambient_loop = new SeamlessLoop();
ambient_loop.addUri( 'Mimic\ Ambient.ogg', 32550, "ambient" );
ambient_loop.callback( startLoop );

function startLoop() {
   ambient_loop.start( "ambient" );
}

var snd_footsteps = [ snd_footstep1, snd_footstep2, snd_footstep4 ];
var snd_coins = [ snd_coin1, snd_coin2, snd_coin1, snd_coin3, snd_coin1, snd_coin2, snd_coin1 ]; 
var snd_huhs = [ snd_huh1, snd_what, snd_huh2, snd_eh2, snd_qua ];
var snd_greed = [ snd_ahah, snd_ohoh, snd_ooh ];
var snd_aggro = [ snd_monster1, snd_monster2, snd_die1, snd_die2 ];
var snd_slurps = [ snd_slurp1, snd_slurp2 ];

function mute() {
   snd_ahah.pause();
   snd_coin1.pause();
   snd_coin2.pause();
   snd_coin3.pause();
   snd_die1.pause();
   snd_die2.pause();
   snd_footstep1.pause();
   snd_footstep2.pause();
   snd_footstep4.pause();
   snd_huh1.pause();
   snd_huh2.pause();
   snd_monster1.pause();
   snd_monster2.pause();
   snd_ohoh.pause();
   snd_ooh.pause();
   snd_slurp1.pause();
   snd_slurp2.pause();
   
   ambient_loop.stop();

   muted = true;
}

function unmute() {
   muted = false;
   if (!music_muted) {
      ambient_loop.start( "ambient" );
   }
}

function toggleMute() {
   if (muted)
      unmute();
   else
      mute();
}

function toggleMusicMute() {
   if (music_muted) {
      if (!muted)
         ambient_loop.start( "ambient" );

      music_muted = false;
   } else {
      ambient_loop.stop();

      music_muted = true;
   }
}

/////////////////////////////////////////////////////////////////////
// Types ---

// Animation --

// Takes N images and a duration
function Animation( duration ) {
   this.duration = duration;
   this.cur = 0;
   this.images = [];
   for (var i = 1; i < arguments.length; ++i) {
      this.images.push( arguments[i] );
   }
   this.interval = this.duration / (this.images.length);
}

Animation.prototype.update = function ( dt ) {
   this.cur += dt;
   if (this.cur >= this.duration) {
      this.cur -= this.duration;
      return true;
   } else {
      return false;
   }
}

Animation.prototype.draw = function ( x, y ) {
   var image = this.images[ Math.floor( this.cur / this.interval ) ];
   mimic_context.drawImage( image, x, y );
}

// Terrain --
// Essentially an enumeration

function drawTerrain( t, x, y )
{
   var image = undefined;
   switch( t ) {
      case 1:
         image = img_wallN;
         break;
      case 2:
         image = img_wallE;
         break;
      case 3:
         image = img_wallS;
         break;
      case 4:
         image = img_wallW;
         break;
      case 5:
         image = img_cornerNE;
         break;
      case 6:
         image = img_cornerSE;
         break;
      case 7:
         image = img_cornerSW;
         break;
      case 8:
         image = img_cornerNW;
         break;
      case 9:
         image = img_endN;
         break;
      case 10:
         image = img_endW;
         break;
      case 11:
         image = img_endS;
         break;
      case 12:
         image = img_endE;
         break;
      case 13:
         image = img_middleNS;
         break;
      case 14:
         image = img_middleEW;
         break;
      case 15:
         image = img_rock1;
         break;
      case 16:
         image = img_rock2;
         break;
      case 17:
         image = img_rock3;
         break;
      case -1:
         //mimic_context.fillStyle = 'rgba(85,34,0,1)';
         image = img_inside;
         break;
      case -2:
         mimic_context.fillStyle = 'black';
         mimic_context.fillRect( x, y, BLOCK_SIZE + 1, BLOCK_SIZE + 1 );
      case 0:
      default:
         return;
   }

   if (image !== undefined) {
      mimic_context.drawImage( image, x, y );
   }
}

function drawFog( x, y ) {
   mimic_context.fillStyle = 'rgba(85,85,85,0.5)';
   mimic_context.fillRect( x, y, BLOCK_SIZE, BLOCK_SIZE );
}

// MapLoc --

function MapLoc( t ) {
   this.t = t;

   this.unit = undefined;

   this.visible = false;
   this.found = false;

   this.room = undefined;
   this.checkpoint = undefined;
}

/////////////////////////////////////////////////////////////////////
// Data ---

var game_over = false;
var game_complete = false;
var points = 0;
var checkpoint = { x: 1, y: 1 };
var enemies_defeated = {};
var fog_on = true;

var SCREEN_WIDTH = 15, SCREEN_HEIGHT = 15; // 600x600 px
var BLOCK_SIZE = 40; // This is the image size as well

var muted = false;
var music_muted = false;

// Map --

var MAP_WIDTH = 60, MAP_HEIGHT = 60;
var level = [ 
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // 0
"X.XXXXXXXXXX.......XXXXXXXXXXXXXXXXX...................XXXXX",
"X.XXX.XXX.XX.X.X.X.XXXXXXXXXXXXXXXXX.X.XXXXXXXXXXXXXXX.XXXXX",
"X.........XX.X...X.XXXXXXXXXXXXXXXXX.X..X............X.XXXXX",
"XXXXX.XXX.XX.X.X.X.XXXXXXXXXXXXXXXXX.X..X.........X..X.XXXXX",
"XXXXX.XXX.XX.......XXXXXXXXXXXXXXXXX.X..X.........X..X.XXXXX",
"XXXXX.....XX.XXXXXXXXXXXXXXXXXXXXXXX.XX.X.........XX.X.XXXXX",
"XXXXXXXXX.XX.XXXXXXXXXXXXXXXXXXXXXXX.X..X.........X..X.XXXXX",
"XXXXXXXXX.....XXXXXXXXXXXXXXXXXXXXXX.X..X.........X..X.XXXXX",
"XXXXXXXXXXX.X.XXXXXXXXXXXXXXXXXXXXXX.XXXXXXXX.XXXXXXXX.XXXXX", 
"AAAAAAAAXXX...XXXXXXXXXXXXXXXXXXXXXX...................XXXXX", // 10
"AaaaaaaAXXXX.XXX.X...XXXXXXXXXXXXXXX...................XXXXX",
"AaaaaaaAXXXX.XXX.X.X.XXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXX",
"AaaaaaaAXXXX.XXX.X.X.XXX...XXXXXXXXXXXXXXXXXX....XXXXXXXXXXX",
"Aaaaaaaa.........X.X.....X.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX",
"AaaaaaaAXXXXXXXX.X.X.XXX...XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX",
"AaaaaaaAXXXXXXXX.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX",
"AaaaaaaAXXXXXXXX...X.XXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX",
"AAAAAAAAXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXX.............XXXXXXX",
"XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXX",
"XXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXX.XXXXXXXXXXX.XXXXXXX", // 20
"XXXXXXXXXXXXXX...X...XXXXXXXXXXXXXXXXXXX.XXXXXXXCCCC.CCCCXXX",
"XXXXXXXXXXXXXX.X...X.XXXXXXXXXXXXXXXXXX...XXXXXXCcccccccCXXX",
"XXXXXXXXXXXXXX...X...XXXXXXXXXXXXXXXXXX...XXXXXXCcccccccCXXX",
"XXXXXXXXXXXXXX.X...X.XXXXXXXXXXXXXXXXXX...XXXXXXCcccccccCXXX",
"XX......XXXXXX...X...XXXXXXXXXXXXXXXXXX...XXXXXXCcccccccCXXX",
"XX......XXXXXX.X...X.XXXXXXXXXXXXXXXXXX...XXXXXXCCCCCCCCCXXX",
"XX.XXXX.XXXXXX...X...XXXXXXXXXXXXXXXXXX...XXXXXXXXXXXXXXXXXX",
"XX....X.XXXXXX.X...X.XXXXXXXXXXXXXXXXXX...XXXXXXXXXXXXXXXXXX",
"XX.XX.X.XXXXXX...X...XXXXXXXXXXXXXXXXXX...XXXXXXXXXXXXXXXXXX",
"XX.XX.X.XXXXXX.XXXXXXXXXXXXXXXXX.....XX...XXXXXXXXXXXXXXXXXX", // 30
"XX....X........XXXXXXXXXXXXXXXXX.....XX...XXXXXXXXXXXXXXXXXX",
"XX.XX.X.XXXXXX...XXXXXXXXXXXXXXX..X.......XXXXXXXXXXXXXXXXXX",
"XX.XX.X.XXXXXX.X.XXXXXXXXXXXXXXX.....XX...XXXXXXX........XXX",
"XX....X.XXXXXX...XXXXXXXXXXXXXXX.....XX...XXXXXX..........XX",
"XX.XXXX.XXXXXXXX.XXXXXXXXXXXXXXXXXXXXXX...XXXXXX...XXXX...XX",
"XX......XXXXXXXX.XXXXXXXXXXXXXXXXXXXXXX...XXXXXX..XX..XX..XX",
"XX......XXXXXXXX.XXXX.XXXXXXXXXXXXXXXXX...XXXXXX..X....X..XX",
"XXXXXXXXXXXXXXXX.XXXX.X.X.XXX...XXXXXXX...XXXXXX..X..XXX..XX",
"XXXXXXXXXXXXXXXX.XXXX.X.X.X.X.X.XXXXXXX...XXXXXX..X.......XX",
"XXXXXXXXXXXXXXX...XXX.X.X.X.X.X.XXXXXXX...XXXXXX..XX.....XXX", // 40
"XXXXXXXXXX....................X.XXXXXXXX.XXXXXXX...XXXXXXXXX",
"XXXXXXXXXX.XXXX...XXX.X.X.X.X.X.XXXXXXXX...................X",
"XXXXXXXXXX.XXXXX.XXXX.X.X.X.X.X.XXXXXXXXXXXXXXXX..XXXXXXXX.X",
"XXXXXXXXXX.XXXXX.XXXX.X.X.XXX...XXXXXXXXXXXXXXXX..XXXXXXXX.X",
"XXXXXXXXXX.XXXXX.XXXX.X.XXXXXXXXXXXXXXXXXXXXXXXX..XXXXXXXX.X",
"X..........XXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX..XXXXXXXX.X",
"X.XXXXXXXX.XXXXX.XXXXXXXXXXXXXXBBBBBBBBBBBBXXXXX..XXXXXXXX.X",
"X.X......X.XXXXX...XXXXXXXXXXXBBbbbbbbbbbbBBXXXX..XXXXXXXX.X",
"X.XXXXXX.X.XXXXXXX.XXXXXXXXXXXBbbbbbbbbbbbbBXXXX..XXXXXXXX.X",
"X......X.X.XXX...X...XXXXXXXXXBbbbbbbbbbbbbBXXXX..X.X.X....X", // 50
"X.XXXX.X.X.XXX.X.XXX.XXXXXXXXXBbbbbbbbbbbbbBXXXX..X.X.XX.XXX",
"X.X....X.X.XXX.....X...XXX....bbbbbbbbbbbbbb......X.X.XX.XXX",
"X.X.XXXX.X.XXX.X.X.XXX.XXX....bbbbbbbbbbbbbb......X.X.XX.XXX",
"X.X......X.XXX.......X...X....bbbbbbbbbbbbbb.....XX...XX.XXX",
"X.X.XXXXXX.XXX.X.X.X.XXX.X.XXXBbbbbbbbbbbbbBXXXXXXX.X.XX.XXX",
"X.X........XXX.............XXXBbbbbbbbbbbbbBXXXXXXX.X.XX.XXX",
"X.XXXXXXXX.XXXXXXXXXXXXXXXXXXXBbbbbbbbbbbbbBXXXXXXX.X.XX.XXX",
"X..........XXXXXXXXXXXXXXXXXXXBBbbbbbbbbbbBBXXXXXXX.X.....XX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXBBBBBBBBBBBBXXXXXXXXXXXXXXXXX" ]; // 59

// TODO: HI bonus

var map;


// Units --

var enemies = [];

/////////////////////////////////////////////////////////////////////
// Map ---

function mapAt( x, y, plusDir )
{
   if (plusDir === 0) y--;
   if (plusDir === 1) x++;
   if (plusDir === 2) y++;
   if (plusDir === 3) x--;

   return map[x][y];
}

function getDirection( x1, y1, x2, y2 )
{
   var dx = x2 - x1, dy = y2 - y1;

   if (dx < 0 && Math.abs( dx ) > Math.abs( dy ))
      return 3;
   if (dx > 0 && Math.abs( dx ) > Math.abs( dy ))
      return 1;
   if (dy < 0)
      return 0;
   if (dy >= 0)
      return 2;
}

function initMap( mapfile )
{
   map = new Array( MAP_WIDTH );
   for (var x = 0; x < MAP_WIDTH ; ++x) {
      map[x] = new Array( MAP_HEIGHT );
      for (var y = 0; y < MAP_HEIGHT ; ++y) {
         map[x][y] = new MapLoc( -1 );
      }
   }

   drawPaths();

   setCheckpoints();

   calculateEdges();

   spawnEnemies();
}
initMap();

function checkIntegrity()
{
   // Maybe a little excessive but whatever
   for (var x = 0; x < MAP_WIDTH ; ++x) {
      for (var y = 0; y < MAP_HEIGHT ; ++y) { 
         var unit = map[x][y].unit;
         if (unit !== undefined) {
            if (unit === 'player') {
               if ((player_x !== x || player_y !== y)
                     && player_state !== 'hop') {
                  map[x][y].unit = undefined;
               }
            } else {
               if ((unit.x !== x || unit.y !== y)
                     && unit.state !== 'hop') {
                  map[x][y].unit = undefined;
               }
            }
         }
      }
   }
}

function clearEnemies()
{
   enemies = [];
   for (var x = 0; x < MAP_WIDTH ; ++x) {
      for (var y = 0; y < MAP_HEIGHT ; ++y) { 
         map[x][y].unit = undefined;
      }
   }
}

function spawnEnemies()
{
   clearEnemies();
   var e;
   if (enemies_defeated['a1'] === undefined) {
      e = addEnemy( 5, 3, 1, 'a1' );
      enemyCreatePath( e, 9, 3, 2, 9, 6, 3, 5, 6, 0, 5, 3, 1 );
   }

   if (enemies_defeated['b1'] === undefined) {
      e = addEnemy( 11, 8, 2, 'b1' );
      enemyCreatePath( e, 11, 10, 1, 13, 10, 0, 13, 8, 3, 11, 8, 2 );
   }

   if (enemies_defeated['c1'] === undefined) {
      e = addEnemy( 12, 2, 0, 'c1' );
      enemyCreatePath( e, 12, 1, 1, 16, 1, 2, 16, 3, 3, 14, 3, 2, 14, 5, 1, 18, 5, 0, 18, 1, 3, 14, 1, 2, 14, 3, 1, 16, 3, 2, 16, 5, 3, 12, 5, 0 );
   }

   if (enemies_defeated['d1'] === undefined) {
      e = addEnemy( 2, 11, 3, 'd1' );
      enemyCreatePath( e, 1, 11, 2, 1, 17, 1, 6, 17, 0, 6, 11, 3 );
   }
   if (enemies_defeated['d2'] === undefined) {
      e = addEnemy( 5, 17, 1, 'd2' );
      enemyCreatePath( e, 6, 17, 0, 6, 11, 3, 1, 11, 2, 1, 17, 1 );
   }
   if (enemies_defeated['d3'] === undefined) {
      e = addEnemy( 2, 13, 0, 'd3' );
      enemyCreatePath( e, 2, 12, 1, 5, 12, 2, 5, 16, 3, 2, 16, 0 );
   }
   if (enemies_defeated['d4'] === undefined) {
      e = addEnemy( 5, 15, 2, 'd4' );
      enemyCreatePath( e, 5, 16, 3, 2, 16, 0, 2, 12, 1, 5, 12, 2 );
   }

   if (enemies_defeated['e1'] === undefined) {
      e = addEnemy( 25, 13, 3, 'e1' );
      enemyCreatePath( e, 24, 13, 2, 24, 15, 1, 26, 15, 0, 26, 13, 3 );
   }
   if (enemies_defeated['e2'] === undefined) {
      e = addEnemy( 25, 15, 1, 'e2' );
      enemyCreatePath( e, 26, 15, 0, 26, 13, 3, 24, 13, 2, 24, 15, 1 );
   }

   if (enemies_defeated['f1'] === undefined) {
      e = addEnemy( 14, 23, 0, 'f1' );
      enemyCreatePath( e, 14, 21, 1, 16, 21, 2, 16, 22, 1, 18, 22, 2, 18, 23, 1, 20, 23, 2, 20, 25, 3, 18, 25, 0, 18, 24, 3, 16, 24, 0, 16, 23, 3, 14, 23, 0 );
   }
   if (enemies_defeated['f2'] === undefined) {
      e = addEnemy( 18, 26, 2, 'f2' );
      enemyCreatePath( e, 18, 27, 1, 20, 27, 2, 20, 29, 3, 18, 29, 0, 18, 28, 3, 16, 28, 0, 16, 27, 3, 14, 27, 0, 14, 25, 1, 16, 25, 2, 16, 26, 1, 18, 26, 2 );
   } 
   if (enemies_defeated['f3'] === undefined) {
      e = addEnemy( 16, 29, 3, 'f3' );
      enemyCreatePath( e, 14, 29, 0, 14, 21, 1, 16, 21, 2, 16, 22, 1, 18, 22, 0, 18, 21, 1, 20, 21, 2, 20, 29, 3, 18, 29, 0, 18, 28, 3, 16, 28, 2, 16, 29, 3 );
   }
   if (enemies_defeated['f4'] === undefined) {
      e = addEnemy( 18, 24, 3, 'f4' );
      enemyCreatePath( e, 16, 24, 2, 16, 26, 1, 18, 26, 0, 18, 24, 3 );
   }

   if (enemies_defeated['g1'] === undefined) {
      e = addEnemy( 3, 25, 1, 'g1' );
      enemyCreatePath( e, 7, 25, 3, 2, 25, 1 );
   }
   if (enemies_defeated['g2'] === undefined) {
      e = addEnemy( 3, 37, 1, 'g2' );
      enemyCreatePath( e, 7, 37, 3, 2, 37, 1 );
   }
   if (enemies_defeated['g3'] === undefined) {
      e = addEnemy( 3, 28, 3, 'g3' );
      enemyCreatePath( e, 2, 28, 2, 2, 31, 1, 5, 31, 2, 5, 34, 3, 2, 34, 0, 2, 31, 1, 5, 31, 0, 5, 28, 3 );
   }
   if (enemies_defeated['g4'] === undefined) {
      e = addEnemy( 4, 31, 1, 'g4' );
      enemyCreatePath( e, 5, 31, 2, 5, 34, 3, 2, 34, 0, 2, 31, 1, 5, 31, 0, 5, 28, 3, 2, 28, 2, 2, 31, 1 );
   }
   if (enemies_defeated['g5'] === undefined) {
      e = addEnemy( 2, 33, 0, 'g5' );
      enemyCreatePath( e, 2, 31, 1, 5, 31, 0, 5, 28, 3, 2, 28, 2, 2, 31, 1, 5, 31, 2, 5, 34, 3, 2, 34, 0 );
   }

   if (enemies_defeated['h1'] === undefined) {
      e = addEnemy( 14, 34, 0, 'h1' );
      enemyCreatePath( e, 14, 32, 1, 16, 32, 2, 16, 34, 3, 14, 34, 0 );
   }
   if (enemies_defeated['h2'] === undefined) {
      e = addEnemy( 16, 32, 2, 'h2' );
      enemyCreatePath( e, 16, 34, 3, 14, 34, 0, 14, 32, 1, 16, 32, 2 );
   }

   if (enemies_defeated['i1'] === undefined) {
      e = addEnemy( 8, 48, 3, 'i1' );
      enemyCreatePath( e, 3, 48, 1, 8, 48, 2, 8, 54, 3, 4, 54, 1, 8, 54, 0, 8, 48, 3 );
   }
   if (enemies_defeated['i2'] === undefined) {
      e = addEnemy( 1, 58, 0, 'i2' );
      enemyCreatePath( e, 1, 46, 1, 10, 46, 2, 10, 58, 3, 1, 58, 0 );
   }
   if (enemies_defeated['i3'] === undefined) {
      e = addEnemy( 1, 50, 0, 'i3' );
      enemyCreatePath( e, 1, 46, 1, 10, 46, 2, 10, 56, 3, 3, 56, 0, 3, 52, 1, 6, 52, 0, 6, 50, 3, 1, 50, 0 );
   }

   if (enemies_defeated['j1'] === undefined) {
      e = addEnemy( 21, 41, 0, 'j1' );
      enemyCreatePath( e, 21, 37, 2, 21, 45, 0 );
   }
   if (enemies_defeated['j2'] === undefined) {
      e = addEnemy( 23, 41, 0, 'j2' );
      enemyCreatePath( e, 23, 38, 2, 23, 45, 0 );
   }
   if (enemies_defeated['j3'] === undefined) {
      e = addEnemy( 25, 41, 0, 'j3' );
      enemyCreatePath( e, 25, 38, 2, 25, 44, 0 );
   }
   if (enemies_defeated['j4'] === undefined) {
      e = addEnemy( 27, 41, 0, 'j4' );
      enemyCreatePath( e, 27, 37, 2, 27, 43, 0 );
   }
   if (enemies_defeated['j5'] === undefined) {
      e = addEnemy( 29, 41, 0, 'j5' );
      enemyCreatePath( e, 29, 38, 1, 31, 38, 2, 31, 44, 3, 29, 44, 0 );
   }
   if (enemies_defeated['j6'] === undefined) {
      e = addEnemy( 31, 41, 2, 'j6' );
      enemyCreatePath( e, 31, 44, 3, 29, 44, 0, 29, 38, 1, 31, 38, 2 );
   }

   if (enemies_defeated['k1'] === undefined) {
      e = addEnemy( 15, 50, 3, 'k1' );
      enemyCreatePath( e, 14, 50, 2, 14, 54, 1, 20, 54, 2, 20, 56, 3, 16, 56, 0, 16, 50, 3 );
   }
   if (enemies_defeated['k2'] === undefined) {
      e = addEnemy( 18, 53, 0, 'k2' );
      enemyCreatePath( e, 18, 52, 3, 14, 52, 2, 14, 56, 1, 16, 56, 0, 16, 54, 1, 18, 54, 0 );
   }

   // The Ballroom
   if (enemies_defeated['l1'] === undefined) {
      e = addEnemy( 31, 49, 2, 'l1' );
      enemyCreatePath( e, 31, 50, 0, 31, 49, 2 );
   }
   if (enemies_defeated['l2'] === undefined) {
      e = addEnemy( 31, 57, 0, 'l2' );
      enemyCreatePath( e, 31, 56, 2, 31, 57, 0 );
   }
   if (enemies_defeated['l3'] === undefined) {
      e = addEnemy( 42, 49, 2, 'l3' );
      enemyCreatePath( e, 42, 50, 0, 42, 49, 2 );
   }
   if (enemies_defeated['l4'] === undefined) {
      e = addEnemy( 42, 57, 0, 'l4' );
      enemyCreatePath( e, 42, 55, 2, 42, 57, 0 );
   }
   if (enemies_defeated['l5'] === undefined) {
      e = addEnemy( 37, 50, 3, 'l5' );
      enemyCreatePath( e, 33, 50, 2, 33, 57, 1, 37, 57, 0, 37, 50, 3 );
   }
   if (enemies_defeated['l6'] === undefined) {
      e = addEnemy( 38, 51, 3, 'l6' );
      enemyCreatePath( e, 34, 51, 2, 34, 58, 1, 38, 58, 0, 38, 51, 3 );
   }
   if (enemies_defeated['l7'] === undefined) {
      e = addEnemy( 37, 48, 1, 'l7' );
      enemyCreatePath( e, 40, 48, 2, 40, 54, 3, 37, 54, 0, 37, 48, 1 );
   }
   if (enemies_defeated['l8'] === undefined) {
      e = addEnemy( 36, 49, 1, 'l8' );
      enemyCreatePath( e, 39, 49, 2, 39, 55, 3, 36, 55, 0, 36, 49, 1 );
   }
   if (enemies_defeated['l9'] === undefined) {
      e = addEnemy( 40, 53, 3, 'l9' );
      enemyCreatePath( e, 34, 53, 1, 40, 53, 3 );
   }
   if (enemies_defeated['l10'] === undefined) {
      e = addEnemy( 41, 52, 3, 'l10' );
      enemyCreatePath( e, 35, 52, 1, 41, 52, 3 );
   }

   if (enemies_defeated['m1'] === undefined) {
      e = addEnemy( 49, 34, 0, 'm1' );
      enemyCreatePath( e, 49, 33, 1, 56, 33, 2, 56, 40, 3, 52, 40, 0, 52, 36, 1, 53, 36, 2, 53, 37, 3, 51, 37, 2, 51, 39, 1, 57, 39, 0, 57, 34, 3, 49, 34, 0 );
   }

   if (enemies_defeated['n1'] === undefined) {
      e = addEnemy( 39, 40, 0, 'n1' );
      enemyCreatePath( e, 39, 22, 2, 39, 40, 0 );
   }
   if (enemies_defeated['n2'] === undefined) {
      e = addEnemy( 40, 40, 0, 'n2' );
      enemyCreatePath( e, 40, 22, 2, 40, 40, 0 );
   }
   if (enemies_defeated['n3'] === undefined) {
      e = addEnemy( 41, 40, 0, 'n3' );
      enemyCreatePath( e, 41, 22, 2, 41, 40, 0 );
   }

   if (enemies_defeated['o1'] === undefined) {
      e = addEnemy( 36, 30, 3, 'o1' );
      enemyCreatePath( e, 32, 30, 2, 32, 34, 1, 36, 34, 0, 36, 30, 3 );
   }
   if (enemies_defeated['o2'] === undefined) {
      e = addEnemy( 32, 30, 2, 'o2' );
      enemyCreatePath( e, 32, 34, 1, 36, 34, 0, 36, 30, 3, 32, 30, 2 );
   }
   if (enemies_defeated['o3'] === undefined) {
      e = addEnemy( 32, 34, 1, 'o3' );
      enemyCreatePath( e, 36, 34, 0, 36, 30, 3, 32, 30, 2, 32, 34, 1 );
   }
   if (enemies_defeated['o4'] === undefined) {
      e = addEnemy( 36, 34, 0, 'o4' );
      enemyCreatePath( e, 36, 30, 3, 32, 30, 2, 32, 34, 1, 36, 34, 0 );
   }
   if (enemies_defeated['o5'] === undefined) {
      e = addEnemy( 33, 33, 0, 'o5' );
      enemyCreatePath( e, 33, 31, 1, 35, 31, 2, 35, 33, 3, 33, 33, 0 );
   }
   if (enemies_defeated['o6'] === undefined) {
      e = addEnemy( 33, 31, 1, 'o6' );
      enemyCreatePath( e, 35, 31, 2, 35, 33, 3, 33, 33, 0, 33, 31, 1 );
   }
   if (enemies_defeated['o7'] === undefined) {
      e = addEnemy( 35, 31, 2, 'o7' );
      enemyCreatePath( e, 35, 33, 3, 33, 33, 0, 33, 31, 1, 35, 31, 2 );
   }
   if (enemies_defeated['o8'] === undefined) {
      e = addEnemy( 35, 33, 3, 'o8' );
      enemyCreatePath( e, 33, 33, 0, 33, 31, 1, 35, 31, 2, 35, 33, 3 );
   }

   if (enemies_defeated['p1'] === undefined) {
      e = addEnemy( 55, 22, 3, 'p1' );
      enemyCreatePath( e, 49, 22, 2, 49, 23, 1, 51, 23, 2, 51, 24, 3, 49, 24, 2, 49, 25, 1, 55, 25, 0, 55, 24, 3, 53, 24, 0, 53, 23, 1, 55, 23, 0, 55, 22, 3 );
   }
   if (enemies_defeated['p2'] === undefined) {
      e = addEnemy( 49, 23, 1, 'p2' );
      enemyCreatePath( e, 51, 23, 2, 51, 24, 3, 49, 24, 2, 49, 25, 1, 55, 25, 0, 55, 24, 3, 53, 24, 0, 53, 23, 1, 55, 23, 0, 55, 22, 3, 49, 22, 2, 49, 23, 1 );
   }
   if (enemies_defeated['p3'] === undefined) {
      e = addEnemy( 51, 24, 3, 'p3' );
      enemyCreatePath( e, 49, 24, 2, 49, 25, 1, 55, 25, 0, 55, 24, 3, 53, 24, 0, 53, 23, 1, 55, 23, 0, 55, 22, 3, 49, 22, 2, 49, 23, 1, 51, 23, 2, 51, 24, 3 );
   }
   if (enemies_defeated['p4'] === undefined) {
      e = addEnemy( 49, 25, 1, 'p4' );
      enemyCreatePath( e, 55, 25, 0, 55, 24, 3, 53, 24, 0, 53, 23, 1, 55, 23, 0, 55, 22, 3, 49, 22, 2, 49, 23, 1, 51, 23, 2, 51, 24, 3, 49, 24, 2, 49, 25, 1 );
   }
   if (enemies_defeated['p5'] === undefined) {
      e = addEnemy( 55, 24, 3, 'p5' );
      enemyCreatePath( e, 53, 24, 0, 53, 23, 1, 55, 23, 0, 55, 22, 3, 49, 22, 2, 49, 23, 1, 51, 23, 2, 51, 24, 3, 49, 24, 2, 49, 25, 1, 55, 25, 0, 55, 24, 3 );
   }
   if (enemies_defeated['p6'] === undefined) {
      e = addEnemy( 53, 23, 1, 'p6' );
      enemyCreatePath( e, 55, 23, 0, 55, 22, 3, 49, 22, 2, 49, 23, 1, 51, 23, 2, 51, 24, 3, 49, 24, 2, 49, 25, 1, 55, 25, 0, 55, 24, 3, 53, 24, 0, 53, 23, 1 );
   }

   // Final Fort
   if (enemies_defeated['q1'] === undefined) {
      e = addEnemy( 45, 1, 3, 'q1' );
      enemyCreatePath( e, 36, 1, 2, 36, 6, 2, 36, 11, 1, 43, 11, 1, 54, 11, 0, 54, 6, 0, 54, 1, 3, 45, 1, 3 );
   }
   if (enemies_defeated['q2'] === undefined) {
      e = addEnemy( 43, 11, 1, 'q2' );
      enemyCreatePath( e, 54, 11, 0, 54, 6, 0, 54, 1, 3, 45, 1, 3, 36, 1, 2, 36, 6, 2, 36, 11, 1, 43, 11, 1 );
   }
   if (enemies_defeated['q3'] === undefined) {
      e = addEnemy( 54, 6, 1, 'q3' );
      enemyCreatePath( e, 54, 1, 3, 45, 1, 3, 36, 1, 2, 36, 6, 2, 36, 10, 1, 43, 10, 1, 54, 10, 0, 54, 6, 0 );
   }
   if (enemies_defeated['q4'] === undefined) {
      e = addEnemy( 36, 6, 2, 'q4' );
      enemyCreatePath( e, 36, 10, 1, 43, 10, 1, 54, 10, 0, 54, 6, 0, 54, 1, 3, 45, 1, 3, 36, 1, 2, 36, 6, 2 );
   }
   if (enemies_defeated['q5'] === undefined) {
      e = addEnemy( 39, 7, 3, 'q5' );
      enemyCreatePath( e, 38, 7, 1, 39, 7, 3 );
   }
   if (enemies_defeated['q6'] === undefined) {
      e = addEnemy( 39, 8, 3, 'q6' );
      enemyCreatePath( e, 38, 8, 1, 39, 8, 3 );
   }
   if (enemies_defeated['q7'] === undefined) {
      e = addEnemy( 52, 7, 3, 'q7' );
      enemyCreatePath( e, 51, 7, 1, 52, 7, 3 );
   }
   if (enemies_defeated['q8'] === undefined) {
      e = addEnemy( 52, 8, 3, 'q8' );
      enemyCreatePath( e, 51, 8, 1, 52, 8, 3 );
   }
   if (enemies_defeated['q9'] === undefined) {
      e = addEnemy( 41, 7, 2, 'q9' );
      enemyCreatePath( e, 41, 8, 1, 43, 8, 0, 43, 7, 3, 41, 7, 2 );
   }
   if (enemies_defeated['q10'] === undefined) {
      e = addEnemy( 43, 8, 0, 'q10' );
      enemyCreatePath( e, 43, 7, 3, 41, 7, 2, 41, 8, 1, 43, 8, 0 );
   }
   if (enemies_defeated['q11'] === undefined) {
      e = addEnemy( 41, 5, 2, 'q11' );
      enemyCreatePath( e, 41, 6, 1, 43, 6, 0, 43, 5, 3, 41, 5, 2 );
   }
   if (enemies_defeated['q12'] === undefined) {
      e = addEnemy( 43, 6, 0, 'q12' );
      enemyCreatePath( e, 43, 5, 3, 41, 5, 2, 41, 6, 1, 43, 6, 0 );
   }
   if (enemies_defeated['q13'] === undefined) {
      e = addEnemy( 49, 7, 2, 'q13' );
      enemyCreatePath( e, 49, 8, 3, 47, 8, 0, 47, 7, 1, 49, 7, 2 );
   }
   if (enemies_defeated['q14'] === undefined) {
      e = addEnemy( 47, 8, 0, 'q14' );
      enemyCreatePath( e, 47, 7, 1, 49, 7, 2, 49, 8, 3, 47, 8, 0 );
   }
   if (enemies_defeated['q15'] === undefined) {
      e = addEnemy( 49, 5, 2, 'q15' );
      enemyCreatePath( e, 49, 6, 3, 47, 6, 0, 47, 5, 1, 49, 5, 2 );
   }
   if (enemies_defeated['q16'] === undefined) {
      e = addEnemy( 47, 6, 0, 'q16' );
      enemyCreatePath( e, 47, 5, 1, 49, 5, 2, 49, 6, 3, 47, 6, 0 );
   }
   if (enemies_defeated['q17'] === undefined) {
      e = addEnemy( 44, 3, 1, 'q17' );
      enemyCreatePath( e, 45, 3, 1, 46, 3, 3, 45, 3, 3, 44, 3, 1 );
      e.alwayswary = true;
   }
}


function drawPaths()
{
   // Read from 'level'

   for (var y = 0; y < level.length; ++y) {
      var x_str = level[y];
      for (var x = 0; x < MAP_WIDTH; ++x) {
         var map_char = x_str.charAt( x );

         if (map_char !== 'X') {
            if (map_char !== '.')
               map[x][y].room = map_char.toLowerCase();

            if (map_char === map_char.toLowerCase())
               map[x][y].t = 0;
         }
      }
   }
}

function setCheckpoints()
{
   map[1][1].checkpoint = true;
   map[12][14].checkpoint = true;
   map[16][40].checkpoint = true;
   map[26][55].checkpoint = true;
   map[41][42].checkpoint = true;
   map[46][13].checkpoint = true;
}

function warpToCheckpoint( i )
{
   var x, y;
   if ( i === 2 ) {
      x = 12;
      y = 14;
   } else if ( i === 3 ) {
      x = 16;
      y = 40;
   } else if ( i === 4 ) {
      x = 26;
      y = 55;
   } else if ( i === 5 ) {
      x = 41;
      y = 42;
   } else if ( i === 6 ) {
      x = 46;
      y = 13;
   } else {
      x = 1;
      y = 1;
   }

   if (player_state === 'hop')
      mapAt( player_x, player_y, player_facing ).unit = undefined;

   playerMove( x, y );
}

function findEdge( x, y )
{
   var edges = {};
   if (x > 0) {
      if (map[x-1][y].t === 0)
         edges['w'] = true;
   }
   if (y > 0) {
      if (map[x][y-1].t === 0)
         edges['n'] = true;
   }
   if (x < MAP_WIDTH - 1) {
      if (map[x+1][y].t === 0)
         edges['e'] = true;
   }
   if (y < MAP_WIDTH - 1) {
      if (map[x][y+1].t === 0)
         edges['s'] = true;
   }

   if (edges['n'] && edges['e'] && edges['s'] && edges['w'])
      return 15 + Math.floor( Math.random() * 3 ); // 3 types of rocks
   else if (edges['n'] && edges['e'] && edges['s'])
      return 12;
   else if (edges['n'] && edges['e'] && edges['s'])
      return 12;
   else if (edges['e'] && edges['s'] && edges['w'])
      return 11;
   else if (edges['n'] && edges['s'] && edges['w'])
      return 10;
   else if (edges['n'] && edges['e'] && edges['w'])
      return 9;
   else if (edges['n'] && edges['s'])
      return 13;
   else if (edges['e'] && edges['w'])
      return 14;
   else if (edges['n'] && edges['w'])
      return 8;
   else if (edges['s'] && edges['w'])
      return 7;
   else if (edges['s'] && edges['e'])
      return 6;
   else if (edges['n'] && edges['e'])
      return 5;
   else if (edges['n'])
      return 1;
   else if (edges['e'])
      return 2;
   else if (edges['s'])
      return 3;
   else if (edges['w'])
      return 4;
   else
      return -1;
}

function calculateEdges()
{
   for (var x = 0; x < MAP_WIDTH ; ++x) {
      for (var y = 0; y < MAP_HEIGHT ; ++y) {
         if (map[x][y].t !== 0) {
            map[x][y].t = findEdge( x, y );
         }
      }
   }

}

function visibleSquare( x, y )
{
   for (var j = x - 1; j <= x + 1; ++j) {
      for (var k = y - 1; k <= y + 1; ++k) {
         map[j][k].visible = true;
         map[j][k].found = true;
      }
   }
}

function calculateVision()
{
   for (var x = 0; x < MAP_WIDTH ; ++x) {
      for (var y = 0; y < MAP_HEIGHT ; ++y) {
         map[x][y].visible = false;
      }
   }
   
   if (player_state === 'closed') {
      visibleSquare( player_x, player_y );
      return;
   }

   var room = map[player_x][player_y].room;
   if (room !== undefined) {
      for (var x = 0; x < MAP_WIDTH ; ++x) {
         for (var y = 0; y < MAP_HEIGHT ; ++y) {
            if (map[x][y].room === room) {
               map[x][y].visible = true;
               map[x][y].found = true;
            }
         }
      }
   }

   // Look in each direction
   for (var x = player_x; x < MAP_WIDTH - 1; ++x) {
      if (map[x][player_y].t === 0)
         visibleSquare( x, player_y );
      else
         break;
   }
   for (var x = player_x; x > 0; --x) {
      if (map[x][player_y].t === 0)
         visibleSquare( x, player_y );
      else
         break;
   }
   for (var y = player_y; y < MAP_HEIGHT - 1; ++y) {
      if (map[player_x][y].t === 0)
         visibleSquare( player_x, y );
      else
         break;
   }
   for (var y = player_y; y > 0; --y) {
      if (map[player_x][y].t === 0)
         visibleSquare( player_x, y );
      else
         break;
   }

}

/////////////////////////////////////////////////////////////////////
// Player ---

var player_x = 1, player_y = 1;
var player_offset_x = 0, player_offset_y = 0;

var player_facing = 2; // 0-N, 1-E, 2-S, 3-W;

var player_state = 'idle';
var player_lag = 0;
var player_next_state = undefined;

var pl_anim_idle = [];
var pl_anim_closed = [];
var pl_anim_eat = [];

// Setup animations
pl_anim_idle.push( new Animation( 1200, img_pl_idle_n1, img_pl_idle_n2 ) );
pl_anim_idle.push( new Animation( 1200, img_pl_idle_e1, img_pl_idle_e2 ) );
pl_anim_idle.push( new Animation( 1200, img_pl_idle_s1, img_pl_idle_s2 ) );
pl_anim_idle.push( new Animation( 1200, img_pl_idle_w1, img_pl_idle_w2 ) );
pl_anim_closed.push( new Animation( 1000, img_pl_closed_n ) );
pl_anim_closed.push( new Animation( 1000, img_pl_closed_e ) );
pl_anim_closed.push( new Animation( 1000, img_pl_closed_s ) );
pl_anim_closed.push( new Animation( 1000, img_pl_closed_w ) );

pl_anim_eat.push( new Animation( 500, img_pl_eat_n1, img_pl_eat_n2, img_pl_eat_n3, img_pl_eat_n4, img_pl_eat_n5, img_pl_eat_n6, img_pl_eat_n7, img_pl_eat_n8 ) );
pl_anim_eat.push( new Animation( 500, img_pl_eat_e1, img_pl_eat_e2, img_pl_eat_e3, img_pl_eat_e4, img_pl_eat_e5, img_pl_eat_e6, img_pl_eat_e7, img_pl_eat_e8 ) );
pl_anim_eat.push( new Animation( 500, img_pl_eat_s1, img_pl_eat_s2, img_pl_eat_s3, img_pl_eat_s4, img_pl_eat_s5, img_pl_eat_s6, img_pl_eat_s7, img_pl_eat_s8 ) );
pl_anim_eat.push( new Animation( 500, img_pl_eat_w1, img_pl_eat_w2, img_pl_eat_w3, img_pl_eat_w4, img_pl_eat_w5, img_pl_eat_w6, img_pl_eat_w7, img_pl_eat_w8 ) );

function drawPlayer() {
   var middle = 7 * BLOCK_SIZE;

   if (player_state === 'idle')
      pl_anim_idle[player_facing].draw( middle, middle );

   if (player_state === 'hop')
      pl_anim_idle[player_facing].draw( middle + player_offset_x, middle + player_offset_y );

   if (player_state === 'closed')
      pl_anim_closed[player_facing].draw( middle, middle );

   if (player_state === 'eating') {
      if (player_facing === 0)
         pl_anim_eat[0].draw( middle, middle - BLOCK_SIZE );
      if (player_facing === 1)
         pl_anim_eat[1].draw( middle, middle );
      if (player_facing === 2)
         pl_anim_eat[2].draw( middle, middle );
      if (player_facing === 3)
         pl_anim_eat[3].draw( middle - BLOCK_SIZE, middle );
   }
}

var hop_speed = [1,1,2,5,6,7,7,6,5,2,1,1];
var hop_index = 0;
function updatePlayer( dt ) {
   if (player_lag > 0) {
      player_lag--;
      if (player_lag <= 0)
         playerChangeState( player_next_state );
   }

   if (player_state === 'idle' || player_state === 'hop')
      pl_anim_idle[player_facing].update( dt );

   if (player_state === 'hop') {
      var dhop = hop_speed[ hop_index++ ];
      if (player_facing === 0) {
         player_offset_y -= dhop;
         if (dhop === undefined || player_offset_y <= -40) {
            playerMove( player_x, player_y - 1 );
         }
      } else if (player_facing === 1) {
         player_offset_x += dhop;
         if (dhop === undefined || player_offset_x >= 40) {
            playerMove( player_x + 1, player_y );
         }
      } else if (player_facing === 2) {
         player_offset_y += dhop;
         if (dhop === undefined || player_offset_y >= 40) {
            playerMove( player_x, player_y + 1 );
         }
      } else if (player_facing === 3) {
         player_offset_x -= dhop;
         if (dhop === undefined || player_offset_x <= -40) {
            playerMove( player_x - 1, player_y );
         }
      }
   }

   if (player_state === 'eating') {
      if (pl_anim_eat[player_facing].update( dt ) )
         playerChangeState( 'idle' );
   }
}

function playerChangeState( state )
{
   if (state) {
      if (state === 'eating') {
         // No lag, also initiate sound
         player_state = state;
         player_next_state = undefined;

         if (!muted) {
            var rand = (Math.random()<0.5)?0:1;
            snd_slurps[rand].currentTime = 0;
            snd_slurps[rand].volume = 1.0;
            snd_slurps[rand].play();
         }

      } else if (player_lag <= 0) {
         player_state = state;
         player_next_state = undefined;
         player_lag = 3;
      } else {
         player_next_state = state;
      }
   }
}

var which_sound = 0;
function playerMove( x, y )
{
   // Update map
   map[player_x][player_y].unit = undefined;
   map[x][y].unit = 'player';

   player_x = x;
   player_y = y;
   playerChangeState( 'idle' );
   player_offset_x = 0;
   player_offset_y = 0;
   hop_index = 0;

   if (map[x][y].checkpoint) {
      checkpoint.x = x;
      checkpoint.y = y;
   }

   // Coin sound
   if (!muted) {
      which_sound++;
      snd_coins[which_sound % 7].currentTime = 0;
      snd_coins[which_sound % 7].volume = 0.3;
      snd_coins[which_sound % 7].play();
   }

   for (var j = x - 3; j <= x + 3; ++j) {
      if (j < 0 || j >= MAP_WIDTH) continue;
      for (var k = y - 3; k <= y + 3; ++k) {
         if (k < 0 || k >= MAP_HEIGHT) continue;

         var enemy = map[j][k].unit;
         if (enemy !== undefined && enemy !== 'player' && enemy.mental_state !== 'aggro') {
            if ( Math.abs( j-x ) !== 3 || Math.abs( k-y ) !== 3 ) { // ez distance, ignore corners
               enemy.alerted = { x: x, y: y };
               enemy.paranoia++;
            }
         }
      }
   }

   // Check for instant next move by held keys
   if (player_facing === 0 && up_held)
      playerTryHop();
   else if (player_facing === 1 && right_held)
      playerTryHop();
   else if (player_facing === 2 && down_held)
      playerTryHop();
   else if (player_facing === 3 && left_held)
      playerTryHop();
   else if (up_held && !right_held && !down_held && !left_held) {
      player_facing = 0;
      playerTryHop();
   } else if (!up_held && right_held && !down_held && !left_held) {
      player_facing = 1;
      playerTryHop();
   } else if (!up_held && !right_held && down_held && !left_held) {
      player_facing = 2;
      playerTryHop();
   } else if (!up_held && !right_held && !down_held && left_held) {
      player_facing = 3;
      playerTryHop();
   }
}

function playerTryHop()
{
   // Is there terrain in the way?
   var to_x = player_x, to_y = player_y;
   if (player_facing === 0) to_y--;
   if (player_facing === 1) to_x++;
   if (player_facing === 2) to_y++;
   if (player_facing === 3) to_x--;

   if (to_x < 0 || to_y < 0 || to_x >= MAP_WIDTH || to_y >= MAP_HEIGHT)
      return false;

   if (map[to_x][to_y].t !== 0)
      return false;

   if (map[to_x][to_y].unit !== undefined && map[to_x][to_y].unit !== 'player')
      return false;

   playerChangeState( 'hop' );
   map[to_x][to_y].unit = 'player';
   return true;
}

/////////////////////////////////////////////////////////////////////
// Enemies ---

var enemy_images = [];
enemy_images.push( img_enemy_n );
enemy_images.push( img_enemy_e );
enemy_images.push( img_enemy_s );
enemy_images.push( img_enemy_w );

var enemy_swords = [];
enemy_swords.push( img_enemy_sword_n );
enemy_swords.push( img_enemy_sword_e );
enemy_swords.push( img_enemy_sword_s );
enemy_swords.push( img_enemy_sword_w );

var enemy_hands = [];
enemy_hands.push( img_enemy_hands_n );
enemy_hands.push( img_enemy_hands_e );
enemy_hands.push( img_enemy_hands_s );
enemy_hands.push( img_enemy_hands_w );

function Enemy( x, y, face, id ) {
   this.x = x;
   this.y = y;
   this.facing = face;
   this.id = id;

   this.next_x = x;
   this.next_y = y;

   this.state = 'waiting';
   this.mental_state = 'normal'; // 'normal', 'wary', 'greedy', 'aggro'
   this.lag = 0;

   this.path = []; // [ { face, x, y } ... ]
   this.chasepath = []; // [ { face, x, y } ... ]

   this.los = 5; // How many squares ahead he can see
   this.current_los = 5; // How many squares are currently visible

   this.hop_index = 0;
   this.offset_x = 0;
   this.offset_y = 0;

   this.next_state = '';
   this.next_facing = 0;
   this.follow_direction = undefined;

   this.voice = Math.floor( Math.random() * 4 );

   this.paranoia = 0;
}

function addEnemy( x, y, face, id )
{
   var e = new Enemy( x, y, face, id );
   enemies.push( e );
   map[x][y].unit = e;
   return e;
}

function drawEnemy( enemy, x, y )
{
   var x, y, middle = BLOCK_SIZE * 7;
   x = ((enemy.x - player_x) * BLOCK_SIZE) + middle + enemy.offset_x;
   y = ((enemy.y - player_y) * BLOCK_SIZE) + middle + enemy.offset_y;

   if (enemy.state === 'aggro_kill') {
      // Draw stab motion
      var dx = 0, dy = 0;
      if (enemy.facing === 0) dy = -((8 - enemy.lag) * 2);
      if (enemy.facing === 2) dy = ((8 - enemy.lag) * 2);
      if (enemy.facing === 3) dx = -((8 - enemy.lag) * 2);
      if (enemy.facing === 1) dx = ((8 - enemy.lag) * 2);
      mimic_context.drawImage( enemy_swords[enemy.facing], x + dx, y + dy );

   } else if (enemy.state === 'greedy_kill') {
      // Draw reaching out
      if (enemy.lag < 100) {
         if (enemy.lag < 0) enemy.lag = 0;
         var dx = 0, dy = 0;
         if (enemy.facing === 0) dy = -((100 - enemy.lag) * 0.14);
         if (enemy.facing === 2) dy = ((100 - enemy.lag) * 0.14);
         if (enemy.facing === 3) dx = -((100 - enemy.lag) * 0.14);
         if (enemy.facing === 1) dx = ((100 - enemy.lag) * 0.14);
         mimic_context.drawImage( enemy_hands[enemy.facing], x + dx, y + dy );
      }
   }
   // Draw enemy sprite
   if (enemy.facing === undefined || enemy.facing < 0 || enemy.facing > 3)
      mimic_context.drawImage( enemy_images[0], x, y );
   else
      mimic_context.drawImage( enemy_images[enemy.facing], x, y );

   if (enemy.state !== 'greedy_kill' && enemy.state !== 'aggro_kill') {
      // Draw vision dots
      x += (BLOCK_SIZE / 2);
      y += (BLOCK_SIZE / 2);
      var dx = 0, dy = 0;
      if (enemy.facing === 0) dy = -(BLOCK_SIZE / 2.1);
      if (enemy.facing === 2) dy = (BLOCK_SIZE / 2.1);
      if (enemy.facing === 3) dx = -(BLOCK_SIZE / 2.1);
      if (enemy.facing === 1) dx = (BLOCK_SIZE / 2.1);

      for (var i = 0; i < enemy.los * 2; ++i) {
         if (i > enemy.current_los * 2)
            break;

         x += dx;
         y += dy;
         mimic_context.beginPath();
         mimic_context.fillStyle = "white";
         mimic_context.arc(x, y, 1.5, 0, 2 * Math.PI, false);
         mimic_context.fill();
      }
   }
}

function drawEnemies()
{
   for (var i = 0; i < enemies.length; ++i) {
      var e = enemies[i];
      if (e.x >= player_x - 15 && e.y >= player_y - 15
       && e.x <= player_x + 15 && e.y <= player_y + 15) {
         if (map[e.x][e.y].visible || map[e.next_x][e.next_y].visible || !fog_on)
            drawEnemy( e );
      }
   }
}

function enemyCheckVision( enemy )
{
   var x = enemy.x, y = enemy.y;
   var dx = 0, dy = 0;
   if (enemy.facing === 0) dy = -1;
   if (enemy.facing === 2) dy = 1;
   if (enemy.facing === 3) dx = -1;
   if (enemy.facing === 1) dx = 1;

   var seen = false;
   var i;
   for (i = 0; i < enemy.los; ++i) {
      x += dx;
      y += dy;
      if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT)
         break;
      if (map[x][y].unit === 'player') {
         seen = true;
         enemy.last_seen = { x: x, y: y };
         if (player_state !== 'closed') {
            // Aggro
            if (enemy.mental_state !== 'aggro') {
               enemy.mental_state = 'aggro';
               if (enemy.state === 'lookingaround')
                  enemy.chasepath.unshift( { x: enemy.x, y: enemy.y, face: enemy.next_facing } );
               else
                  enemy.chasepath.unshift( { x: enemy.x, y: enemy.y, face: enemy.facing } );
               enemy.lag = 0;
               enemy.state = 'waiting';
               enemy.next_state = 'waiting';

               if (!muted) {
                  var player_distance = Math.sqrt( Math.pow((enemy.x - player_x), 2) + Math.pow((enemy.y - player_y), 2 ) );
                  snd_aggro[enemy.voice].currentTime = 0;
                  snd_aggro[enemy.voice].volume = (9 - player_distance) / 11;
                  snd_aggro[enemy.voice].play();
               }

               enemy.alerted = undefined;
            }
         } else if (enemy.mental_state !== 'aggro') {
            // Greed
            if (enemy.mental_state !== 'greedy') {
               enemy.mental_state = 'greedy';
               if (enemy.state === 'lookingaround')
                  enemy.chasepath.unshift( { x: enemy.x, y: enemy.y, face: enemy.next_facing } );
               else
                  enemy.chasepath.unshift( { x: enemy.x, y: enemy.y, face: enemy.facing } );
               enemy.lag = 40;
               enemy.state = 'waiting';
               enemy.next_state = 'waiting';
               enemy.next_facing = enemy.facing;
               if (!muted) {
                  var player_distance = Math.sqrt( Math.pow((enemy.x - player_x), 2) + Math.pow((enemy.y - player_y), 2 ) );
                  snd_greed[enemy.voice % 3].currentTime = 0;
                  snd_greed[enemy.voice % 3].volume = (9 - player_distance) / 11;
                  snd_greed[enemy.voice % 3].play();
               }

               enemy.alerted = undefined;
            }
         }
      }
      if (map[x][y].t !== 0)
         break; // Can't see through walls
   }

   enemy.current_los = i;

   if (enemy.mental_state === 'greedy' && !seen) {
      enemy.mental_state = 'aggro';
      // Must have moved
   }
   if (enemy.mental_state === 'aggro' && seen && player_state === 'hop') {
      enemy.follow_direction = player_facing;
      // Follow direction
   } else if (enemy.mental_state === 'aggro' && !seen && enemy.last_seen === undefined) {
      enemy.mental_state = 'wary';
      // Lost him
   }
}

var enemy_hop_speed = [1,1,1,1,1,1,1,1,1,1,1,1];
function updateEnemy( enemy, dt )
{
   enemyCheckVision( enemy );

   if (enemy.state === 'greedy_kill') {
      enemy.lag--;
      if (enemy.lag <= 0) {
         if (mapAt( enemy.x, enemy.y, enemy.facing ).unit === 'player') {
            player_facing = getDirection( player_x, player_y, enemy.x, enemy.y );
            playerChangeState( 'eating' );
            points += 100;

            // Remove enemy from game
            for (var i = enemies.length - 1; i >= 0; i--) {
                if (enemies[i].x === enemy.x && enemies[i].y === enemy.y) {
                    enemies.splice(i, 1);
                    break;
                }
            }
            map[enemy.x][enemy.y].unit = undefined;
            enemies_defeated[ enemy.id ] = true;
         } else {
            enemy.state = 'waiting';
         }
      }
      return;
   }
   if (enemy.state === 'aggro_kill') {
      enemy.lag--;
      if (enemy.lag <= 0) {
         // Kill you
         if (mapAt( enemy.x, enemy.y, enemy.facing ).unit === 'player') {
            // GAME OVER - the bad kind
            game_over = true;

         } else {
            enemy.state = 'waiting';
         }
      }

      return;
   }

   if (enemy.lag > 0) {
      enemy.lag--;
      if (enemy.lag === 0) {
         enemy.state = enemy.next_state;
         enemy.facing = enemy.next_facing;

      } else
         return;
   }

   if (enemy.state === 'waiting') {
      // Try next movement
      enemy.next_x = enemy.x, enemy.next_y = enemy.y;
      if (enemy.facing === 0) {
         enemy.next_y -= 1;
      } else if (enemy.facing === 1) {
         enemy.next_x += 1;
      } else if (enemy.facing === 2) {
         enemy.next_y += 1;
      } else if (enemy.facing === 3) {
         enemy.next_x -= 1;
      }

      if (map[enemy.next_x][enemy.next_y].unit === undefined || map[enemy.next_x][enemy.next_y].unit === enemy) {
         enemy.state = 'hop';
         map[enemy.next_x][enemy.next_y].unit = enemy;
      } else if (enemy.mental_state === 'greedy' && map[enemy.next_x][enemy.next_y].unit === 'player') {
         enemy.state = 'greedy_kill';
         enemy.lag = 120;
      } else if (enemy.mental_state === 'aggro' && map[enemy.next_x][enemy.next_y].unit === 'player') {
         enemy.state = 'aggro_kill';
         enemy.lag = 8;
      } else if (enemy.alerted !== undefined) {
         // Copied from the one in enemyMove
         if (enemy.lag <= 0)
            enemy.next_facing = enemy.facing;

         if (mapAt( enemy.x, enemy.y, enemy.next_facing ).t !== 0)
            enemy.next_facing = (enemy.next_facing + 2) % 4;

         enemy.facing = getDirection( enemy.x, enemy.y, enemy.alerted.x, enemy.alerted.y );

         enemy.state = 'lookingaround';
         enemy.next_state = 'waiting';
         enemy.lag = 80;

         enemy.alerted = undefined;

         // Sound: Huh? only play if you don't also spot the mimic
         enemyCheckVision( enemy );

         if (!muted && enemy.mental_state !== 'aggro' && enemy.mental_state !== 'greedy') {
            var player_distance = Math.sqrt( Math.pow((enemy.x - player_x), 2) + Math.pow((enemy.y - player_y), 2 ) );
            if (player_distance <= 9) {
               which_sound++;
               snd_huhs[which_sound % 5].currentTime = 0;
               snd_huhs[which_sound % 5].volume = (9 - player_distance) / 11;
               snd_huhs[which_sound % 5].play();
            }
         }
      }
   } 
   if (enemy.state === 'hop') {
      var dhop = 1; //enemy_hop_speed[ enemy.hop_index++ ];
      if (enemy.facing === 0) {
         enemy.offset_y -= dhop;
         if (enemy.offset_y <= -40) {
            enemyMove( enemy, enemy.x, enemy.y - 1 );
         }
      } else if (enemy.facing === 1) {
         enemy.offset_x += dhop;
         if (enemy.offset_x >= 40) {
            enemyMove( enemy, enemy.x + 1, enemy.y );
         }
      } else if (enemy.facing === 2) {
         enemy.offset_y += dhop;
         if (enemy.offset_y >= 40) {
            enemyMove( enemy, enemy.x, enemy.y + 1 );
         }
      } else if (enemy.facing === 3) {
         enemy.offset_x -= dhop;
         if (enemy.offset_x <= -40) {
            enemyMove( enemy, enemy.x - 1, enemy.y );
         }
      }
   }
}

function updateEnemies()
{
   for (var i = 0; i < enemies.length; ++i)
      updateEnemy( enemies[i] );
}

var next_footstep = 0;
function enemyMove( enemy, x, y )
{
   // Update map
   map[enemy.x][enemy.y].unit = undefined;
   map[x][y].unit = enemy;

   enemy.x = x;
   enemy.y = y;
   enemy.offset_x = 0;
   enemy.offset_y = 0;
   enemy.hop_index = 0;
   enemy.state = 'waiting';

   // Sound: step
   if (!muted) {
      var player_distance = Math.sqrt( Math.pow((x - player_x), 2) + Math.pow((y - player_y), 2 ) );
      if (player_distance <= 9) {
         next_footstep = (next_footstep + 1) % 3;
         snd_footsteps[next_footstep].currentTime = 0;
         snd_footsteps[next_footstep].volume = ( 9 - player_distance ) / 9;
         snd_footsteps[next_footstep].play();
      }
   }

   if (x === enemy.path[0].x && y === enemy.path[0].y 
         && enemy.mental_state !== 'aggro' && enemy.mental_state !== 'greedy') {
      // Path point reached
      var path_point = enemy.path.shift();
      enemy.path.push( path_point ); // Cycle the path

      // Setup next move
      enemy.next_facing = path_point.face;
      enemy.next_state = 'waiting';
      enemy.lag = 80;

      enemy.chasepath = []; // Clear, since we're on the main path
      if (enemy.mental_state === 'wary')
         enemy.mental_state = 'normal';

   } else if (enemy.chasepath.length > 0 && x === enemy.chasepath[0].x && y === enemy.chasepath[0].y 
         && enemy.mental_state !== 'aggro' && enemy.mental_state !== 'greedy') {
      // chasePath point reached
      var path_point = enemy.chasepath.shift();

      // Next move
      enemy.facing = path_point.face;
      enemy.state = 'waiting';
   }

   if (enemy.mental_state === 'aggro') {
      if (enemy.last_seen !== undefined && enemy.follow_direction !== undefined &&
                  x === enemy.last_seen.x && y === enemy.last_seen.y ) {
         // Chase
         var way_back = (enemy.facing + 2) % 4;

         enemy.facing = enemy.follow_direction;
         enemy.next_facing = enemy.follow_direction;
         enemy.follow_direction = undefined;

         enemy.last_seen = undefined;

         enemyCheckVision( enemy );

         if (enemy.last_seen !== undefined) {
            // Still in his sights
            enemy.chasepath.unshift( { x: x, y: y, face: way_back } ); // The way back

            enemy.lag = 5;
            enemy.next_state = 'waiting';
         } else {
            enemy.next_facing = way_back;
            enemy.lag = 80;
            enemy.next_state = 'waiting';
         }

      } else if (mapAt( x, y, enemy.facing ).unit === 'player') {
         // He kills you
         enemy.state = 'aggro_kill';
         enemy.lag = 10;
      } else if (mapAt( x, y, enemy.facing ).t !== 0) {
         // Lost him
         enemy.mental_state = 'wary';
         enemy.next_facing = (enemy.facing + 2) % 4;
         enemy.lag = 80;
         enemy.next_state = 'waiting';
      }
      
   } else if (enemy.mental_state === 'greedy') {
      if (mapAt( x, y, enemy.facing ).unit === 'player') {
         // You kill him
         enemy.state = 'greedy_kill';
         enemy.lag = 120;
      }

   } else if (enemy.alerted !== undefined) {
      if (enemy.lag <= 0)
         enemy.next_facing = enemy.facing;

      if (mapAt( x, y, enemy.next_facing ).t !== 0)
         enemy.next_facing = (enemy.next_facing + 2) % 4;

      enemy.facing = getDirection( enemy.x, enemy.y, enemy.alerted.x, enemy.alerted.y );

      enemy.state = 'lookingaround';
      enemy.next_state = 'waiting';
      enemy.lag = 80;

      enemy.alerted = undefined;

      // Sound: Huh? only play if you don't also spot the mimic
      enemyCheckVision( enemy );

      if (!muted && enemy.mental_state !== 'aggro' && enemy.mental_state !== 'greedy') {
         var player_distance = Math.sqrt( Math.pow((enemy.x - player_x), 2) + Math.pow((enemy.y - player_y), 2 ) );
         if (player_distance <= 9) {
            which_sound++;
            snd_huhs[which_sound % 5].currentTime = 0;
            snd_huhs[which_sound % 5].volume = (9 - player_distance) / 11;
            snd_huhs[which_sound % 5].play();
         }
      }

   } else if (enemy.mental_state === 'wary' || enemy.alwayswary) {
      if (Math.random() < 0.2) {
         // Random turn
         var pos_turns = [];
         if (mapAt(x, y, (enemy.facing + 3) % 4).t === 0 ) // Turn left
            pos_turns.push( -1 );
         else if (mapAt(x, y, (enemy.facing + 1) % 4).t === 0 ) // Turn right
            pos_turns.push( 1 );
         else if (mapAt(x, y, (enemy.facing + 2) % 4).t === 0 ) // About face
            pos_turns.push( 2 );

         enemy.next_facing = enemy.facing;
         if (mapAt( x, y, enemy.facing ).t !== 0)
            enemy.next_facing = (enemy.next_facing + 2) % 4;

         enemy.facing = (enemy.facing + pos_turns[Math.floor( Math.random() * pos_turns.length )] ) % 4;

         enemy.state = 'lookingaround';
         enemy.lag = 80;
         enemy.next_state = 'waiting';

         enemy.paranoia--;
         if (enemy.paranoia <= 0)
            enemy.mental_state = 'normal';
      }
   }

   if (mapAt( x, y, enemy.facing ).t !== 0) {
      if (mapAt(x, y, (enemy.facing + 1) % 4).t === 0 ) // Turn right
         enemy.facing = (enemy.facing + 1) % 4;
      else if (mapAt(x, y, (enemy.facing + 2) % 4).t === 0 ) // About face
         enemy.facing = (enemy.facing + 2) % 4;
      else if (mapAt(x, y, (enemy.facing + 3) % 4).t === 0 ) // Turn left
         enemy.facing = (enemy.facing + 3) % 4;
   }
}

function enemyCreatePath( enemy )
{
   for (var i = 1; i < arguments.length; i += 3) {
      var x = arguments[i];
      var y = arguments[i+1];
      var face = arguments[i+2];

      var path_point = { face: face, x: x, y: y };

      enemy.path.push( path_point );
   }
}

/////////////////////////////////////////////////////////////////////
// Logic ---

function updateWinCondition()
{
   if (enemies.length === 0) {
      game_over = true;
      game_complete = true;
      return true;
   } else
      return false;
}

function respawn()
{
   spawnEnemies();
   player_x = checkpoint.x;
   player_y = checkpoint.y;
   hop_index = 0;
   playerChangeState( 'idle' );
   map[player_x][player_y].unit = 'player';

   points = Math.floor( points / 2 );
   game_over = false;
}

/////////////////////////////////////////////////////////////////////
// Controls ---

var space_down = false;
var hop_locked = false;

var right_held = false;
var left_held = false;
var up_held = false;
var down_held = false;

function onKeyDown( e ) {
   // Accept Space/Shift, and Arrows/ASDF
   if (game_over && !game_complete && e.which === 13) {
      respawn();
   } else if (player_state !== 'closed' && player_state !== 'hop' && player_state !== 'eating' && player_lag <= 0) {
      if ( e.which === 32 || e.which === 16 ) {
         space_down = true;
         playerChangeState( 'closed' );
      }
      else if ( !hop_locked && ( e.which === 38 || e.which === 87 ) ) {
         // Up
         hop_locked = true;
         player_facing = 0;
         playerTryHop();
         hop_locked = false;
      }
      else if (!hop_locked && ( e.which === 39 || e.which === 68  ) ) {
         // Right
         hop_locked = true;
         player_facing = 1;
         playerTryHop();
         hop_locked = false;
      }
      else if (!hop_locked && ( e.which === 40 || e.which === 83 ) ) {
         // Down
         hop_locked = true;
         player_facing = 2;
         playerTryHop();
         hop_locked = false;
      }
      else if (!hop_locked && ( e.which === 37 || e.which === 65 ) ) {
         // Left
         hop_locked = true;
         player_facing = 3;
         playerTryHop();
         hop_locked = false;
      }
      else if (e.which >= 49 && e.which <= 54) {
         warpToCheckpoint( e.which - 48 );
      }
   }

   // Held key data
   if ( e.which === 38 || e.which === 87 )
      up_held = true;
   if ( e.which === 39 || e.which === 68 )
      right_held = true;
   if ( e.which === 40 || e.which === 83 )
      down_held = true;
   if ( e.which === 37 || e.which === 65 )
      left_held = true;

}
$(document).keydown( onKeyDown );

function onKeyUp( e ) {
   if ( (e.which === 32 || e.which === 16) && player_state !== 'eating' ) {
      space_down = false;
      playerChangeState( 'idle' );
   }

   // Held key data
   if ( e.which === 38 || e.which === 87 )
      up_held = false;
   if ( e.which === 39 || e.which === 68 )
      right_held = false;
   if ( e.which === 40 || e.which === 83 )
      down_held = false;
   if ( e.which === 37 || e.which === 65 )
      left_held = false;
}
$(document).keyup( onKeyUp );

var onClick = function( e ) {
   var x_pix = e.pageX - mimic_canvas.offsetLeft;
   var y_pix = e.pageY - mimic_canvas.offsetTop;

   if (x_pix > 560 && y_pix < 40)
      toggleMute();
   else if (x_pix > 560 && y_pix < 80)
      toggleMusicMute();
}
$('#mimic_canvas').click( onClick ); 
/////////////////////////////////////////////////////////////////////
// Draw ---

function centerMap()
{
   mimic_context.restore();
   mimic_context.save();
   mimic_context.translate( -player_offset_x, -player_offset_y );
}

function drawFloor()
{
   mimic_context.fillStyle = "gray";
   mimic_context.fillRect( -BLOCK_SIZE, -BLOCK_SIZE, 600 + (BLOCK_SIZE * 2), 600 + (BLOCK_SIZE * 2) );
}

function drawGui()
{
   mimic_context.strokeStyle = 'black';
   mimic_context.lineWidth = 2;

   mimic_context.fillStyle = "rgba(255,204,0,1)";
   mimic_context.font = "32px arial";
   mimic_context.strokeText(points, 8 + player_offset_x, 36 + player_offset_y);
   mimic_context.fillText(points, 8 + player_offset_x, 36 + player_offset_y);

   if (muted)
      mimic_context.drawImage( img_nosound, 565 + player_offset_x, 5 + player_offset_y );
   else
      mimic_context.drawImage( img_sound, 565 + player_offset_x, 5 + player_offset_y );

   if (music_muted)
      mimic_context.drawImage( img_nomusic, 565 + player_offset_x, 45 + player_offset_y );
   else
      mimic_context.drawImage( img_music, 565 + player_offset_x, 45 + player_offset_y );

   if (enemies.length > 0) {
      mimic_context.fillStyle = "white";
      mimic_context.font = "18px arial";
      var enemy_string = enemies.length + ' adventurers remain';
      var width = enemy_string.width( "18px arial" );

      mimic_context.strokeText( enemy_string, 596 - width + player_offset_x, 596 + player_offset_y );
      mimic_context.fillText( enemy_string, 596 - width + player_offset_x, 596 + player_offset_y );
   }

   if (game_over && !game_complete) {
      mimic_context.fillStyle = "rgba(205,0,0,1)";
      fitText( mimic_context, "You have been slain", 150, 450, 130, 48, "48px arial", true, true, false );
      fitText( mimic_context, "Press Enter to respawn", 150, 450, 375, 32, "32px arial", true, true, false); 
   } else if (game_over && game_complete) {
      mimic_context.fillStyle = "white";
      fitText( mimic_context, "That's the lot of em! Delicious!", 150, 450, 50, 56, "56px arial", true, true, false );
      fitText( mimic_context, "Thanks for playing!", 150, 450, 460, 36, "36px arial", true, true, false );
   }
}

String.prototype.width = function(font) {
  var f = font || '12px arial',
      o = $('<div>' + this + '</div>')
            .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
            .appendTo($('body')),
      w = o.width();

  o.remove();

  return w;
}
   
function fitText( mimic_context, text, x_min, x_max, y_min, font_size, font, centered, stroke, first_line_offset )
{
   var text_split = text.split(' ');
   var text_bit = '', text_bit_temp = '';
   var text_width = 0;
   var y = y_min + font_size;

   mimic_context.font = font;

   for (var i = 0; i < text_split.length; ++i) {
      text_bit_temp += text_split[i];
      text_width = text_bit_temp.width( font );
      if (text_width + x_min > x_max) { // Can't add that bit
         if (centered) {
            if (stroke)
               mimic_context.strokeText( text_bit, (x_min + x_max - text_bit.width( font )) / 2 , y );
            mimic_context.fillText( text_bit, (x_min + x_max - text_bit.width( font )) / 2 , y );
         } else {
            if (stroke)
               mimic_context.strokeText( text_bit, x_min, y );
            mimic_context.fillText( text_bit, x_min, y );
         }

         text_bit = text_bit_temp = text_split[i] + ' ';
         y += font_size;
      } else {
         text_bit_temp += ' ';
         text_bit = text_bit_temp;
      }
   }
   if (text_bit) {
      if (centered) {
         if (stroke)
            mimic_context.strokeText( text_bit, (x_min + x_max - text_bit.width( font )) / 2 , y );
         mimic_context.fillText( text_bit, (x_min + x_max - text_bit.width( font )) / 2 , y );
      } else {
         if (stroke)
            mimic_context.strokeText( text_bit, x_min, y );
         mimic_context.fillText( text_bit, x_min, y );
      }

      return y;
   }
   return y - font_size;
}

/////////////////////////////////////////////////////////////////////
// Loop ---

var draw = function() {
   centerMap();

   calculateVision();

   drawFloor();
   drawPlayer();
   drawEnemies();

   // Terrain
   var draw_x = -BLOCK_SIZE, draw_y;
   for (var x = player_x - 8; x <= player_x + 8 ; ++x) {
      draw_y = -BLOCK_SIZE;
      for (var y = player_y - 8; y <= player_y + 8; ++y) {
         var ter, vis, found;
         if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_WIDTH) {
            ter = -1;
            vis = false;
            found = false;
         } else {
            ter = map[x][y].t;
            vis = map[x][y].visible;
            found = map[x][y].found;
         }
         if (!found && fog_on) {
            drawTerrain( -2, draw_x, draw_y );
         } else if (!vis && fog_on) {
            drawTerrain( ter, draw_x, draw_y );
            drawFog( draw_x, draw_y );
         } else {
            drawTerrain( ter, draw_x, draw_y );
         }
         draw_y += BLOCK_SIZE;
      }
      draw_x += BLOCK_SIZE;
   }

   drawGui();
}

var update = function( dt ) {
   if (!game_over) {
      updatePlayer( dt );
      updateEnemies();
      updateWinCondition();
   } else {

   }
}

var bug_check = 0;
var main = function() {
   requestAnimationFrame( main );

   update( 17 );
   draw();

   if (bug_check++ > 30) {
      bug_check = 0;

      checkIntegrity();
   }
}

function start() {
   main();
}

// Load images --
var images_ready = 0;
var total_images = 73;

function addReadyImage() {
   images_ready++;
   if (images_ready === total_images) {
      start();
   }
}

function loadImage( img, src ) {
   img.onload = addReadyImage;
   img.src = src;
}

loadImage( img_pl_idle_n1, "MimicIdleN1.png" );
loadImage( img_pl_idle_n2, "MimicIdleN2.png" );
loadImage( img_pl_closed_n, "MimicClosedN.png" );
loadImage( img_pl_idle_e1, "MimicIdleE1.png" );
loadImage( img_pl_idle_e2, "MimicIdleE2.png" );
loadImage( img_pl_closed_e, "MimicClosedE.png" );
loadImage( img_pl_idle_s1, "MimicIdleS1.png" );
loadImage( img_pl_idle_s2, "MimicIdleS2.png" );
loadImage( img_pl_closed_s, "MimicClosedS.png" );
loadImage( img_pl_idle_w1, "MimicIdleW1.png" );
loadImage( img_pl_idle_w2, "MimicIdleW2.png" );
loadImage( img_pl_closed_w, "MimicClosedW.png" );

loadImage( img_pl_eat_n1, "MimicEat1N.png" );
loadImage( img_pl_eat_n2, "MimicEat2N.png" );
loadImage( img_pl_eat_n3, "MimicEat3N.png" );
loadImage( img_pl_eat_n4, "MimicEat4N.png" );
loadImage( img_pl_eat_n5, "MimicEat5N.png" );
loadImage( img_pl_eat_n6, "MimicEat6N.png" );
loadImage( img_pl_eat_n7, "MimicEat7N.png" );
loadImage( img_pl_eat_n8, "MimicEat8N.png" );
loadImage( img_pl_eat_e1, "MimicEat1E.png" );
loadImage( img_pl_eat_e2, "MimicEat2E.png" );
loadImage( img_pl_eat_e3, "MimicEat3E.png" );
loadImage( img_pl_eat_e4, "MimicEat4E.png" );
loadImage( img_pl_eat_e5, "MimicEat5E.png" );
loadImage( img_pl_eat_e6, "MimicEat6E.png" );
loadImage( img_pl_eat_e7, "MimicEat7E.png" );
loadImage( img_pl_eat_e8, "MimicEat8E.png" );
loadImage( img_pl_eat_s1, "MimicEat1S.png" );
loadImage( img_pl_eat_s2, "MimicEat2S.png" );
loadImage( img_pl_eat_s3, "MimicEat3S.png" );
loadImage( img_pl_eat_s4, "MimicEat4S.png" );
loadImage( img_pl_eat_s5, "MimicEat5S.png" );
loadImage( img_pl_eat_s6, "MimicEat6S.png" );
loadImage( img_pl_eat_s7, "MimicEat7S.png" );
loadImage( img_pl_eat_s8, "MimicEat8S.png" );
loadImage( img_pl_eat_w1, "MimicEat1W.png" );
loadImage( img_pl_eat_w2, "MimicEat2W.png" );
loadImage( img_pl_eat_w3, "MimicEat3W.png" );
loadImage( img_pl_eat_w4, "MimicEat4W.png" );
loadImage( img_pl_eat_w5, "MimicEat5W.png" );
loadImage( img_pl_eat_w6, "MimicEat6W.png" );
loadImage( img_pl_eat_w7, "MimicEat7W.png" );
loadImage( img_pl_eat_w8, "MimicEat8W.png" );

loadImage( img_enemy_n, "EnemyN.png" );
loadImage( img_enemy_e, "EnemyE.png" );
loadImage( img_enemy_s, "EnemyS.png" );
loadImage( img_enemy_w, "EnemyW.png" );
loadImage( img_enemy_sword_n, "EnemySwordN.png" );
loadImage( img_enemy_sword_e, "EnemySwordE.png" );
loadImage( img_enemy_sword_s, "EnemySwordS.png" );
loadImage( img_enemy_sword_w, "EnemySwordW.png" );
loadImage( img_enemy_hands_n, "EnemyHandsN.png" );
loadImage( img_enemy_hands_e, "EnemyHandsE.png" );
loadImage( img_enemy_hands_s, "EnemyHandsS.png" );
loadImage( img_enemy_hands_w, "EnemyHandsW.png" );

loadImage( img_wallN, 'WallN.png' );
loadImage( img_wallE, 'WallE.png' );
loadImage( img_wallS, 'WallS.png' );
loadImage( img_wallW, 'WallW.png' );
loadImage( img_cornerNE, 'CornerNE.png' );
loadImage( img_cornerSE, 'CornerSE.png' );
loadImage( img_cornerSW, 'CornerSW.png' );
loadImage( img_cornerNW, 'CornerNW.png' );
loadImage( img_endN, 'EndN.png' );
loadImage( img_endE, 'EndE.png' );
loadImage( img_endS, 'EndS.png' );
loadImage( img_endW, 'EndW.png' );
loadImage( img_middleNS, 'MiddleNS.png' );
loadImage( img_middleEW, 'MiddleEW.png' );
loadImage( img_rock1, 'Rock1.png' );
loadImage( img_rock2, 'Rock2.png' );
loadImage( img_rock3, 'Rock3.png' );
loadImage( img_inside, 'Inside.png' );

loadImage( img_sound, 'Sound.png' );
loadImage( img_nosound, 'NoSound.png' );
loadImage( img_music, 'Music.png' );
loadImage( img_nomusic, 'NoMusic.png' );
