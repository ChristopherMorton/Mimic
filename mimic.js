'use strict';

var LOG = $( "#log" );

var canvas = $('#mimic_canvas')[0]
var context = canvas.getContext('2d');

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

/////////////////////////////////////////////////////////////////////
// Sounds ---

var snd_ahah = new Audio('Mimic\ Ahah\ 1.ogg');
var snd_coin1 = new Audio('Mimic\ Coin\ 1.ogg');
var snd_coin2 = new Audio('Mimic\ Coin\ 2.ogg');
var snd_coin3 = new Audio('Mimic\ Coin\ 3.ogg');
var snd_die1 = new Audio('Mimic\ Die\ 1.ogg');
var snd_die2 = new Audio('Mimic\ Die\ 2.ogg');
var snd_footstep1 = new Audio('Mimic\ Footstep\ 1.ogg');
var snd_footstep2 = new Audio('Mimic\ Footstep\ 2.ogg');
var snd_footstep3 = new Audio('Mimic\ Footstep\ 3.ogg');
var snd_footstep4 = new Audio('Mimic\ Footstep\ 4.ogg');
var snd_huh1 = new Audio('Mimic\ Huh\ 1.ogg');
var snd_huh2 = new Audio('Mimic\ Huh\ 2.ogg');
var snd_monster1 = new Audio('Mimic\ Monster\ 1.ogg');
var snd_monster2 = new Audio('Mimic\ Monster\ 2.ogg');
var snd_ohoh = new Audio('Mimic\ Ohoh\ 1.ogg');
var snd_ooh = new Audio('Mimic\ Ooh\ 1.ogg');

var snd_footsteps = [ snd_footstep1, snd_footstep2, snd_footstep3, snd_footstep4 ];
var snd_coins = [ snd_coin1, snd_coin2, snd_coin1, snd_coin3, snd_coin1, snd_coin2, snd_coin1 ]; 
var snd_huhs = [ snd_huh1, snd_huh2 ];
var snd_greed = [ snd_ahah, snd_ohoh, snd_ooh ];
var snd_aggro = [ snd_monster1, snd_monster2, snd_die1, snd_die2 ];

function mute() {
   snd_ahah.pause();
   snd_coin1.pause();
   snd_coin2.pause();
   snd_coin3.pause();
   snd_die1.pause();
   snd_die2.pause();
   snd_footstep1.pause();
   snd_footstep2.pause();
   snd_footstep3.pause();
   snd_footstep4.pause();
   snd_huh1.pause();
   snd_huh2.pause();
   snd_monster1.pause();
   snd_monster2.pause();
   snd_ohoh.pause();
   snd_ooh.pause();
   muted = true;
}

function unmute() {
   muted = false;
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
      this.cur = this.duration - 1;
      return true;
   } else {
      return false;
   }
}

Animation.prototype.draw = function ( x, y ) {
   var image = this.images[ Math.floor( this.cur / this.interval ) ];
   context.drawImage( image, x, y );
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
         //context.fillStyle = 'rgba(85,34,0,1)';
         image = img_inside;
         break;
      case -2:
         context.fillStyle = 'black';
         context.fillRect( x, y, BLOCK_SIZE + 1, BLOCK_SIZE + 1 );
      case 0:
      default:
         return;
   }

   if (image !== undefined) {
      context.drawImage( image, x, y );
   }
}

function drawFog( x, y ) {
   context.fillStyle = 'rgba(85,85,85,0.5)';
   context.fillRect( x, y, BLOCK_SIZE, BLOCK_SIZE );
}

// MapLoc --

function MapLoc( t ) {
   this.t = t;

   this.unit = undefined;

   this.visible = false;
   this.found = false;

   this.room = undefined;
}

/////////////////////////////////////////////////////////////////////
// Data ---

var game_over = false;
var checkpoint = 0;
var enemies_defeated = {};

var SCREEN_WIDTH = 15, SCREEN_HEIGHT = 15; // 600x600 px
var BLOCK_SIZE = 40; // This is the image size as well

var HOP_DURATION = 250;

// Map --

var MAP_WIDTH = 60, MAP_HEIGHT = 60;
var level = [ 
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"X.XXXXXXXXXX.......XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"X.XXXXXXX.XX.X.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"X.........XX.X...X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXX.XXX.XX.X.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXX.XXX.XX.......XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXX.....XX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXX.XX.XXX.....XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"AAAAAAAAX.....XX.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"AaaaaaaAXXX.X.XX.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"AaaaaaaAXXX...XX.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"AaaaaaaAXXXX.XXX.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"Aaaaaaaa.........X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"AaaaaaaAXXXXXXXX.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"AaaaaaaAXXXXXXXX.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"AaaaaaaAXXXXXXXX.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"AAAAAAAAXXXXXXXX.X.X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXX.....XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" ];

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

   calculateEdges();

   spawnEnemies();
}
initMap();

