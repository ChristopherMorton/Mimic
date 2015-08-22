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

var img_enemy_n = new Image();
var img_enemy_e = new Image();
var img_enemy_s = new Image();
var img_enemy_w = new Image();
/*
var wallN_image = new Image();
var wallE_image = new Image();
var wallS_image = new Image();
var wallW_image = new Image();
var oCornerNE_image = new Image();
var oCornerSE_image = new Image();
var oCornerSW_image = new Image();
var oCornerNW_image = new Image();
var iCornerNE_image = new Image();
var iCornerSE_image = new Image();
var iCornerSW_image = new Image();
var iCornerNW_image = new Image(); 
*/
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
   context.drawImage( image, x, y );
}

// Terrain --
// Essentially an enumeration

function drawTerrain( t, x, y )
{
   var image = undefined;
   switch( t ) {
      /*
      case 1:
         image = wallN_image;
         break;
      case 2:
         image = wallE_image;
         break;
      case 3:
         image = wallS_image;
         break;
      case 4:
         image = wallW_image;
         break;
      case 5:
         image = oCornerNE_image;
         break;
      case 6:
         image = oCornerSE_image;
         break;
      case 7:
         image = oCornerSW_image;
         break;
      case 8:
         image = oCornerNW_image;
         break;
      case 9:
         image = iCornerNE_image;
         break;
      case 10:
         image = iCornerSE_image;
         break;
      case 11:
         image = iCornerSW_image;
         break;
      case 12:
         image = iCornerNW_image;
         break;
         */
      case -1:
         context.fillStyle = 'rgba(85,34,0,1)';
         context.fillRect( x, y, BLOCK_SIZE + 1, BLOCK_SIZE + 1 );
      case 0:
      default:
         return;
   }

   if (image !== undefined) {
      context.drawImage( image, x, y );
   }
}

// MapLoc --

function MapLoc( t ) {
   this.t = t;

   this.unit = undefined;

   this.visible = true;
}

/////////////////////////////////////////////////////////////////////
// Data ---

var SCREEN_WIDTH = 15, SCREEN_HEIGHT = 15; // 600x600 px
var BLOCK_SIZE = 40; // This is the image size as well

var HOP_DURATION = 250;

// Map --



var map;
var MAP_WIDTH = 40, MAP_HEIGHT = 40;


// Units --

var enemies = [];

/////////////////////////////////////////////////////////////////////
// Map ---

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

   var e1 = addEnemy( 2, 4, 1 );
   enemyCreatePath( e1, 8, 4, 3, 2, 4, 1 );
   e1.state = 'hop';
   //calculateEdges();

}
initMap();

function drawPaths()
{
   map[1][1].t = 0;
   map[1][2].t = 0;
   map[1][3].t = 0;

   for (var i = 1; i <= 17; ++i) {
      map[i][4].t = 0;
   }
}

/*
function findEdge( x, y )
{
   var edges = {};
   if (x > 0) {
      if (map[x-1][y] === 0)
         edges['w'] = true;
   }
   if (y > 0) {
      if (map[x][y-1] === 0)
         edges['n'] = true;
   }
   if (x < MAP_WIDTH - 1) {
      if (map[x+1][y] === 0)
         edges['e'] = true;
   }
   if (y < MAP_WIDTH - 1) {
      if (map[x][y+1] === 0)
         edges['s'] = true;
   }

   if (edges['n'] && edges['e'] && edges['s'] && edges['w'])
      return 17;

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
*/