function spawnEnemies()
{
   var e;
   if (enemies_defeated['a'] === undefined) {
      e = addEnemy( 5, 3, 1, 'a' );
      enemyCreatePath( e, 9, 3, 2, 9, 6, 3, 5, 6, 0, 5, 3, 1 );
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
   /*
   map[1][2].t = 0;
   map[1][3].t = 0;
   map[4][2].t = 0;
   map[4][3].t = 0;
   map[5][2].t = 0;
   map[6][2].t = 0;
   map[7][2].t = 0;
   map[2][3].t = 0;
   map[3][2].t = 0;

   map[1][2].room = 1;
   map[1][3].room = 1;
   map[4][2].room = 1;
   map[4][3].room = 1;
   map[5][2].room = 1;
   map[6][2].room = 1;
   map[7][2].room = 1;
   map[2][3].room = 1;
   map[3][2].room = 1;

   for (var i = 1; i <= 12; ++i) {
      map[i][1].t = 0;
      map[i][4].t = 0;
      map[i][1].room = 1;
      map[i][4].room = 1;
   }
   */
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
         pl_anim_eat[3].draw( middle + BLOCK_SIZE, middle );
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
         if (player_offset_y <= -40) {
            playerMove( player_x, player_y - 1 );
         }
      } else if (player_facing === 1) {
         player_offset_x += dhop;
         if (player_offset_x >= 40) {
            playerMove( player_x + 1, player_y );
         }
      } else if (player_facing === 2) {
         player_offset_y += dhop;
         if (player_offset_y >= 40) {
            playerMove( player_x, player_y + 1 );
         }
      } else if (player_facing === 3) {
         player_offset_x -= dhop;
         if (player_offset_x <= -40) {
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
         // No lag, TODO: also initiate sound
         player_state = state;
         player_next_state = undefined;

      } else if (player_lag <= 0) {
         player_state = state;
         player_next_state = undefined;
         player_lag = 4;
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

   // Coin sound
   which_sound = (which_sound + 1) % 7;
   snd_coins[which_sound].currentTime = 0;
   snd_coins[which_sound].volume = 0.4;
   snd_coins[which_sound].play();

   // TODO: Alert nearby enemies
   for (var j = x - 3; j <= x + 3; ++j) {
      if (j < 0 || j >= MAP_WIDTH) continue;
      for (var k = y - 3; k <= y + 3; ++k) {
         if (k < 0 || k >= MAP_HEIGHT) continue;

         var enemy = map[j][k].unit;
         if (enemy !== undefined && enemy !== 'player') {
            enemy.alerted = { x: x, y: y };
         }
      }
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

   if (map[to_x][to_y].unit !== undefined)
      return false;

   playerChangeState( 'hop' );
   map[to_x][to_y].unit = 'player';
   // TODO: Hop cloud?
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

   this.los = 4; // How many squares ahead he can see

   this.hop_index = 0;
   this.offset_x = 0;
   this.offset_y = 0;

   this.next_state = '';
   this.next_facing = 0;
   this.follow_direction = undefined;

   this.voice = Math.floor( Math.random() * 4 );
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
      context.drawImage( enemy_swords[enemy.facing], x + dx, y + dy );

   } else if (enemy.state === 'greedy_kill') {
      // TODO: Draw reaching out
      if (enemy.lag < 100) {
         if (enemy.lag < 0) enemy.lag = 0;
         var dx = 0, dy = 0;
         if (enemy.facing === 0) dy = -((100 - enemy.lag) * 0.14);
         if (enemy.facing === 2) dy = ((100 - enemy.lag) * 0.14);
         if (enemy.facing === 3) dx = -((100 - enemy.lag) * 0.14);
         if (enemy.facing === 1) dx = ((100 - enemy.lag) * 0.14);
         context.drawImage( enemy_hands[enemy.facing], x + dx, y + dy );
      }
   }
   // Draw enemy sprite
   context.drawImage( enemy_images[enemy.facing], x, y );

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
         x += dx;
         y += dy;
         context.beginPath();
         context.fillStyle = "white";
         context.arc(x, y, 1.5, 0, 2 * Math.PI, false);
         context.fill();
      }
   }
}