function calculateVision()
{

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

function drawPlayer() {
   var middle = 7 * BLOCK_SIZE;

   if (player_state === 'idle')
      pl_anim_idle[player_facing].draw( middle, middle );

   if (player_state === 'hop')
      pl_anim_idle[player_facing].draw( middle + player_offset_x, middle + player_offset_y );

   if (player_state === 'closed')
      pl_anim_closed[player_facing].draw( middle, middle );
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
}

function playerChangeState( state )
{
   if (state) {
      if (player_lag <= 0) {
         player_state = state;
         player_next_state = undefined;
         player_lag = 5;
      } else {
         player_next_state = state;
      }
   }
}

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

   // TODO: Coin sound
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

   playerChangeState( 'hop' );
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

function Enemy( x, y, face ) {
   this.x = x;
   this.y = y;
   this.facing = face;

   this.state = 'waiting';
   this.mental_state = 'normal'; // 'normal', 'wary', 'greedy', 'murderous'
   this.lag = 0;

   this.path = []; // [ { face, x, y } ... ]

   this.los = 4; // How many squares ahead he can see

   this.hop_index = 0;
   this.offset_x = 0;
   this.offset_y = 0;

   this.next_state = '';
   this.next_facing = 0;
}

function addEnemy( x, y, face )
{
   var e = new Enemy( x, y, face );
   enemies.push( e );
   return e;
}

function drawEnemy( enemy, x, y )
{
   var x, y, middle = BLOCK_SIZE * 7;
   x = ((enemy.x - player_x) * BLOCK_SIZE) + middle + enemy.offset_x;
   y = ((enemy.y - player_y) * BLOCK_SIZE) + middle + enemy.offset_y;

   // Draw enemy sprite
   context.drawImage( enemy_images[enemy.facing], x, y );

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

function drawEnemies()
{
   for (var i = 0; i < enemies.length; ++i) {
      var e = enemies[i];
      if (e.x >= player_x - 15 && e.y >= player_y - 15
       && e.x <= player_x + 15 && e.y <= player_y + 15)
         drawEnemy( e );
   }
}

var enemy_hop_speed = [1,1,1,1,1,1,1,1,1,1,1,1];
function updateEnemy( enemy, dt )
{
   // Check if he notices anything




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
      var next_x = enemy.x, next_y = enemy.y;
      if (enemy.facing === 0) {
         next_y -= 1;
      } else if (enemy.facing === 1) {
         next_x += 1;
      } else if (enemy.facing === 2) {
         next_y += 1;
      } else if (enemy.facing === 3) {
         next_x -= 1;
      }

      if (map[next_x][next_y].unit === undefined) {
         enemy.state = 'hop';
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

   if (x === enemy.path[0].x && y === enemy.path[0].y) {
      // Path point reached
      var path_point = enemy.path.shift();
      enemy.path.push( path_point ); // Cycle the path

      // Setup next move
      enemy.next_facing = path_point.face;
      enemy.next_state = 'hop';
      enemy.lag = 100;
   }

   // Check next location, see if need to wait
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

   if ( e.which === 16 ) {
      shift_down = true;
      playerChangeState( 'closed' );
   }
   else if ( e.which === 38 ) {
      // Up
      if (player_facing === 0) {
         playerTryHop();
      } else {
         player_facing = 0;
      }
   }
   else if ( e.which === 39 ) {
      // Right
      if (player_facing === 1) {
         playerTryHop();
      } else {
         player_facing = 1;
      }
   }
   else if ( e.which === 40 ) {
      // Down
      if (player_facing === 2) {
         playerTryHop();
      } else {
         player_facing = 2;
      }
   }
   else if ( e.which === 37 ) {
      // Left
      if (player_facing === 3) {
         playerTryHop();
      } else {
         player_facing = 3;
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
         if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_WIDTH)
            drawTerrain( -1, draw_x, draw_y );
         else
            drawTerrain( map[x][y].t, draw_x, draw_y );
         draw_y += BLOCK_SIZE;
      }
      draw_x += BLOCK_SIZE;
   }
}

var update = function( dt ) {
   updatePlayer( dt );
   updateEnemies();
   //updateWinCondition();
}

var main = function() {
   requestAnimationFrame( main );

   update( 17 );
   draw();
}

function start() {
   main();
}

// Load images --
var images_ready = 0;
var total_images = 3;

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

loadImage( img_enemy_n, "EnemyN.png" );
loadImage( img_enemy_e, "EnemyE.png" );
loadImage( img_enemy_s, "EnemyS.png" );
loadImage( img_enemy_w, "EnemyW.png" );
/*
loadImage( wallN_image, 'WallN.png' );
loadImage( wallE_image, 'WallE.png' );
loadImage( wallS_image, 'WallS.png' );
loadImage( wallW_image, 'WallW.png' );
loadImage( oCornerNE_image, 'OuterCornerNE.png' );
loadImage( oCornerSE_image, 'OuterCornerSE.png' );
loadImage( oCornerSW_image, 'OuterCornerSW.png' );
loadImage( oCornerNW_image, 'OuterCornerNW.png' );
loadImage( iCornerNE_image, 'InnerCornerNE.png' );
loadImage( iCornerSE_image, 'InnerCornerSE.png' );
loadImage( iCornerSW_image, 'InnerCornerSW.png' );
loadImage( iCornerNW_image, 'InnerCornerNW.png' );
*/