function drawEnemies()
{
   for (var i = 0; i < enemies.length; ++i) {
      var e = enemies[i];
      if (e.x >= player_x - 15 && e.y >= player_y - 15
       && e.x <= player_x + 15 && e.y <= player_y + 15) {
         if (map[e.x][e.y].visible || map[e.next_x][e.next_y].visible)
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
   for (var i = 0; i < enemy.los; ++i) {
      x += dx;
      y += dy;
      if (map[x][y].unit === 'player') {
         seen = true;
         enemy.last_seen = { x: x, y: y };
         if (player_state !== 'closed') {
            // ALERT
            if (enemy.mental_state !== 'aggro') {
               enemy.mental_state = 'aggro';
               enemy.chasepath.unshift( { x: enemy.x, y: enemy.y, face: enemy.facing } );
               enemy.lag = 0;
               enemy.state = 'hop';
               snd_aggro[enemy.voice].currentTime = 0;
               snd_aggro[enemy.voice].volume = 1;
               snd_aggro[enemy.voice].play();
            }
         } else if (enemy.mental_state !== 'aggro') {
            // Greed
            if (enemy.mental_state !== 'greedy') {
               enemy.mental_state = 'greedy';
               enemy.chasepath.unshift( { x: enemy.x, y: enemy.y, face: enemy.facing } );
               enemy.lag = 0;
               enemy.state = 'hop';
               snd_greed[enemy.voice % 3].currentTime = 0;
               snd_greed[enemy.voice % 3].volume = 1;
               snd_greed[enemy.voice % 3].play();
            }
         }
      }
      if (map[x][y].t !== 0)
         break; // Can't see through walls
   }

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
            enemy.state = 'hop';
         }
      }
      return;
   }
   if (enemy.state === 'aggro_kill') {
      enemy.lag--;
      if (enemy.lag <= 0) {
         // Kill you
         if (mapAt( enemy.x, enemy.y, enemy.facing ).unit === 'player') {
            // TODO:GAME OVER
            game_over = true;

         } else {
            enemy.state = 'hop';
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

      if (map[enemy.next_x][enemy.next_y].unit === undefined) {
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
         enemy.next_facing = enemy.facing;
         if (mapAt( x, y, enemy.facing ).t !== 0)
            enemy.next_facing = (enemy.next_facing + 2) % 4;

         enemy.facing = getDirection( enemy.x, enemy.y, enemy.alerted.x, enemy.alerted.y );

         enemy.state = 'lookingaround';
         enemy.next_state = 'waiting';
         enemy.lag = 100;

         enemy.alerted = undefined;

         // Sound: Huh? only play if you don't also spot the mimic
         enemyCheckVision( enemy );

         if (enemy.mental_state !== 'aggro' && enemy.mental_state !== 'greedy') {
            var player_distance = Math.sqrt( Math.pow((enemy.x - player_x), 2) + Math.pow((enemy.y - player_y), 2 ) );
            if (player_distance <= 10) {
               snd_huhs[enemy.voice % 2].currentTime = 0;
               snd_huhs[enemy.voice % 2].volume = (10 - player_distance) / 10;
               snd_huhs[enemy.voice % 2].play();
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
   var player_distance = Math.sqrt( Math.pow((x - player_x), 2) + Math.pow((y - player_y), 2 ) );
   if (player_distance <= 10) {
      next_footstep = (next_footstep + 1) % 4;
      snd_footsteps[next_footstep].currentTime = 0;
      snd_footsteps[next_footstep].volume = ( 10 - player_distance ) / 10;
      snd_footsteps[next_footstep].play();
   }

   if (enemy.mental_state === 'aggro') {
      if (enemy.last_seen !== undefined && enemy.follow_direction !== undefined &&
                  x === enemy.last_seen.x && y === enemy.last_seen.y ) {
         // Chase
         enemy.chasepath.unshift( { x: x, y: y, face: (enemy.facing + 2) % 4 } ); // The way back

         enemy.lag = 5;
         enemy.next_state = 'waiting';
         enemy.facing = enemy.follow_direction;
         enemy.next_facing = enemy.follow_direction;
         enemy.follow_direction = undefined;

         enemy.last_seen = undefined;

      } else if (mapAt( x, y, enemy.facing ).unit === 'player') {
         // He kills you
         enemy.state = 'aggro_kill';
         enemy.lag = 10;
      } else if (mapAt( x, y, enemy.facing ).t !== 0) {
         // Lost him
         enemy.mental_state = 'wary';
         enemy.next_facing = (enemy.facing + 2) % 4;
         enemy.lag = 100;
         enemy.next_state = 'hop';
      }
      
   } else if (enemy.mental_state === 'greedy') {
      enemy.lag = 40;
      if (mapAt( x, y, enemy.facing ).unit === 'player') {
         // You kill him
         enemy.state = 'greedy_kill';
         enemy.lag = 120;
      }

   } else if (enemy.alerted !== undefined) {
      enemy.next_facing = enemy.facing;
      if (mapAt( x, y, enemy.facing ).t !== 0)
         enemy.next_facing = (enemy.next_facing + 2) % 4;

      enemy.facing = getDirection( enemy.x, enemy.y, enemy.alerted.x, enemy.alerted.y );

      enemy.state = 'lookingaround';
      enemy.next_state = 'waiting';
      enemy.lag = 100;

      enemy.alerted = undefined;

      // Sound: Huh? only play if you don't also spot the mimic
      enemyCheckVision( enemy );

      if (enemy.mental_state !== 'aggro' && enemy.mental_state !== 'greedy') {
         var player_distance = Math.sqrt( Math.pow((enemy.x - player_x), 2) + Math.pow((enemy.y - player_y), 2 ) );
         if (player_distance <= 10) {
            snd_huhs[enemy.voice % 2].currentTime = 0;
            snd_huhs[enemy.voice % 2].volume = (10 - player_distance) / 10;
            snd_huhs[enemy.voice % 2].play();
         }
      }
   
   } else if (x === enemy.path[0].x && y === enemy.path[0].y) {
      // Path point reached
      var path_point = enemy.path.shift();
      enemy.path.push( path_point ); // Cycle the path

      // Setup next move
      enemy.next_facing = path_point.face;
      enemy.next_state = 'waiting';
      enemy.lag = 100;

      enemy.chasepath = []; // Clear, since we're on the main path again
      enemy.mental_state = 'normal';

   } else if (enemy.chasepath.length > 0 && x === enemy.chasepath[0].x && y === enemy.chasepath[0].y) {
      // chasePath point reached
      var path_point = enemy.chasepath.shift();

      // Next move
      enemy.facing = path_point.face;
      enemy.state = 'waiting';

   } else if (enemy.mental_state === 'wary') {
      if (Math.random() < 0.2) {
         // Random turn
         var pos_turns = [];
         if (mapAt(x, y, (enemy.facing - 1) % 4).t === 0 ) // Turn left
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
         enemy.lag = 100;
         enemy.next_state = 'waiting';
      }
   }

   if (mapAt( x, y, enemy.facing ).t !== 0) {
      var pos_turns = [];
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
   if (enemies.length === 0)
      return true;
   else
      return false;
}

/////////////////////////////////////////////////////////////////////
// Controls ---

var shift_down = false;

function onKeyDown( e ) {
   LOG.html( "DOWN: " + e.which );

   if (player_state !== 'closed' && player_state !== 'hop') {
      if ( e.which === 16 ) {
         shift_down = true;
         playerChangeState( 'closed' );
      }
      else if ( e.which === 38 ) {
         // Up
         player_facing = 0;
         playerTryHop();
      }
      else if ( e.which === 39 ) {
         // Right
         player_facing = 1;
         playerTryHop();
      }
      else if ( e.which === 40 ) {
         // Down
         player_facing = 2;
         playerTryHop();
      }
      else if ( e.which === 37 ) {
         // Left
         player_facing = 3;
         playerTryHop();
      }
   }
}
$(document).keydown( onKeyDown );

function onKeyUp( e ) {
   LOG.html( "UP: " + e.which );

   if ( e.which === 16 ) {
      shift_down = false;
      playerChangeState( 'idle' );
   }
}
$(document).keyup( onKeyUp );

/////////////////////////////////////////////////////////////////////
// Draw ---

function centerMap()
{
   context.restore();
   context.save();
   context.translate( -player_offset_x, -player_offset_y );
}

function drawFloor()
{
   context.fillStyle = "gray";
   context.fillRect( 0, 0, 630, 630 );
}

function setupScreen()
{


}
setupScreen();

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
         if (!found) {
            drawTerrain( -2, draw_x, draw_y );
         } else if (!vis) {
            drawTerrain( ter, draw_x, draw_y );
            drawFog( draw_x, draw_y );
         } else {
            drawTerrain( ter, draw_x, draw_y );
         }
         draw_y += BLOCK_SIZE;
      }
      draw_x += BLOCK_SIZE;
   }
}

var update = function( dt ) {
   if (!game_over) {
      updatePlayer( dt );
      updateEnemies();
   }
   //updateWinCondition();
}

var main = function() {
   requestAnimationFrame( main );

   if (!game_over) {
      update( 17 );
      draw();
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
