
//test buttons


$(document).ready(function(){

$('body').on('click', function(event) {
	toolBar.removeClickOn()
});

// remove ::after pseudo elements if unsupported
if('pointer-events' in document.body.style)
{
	console.log("Browser supports pointer-events")
} else {
	$('#menuParent').addClass('noBefore')
}



// scroll in inv/equ menu
if (window.addEventListener) {
	$('#menuParent>div')[0].addEventListener('DOMMouseScroll', wheel, false);
}

$('#menuParent>div')[0].onmousewheel = wheel;

var scrolling = false
function wheel(event) {
 	if (scrolling === false) {
 		scrolling = true
		console.log("Wheel activated")
	    var delta = 0;
	    if (event.wheelDelta) delta = event.wheelDelta / 120;
	    else if (event.detail) delta = -event.detail / 3;

	    handle(delta);
 	} else{
		console.log("Wheel not activated")
 	}
	    if (event.preventDefault) event.preventDefault();
	    event.returnValue = false;
}

function handle(delta) {
    var time = 200;
	var distance = 40;
    
    $('#menuParent>div').animate({
        scrollTop: $("#menuParent>div").scrollTop() - (distance * delta)
    }, time, "easeOutCirc", function(){
		scrolling = false
    });
}


// mouseOver quest to slideDown ul
var questUl = $('#topBar .theRest');
var questText = $('#topBar .quests .text');
var questText2 = $('#topBar .quests .text2');
var openedSlider = false;
$('#topBar .quests').hover(function(){
	if( /* player.activeQuests !== 0 */ true){
		openedSlider = true;
		questUl.stop().slideDown(600);
	} else {
		questText.stop().fadeOut(400);
		questText2.stop().fadeIn(400);
		postToClipboard("I dont have any quests... Maybe I could find some in the village.<br>*hint hint*");
		
			
			
	}
}, function() {
	if (openedSlider) {
		openedSlider = false;
		questUl.stop().slideUp(600);
	} else {
		questText2.stop().fadeOut(400)
		questText.stop().fadeIn(400)
			
	}
	
});











$('#purchaseButton').click(function() {
	shop.purchase()
});



// mouseOver miniEquipment to show type
$('#miniEquipment td').hover(function() {
	$(this).addClass('equipmentTD')
	$(this).stop().velocity({top: "8px"}, 400)
}, function() {
	$(this).removeClass('equipmentTD')
	$(this).stop().velocity({top: 0}, 400)
});



//switching between alchemy and forge in craft 
$('#craftPage .tabOne, #craftPage .tabTwo').click(function() {
	postToClipboard("Shhh you're not meant to see this...")
	
	$('#craftPage .tabOne, #craftPage .tabTwo').removeClass('tabClicked')
	$(this).addClass('tabClicked')
	
	var alchemy = $('#craftPage .alchemy')
	var forge = $('#craftPage .forge')

	if ($(this).hasClass('tabOne')) {
		forge.fadeOut(400)
		alchemy.fadeIn(400)
	} else if ($(this).hasClass('tabTwo')) {
		forge.fadeIn(400)
		alchemy.fadeOut(400)
	} else throw new Error("No tab1/2")

});


// testing adding/removing pseudo elements
$('#fightMode .table1 td, #fightMode .table2 td').hover(function() {
	$(this).removeClass('skillO2')
	$(this).addClass('skillO1')
}, function() {
	$(this).removeClass('skillO1')
	$(this).addClass('skillO2')
});





var dirak = $('#shopDirak')
var essence = $('#shopEssence')

// slider
$('#shopContent .slider').slider({
	animate: "fast",
	max: 5,
	min: 0,
	change: function(event, ui) { 
		var multiplier = ui.value;

		var currentD = shop.originalCost[0] * multiplier 
		dirak.html(currentD)

		var currentE = shop.originalCost[1] * multiplier 
		essence.html(currentE)

		$('#shopContent .quantity').html(multiplier)
	}


});



// to set ^^ after init
// $( ".selector" ).slider( "option", "min", 10 );


// close shop
$('#closeShop').click(function() {
	shop.close()
});

// shop row click
$('#shopMain').on('click', 'tr, #shopContent .close', function() {
	var id = $(this).get(0).id
	shop.ani( id )
	console.log("row clicked , id="+id)
});

// shop nav
$('nav.shop li>ul').on('click', function(event){
	event.stopPropagation()
});
// shop 1
var shopNav = [false, false]
$('#Items, #Equipment').on('click', function() {
	
	var self = $(this)
	var id = $(this).get(0).id
	// change color
	$('nav.shop ul>li').each(function() {
		$(this).children('span.text').removeClass('shopNavHighlight');
	});
	self.children('span.text').addClass('shopNavHighlight');
	//
	shop.nav(id)
});
// shop 2
$('#Items ul li, #Equipment ul li').click(function() {
	$('#Items ul li, #Equipment ul li').each(function() {
		$(this).removeClass('bulletPoint')
	});
	$(this).addClass('bulletPoint')
	if (shop.equipIsOpen) {

	}
});

$('#innerShop1').click(function() {
	shop.open()
	$('#Equipment').trigger("click");
});
$('#innerShop2').click(function() {
	shop.open()
	$('#Items').trigger("click");
});







// battle bar - potion shake
$('#battlePotions>span').hover(function() {
	$(this).children('div').children('.text').hide();
	$(this).children('div').children('.numberOf').fadeIn(400);
	$(this).children('img').addClass('shakePotion')
}, function() {
	var num = $(this).children('div').children('.numberOf');
	var txt = $(this).children('div').children('.text');
	var shake = $(this).children('img')
	
	shake.removeClass('shakePotion')
	num.hide()
	txt.fadeIn(400)
});


$('#monster1, #monster2, #monster3').click(function() {
	var id = $(this).attr("id")
	var isItOk = false

	if (id === "monster1") {
		if (!currentMonster1.beaten) {
			isItOk = true
			battleBox.attacked = 1		
		} 
	} else if (id === "monster2") {
		if (!currentMonster2.beaten) {
			isItOk = true
			battleBox.attacked = 2
		} 
	} else {
		if (!currentMonster3.beaten) {
			isItOk = true
			battleBox.attacked = 3
		} 
	}

	isItOk? moveIt() : console.log("Can't select a monster thats been defeated")
	var self = $(this)
	moveIt = function(){
		$('#monsterFightPageInner .arrow').hide().removeClass('bounceArrow')
		self.children('div.arrow').show().addClass('bounceArrow')
	}
});
















$('#fightMode .attack').click(function() {
	battle.chooseAttack("normalAttack");
});
$('#attackType').click(function(event) {
	event.stopPropagation();
});














// toggles testing bar at the top of the screen
var menu = false
$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
        $('#menuBar .context').slideToggle(400)
   
    }
});
$('#menuButton').click(function() {
	$('#menuBar .context').slideToggle(400)
});

//==============//
// Testing Zone //



	$('#button1').click(function() {
		$('#welcomeBackground').fadeOut(400)
		$('#welcomeInner').fadeOut(400)
		$('#loading').fadeOut(400);
		$('#game').fadeIn(400)
		$('#gameWrap').fadeIn(400)
		setTimeout(function(){
			$('#welcomeInner').fadeOut(400)
		},4000)
	});

	$('#button2').on('click',function(){
	  	shop.open()
		windowOpen = true;
	})

	$('#button3').click(function() {
		toolBar.addToInventory("sword_3")
		toolBar.addToInventory("ironArmour")
		toolBar.addToInventory("steelAxe")
	});


	$('#button4').click(function() {
		toolBar.addToInventory("marigold", 3)
		toolBar.addToInventory("flint", 5)
		toolBar.addToInventory("pGem", 1)
	});

	$('#button5').click(function() {
		player.currency("dirak", 123)
		player.currency(true, 25)
	});

	$('#button6').click(function() {
		location.reload()
	});

	$('#button7').click(function() {
		if (battle.attackOn) {
			battle.attackOn = false;
			$(this).attr("value", "Monsters = Off")
		} else {
			battle.attackOn = true;
			$(this).attr("value", "Monsters = On")
		}
	});
	$('#button8').click(function() {
		battle.init("pathway", true)
	});

	$('#button9').click(function() {
		var gui = require('nw.gui')
		gui.App.quit()
	});
	$('#button10').click(function() {

		localStorage.removeItem( "save")
		localStorage.removeItem( "storage")
		sessionStorage.removeItem( "sStorage")

	});
	$('#button11').click(function() {

		player.healthChange(player.HP())

	});







// Testing Zone //
//==============//


// topBar - arrow flip
	$('#moneyArrowImg').click(function() {
		var plus = 100;
		if (!data.obj.moneyIsOpen) {
			
			data.obj.moneyIsOpen = true
			$('#moneyArrowImg').removeClass().addClass('spinLeft')

			setTimeout(function(){
				$('#moneyArrowImg').removeClass().attr('src', 'files/img/topBar/arrow_down.png')
			},1000)

			$('#topBar > div').each(function(index) {
				var self = $(this);
				setTimeout(function(){
					self.slideToggle(600, "linear");
				}, 250*index);
			});
		} else {
			
			data.obj.moneyIsOpen = false
			$('#moneyArrowImg').removeClass().addClass('spinRight')

			setTimeout(function(){
				$('#moneyArrowImg').removeClass().attr('src', 'files/img/topBar/arrow_up.png')
			},1000)
			
			$('#topBar > div').each(function(index) {
				var self = $(this);
				setTimeout(function(){
					self.slideToggle(600, "linear");
				}, 250 * index);
			});
		}
	});

	

	$('#runFromBattle').click(function() {
		if (battle.playerCanAttack === true) {
			var rand = Math.random();
			if (rand > 0.50) {
				postToClipboard("Managed to escape!")
				setTimeout(function(){
					battle.off()
				},400)
			} else {
				postToClipboard("Unable to escape!")
				setTimeout(function(){
					battle.turn(false)
				},400)
			}
				
		};

	});



	$('#statistics').on('click', function() {
		$('#optionsStatistics').empty().html('\
			<span class="optionsStatistics">\
				<table class="tableOne">\
					<tr class="sCentered">\
						<td>\
							<h3 class="underline">Player Stats</h3>\
						</td>\
					</tr>\
					<tr>\
						<td>Physical Attack: </td>\
						<td>' +player.pAttack+ '</td>\
					</tr>\
					<tr>\
						<td>Magic Attack: </td>\
						<td>' +player.mAttack+ '</td>\
					</tr>\
					<tr>\
						<td>Physical Defence: </td>\
						<td>' +player.pDefence+ '</td>\
					</tr>\
					<tr>\
						<td>Magic Defence: </td>\
						<td>' +player.mDefence+ '</td>\
					</tr>\
					<tr>\
						<td>Speed: </td>\
						<td>' +data.pStats.speed+ '</td>\
					</tr>\
					<tr>\
						<td>Luck: </td>\
						<td>' +data.pStats.luck+ '</td>\
					</tr>\
					<tr class="sCentered">\
						<td>\
							<h3 class="underline">Bonuses</h3>\
						</td>\
					</tr>\
					<tr>\
						<td>Dirak Bonus: </td>\
						<td>' +(data.pStats.moneyBonus/100)+ '</td>\
					</tr>\
					<tr>\
						<td>Lumberjacking Bonus: </td>\
						<td>' +(data.pStats.woodBonus/100)+ '</td>\
					</tr>\
					<tr>\
						<td>Fishing Bonus: </td>\
						<td>' +(data.pStats.fishingBonus/100)+ '</td>\
					</tr>\
					<tr>\
						<td>Item Drop Rate Bonus: </td>\
						<td>' +(data.pStats.itemDropBonus/100)+ '</td>\
					</tr>\
					<tr>\
						<td>Attack frequency reduction: </td>\
						<td>0%</td>\
					</tr>\
					<tr class="sCentered">\
						<td>\
							<h3 class="underline">Monsters Defeated</h3>\
						</td>\
					</tr>\
					<tr>\
						<td>Slimes: </td>\
						<td>' +data.monstersdefeated.slime+ '</td>\
					</tr>\
					<tr>\
						<td>Bats: </td>\
						<td>' +data.monstersdefeated.bat+ '</td>\
					</tr>\
					<tr>\
						<td>Dragons: </td>\
						<td>' +data.monstersdefeated.dragon+ '</td>\
					</tr>\
				</table>\
			</span>').fadeIn(500);
	});

	switchit = true;
	$('#testButton2').click(function(){
		if (switchit){
			attackOn();
			switchit = false
		} else {
			attackOff();
			switchit = true;
		}
	})


	$('#testButton3').click(function(){
		// for shop editing
		$('#shopMain').fadeIn()
		$('#checkout').fadeIn()
		$('#buySS').fadeIn()
		$('#innerScreenBackground').fadeIn()
		$('#sellSS').fadeOut()
		insertItemsForBuy()
		windowOpen = true;
	})






//test button. Add functions for each if statement
var bodyWidth;
	$('body').on('mouseenter', '.hoverText', function(){
		bodyWidth = $(window).width()
		var textData = returnString($(this))
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip">' + textData + ' </p>')
        .text(title).appendTo('body').fadeIn('fast');
	});
	$('body').on('mouseleave', '.hoverText', function() {
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
	}).mousemove(function(e) {
		var mousex = e.pageX + 22;
	    var mousey = e.pageY + 25; 
        $('.tooltip').css({ top: mousey, left: mousex })
	});



function returnString(self){
	switch(true){
		case self.id === resetHealth:
	        return "This is an item";
	        break;

	    case self.hasClass('empty'):
	    	return "Empty";
	    	break;

	    case self.hasClass('tools'):
	    	switch(true){
	    		case self.hasClass('rustyPick'):
	    			return "<b>Rusty Pickaxe</b><br>Multiplies gold rate by <b><span class='textGreen'>1.8</span></b> from mining rocks <br>";
	    			break;
	    		case self.hasClass('ironPick'):
	    			return  "<b>Iron Pickaxe</b><br>Multiplies gold rate by <b><span class='textGreen'>2.7</span></b> from mining rocks <br>";
	    			break;
	    		case self.hasClass('steelPick'):
	    			return "<b>Steel Pickaxe</b><br>Multiplies gold rate by <b><span class='textGreen'>4</span></b> from mining rocks <br>";
	    			break;
	    		case self.hasClass(''):
	    			return "";
	    			break;
	    		case self.hasClass(''):
	    			return "";
	    			break;
	    		case self.hasClass(''):
	    			return "";
	    			break;
	    		default:
	    			return "Class = tools but no case";
	    	} break;

	    case self.hasClass('weapon'):
	    	switch(true){
	    		case self.hasClass('sword_1'):
	    			return "<b>Novice Sword</b><br>Type: <i>Physical</i><br>Bonus Damage: <span class='textGreen'>3 - 5</span> <br>Speed: <span class='textRed'>-2</span>";
	    			break;
	    		case self.hasClass(''):
	    			return "";
	    			break;
	    		case self.hasClass('sword_3'):
	    			return "<b>Ragnarok</b><br>Type: <i>Physical</i><br>Bonus Damage: <span class='textGreen'>8 - 20</span> <br>Speed: <span class='textRed'>-20</span>";
	    			break;
	    		case self.hasClass(''):
	    			return "";
	    			break;
	    		case self.hasClass(''):
	    			return "";
	    			break;
	    		case self.hasClass(''):
	    			return "";
	    			break;
	    	}
	    	break;

	    case self.hasClass('$HP'):
	    	return "<b>Health Points</b><br>Increases by <b class='textGreen'>15</b> for each Skill Point.<br>Allows you to sustain more damage before you die."
	    	break;

	    case self.hasClass('$MP'):
	    	return "<b>Magic Points</b><br>Increases by <b class='textGreen'>15</b> for each Skill Point.<br>Lets you use more magic before your points run out."
	    	break;

	    case self.hasClass('$PS'):
	    	return "<b>Physical Strength</b><br>Increases by <b class='textGreen'>2</b> for each Skill Point.<br>Adds to the physical damage inflicted against opponents."
	    	break;

	    case self.hasClass('$PD'):
	    	return "<b>Physical Defence</b><br>Increases by <b class='textGreen'>2</b> for each Skill Point.<br>Reduces damage taken from physical attacks."
	    	break;

	    case self.hasClass('$MS'):
	    	return "<b>Magic Power</b><br>Increases by <b class='textGreen'>2</b> for each Skill Point.<br>Adds to the magic damage inflicted against opponents"
	    	break;

	    case self.hasClass('$MD'):
	    	return "<b>Magic Defence</b><br>Increases by <b class='textGreen'>2</b> for each Skill Point.<br>Reduces damage from magic-based atttacks"
	    	break;

	    case self.hasClass('$S'):
	    	return "<b>Speed</b><br>Increases by <b class='textGreen'>2</b> for each Skill Point.<br>Increases the chance of dodging an enemies attack, and also <br>reduces time taken to move between locations."
	    	break;

	    case self.hasClass('$L'):
	    	return "<b>Luck</b><br>Increases by <b class='textGreen'>2</b> for each Skill Point.<br>Increases the chance of recieving rare items and boosts many aspects of the game..."
	    	break;
		case (false):
			return "";
			break;
		case self.hasClass(''):
			return "";
			break;
		case self.hasClass(''):
			return "";
			break;
		case self.hasClass(''):
			return "";
			break;
		case self.hasClass(''):
			return "";
			break;
		case self.hasClass(''):
			return "";
			break;

	    default:
	    	return "I haven't added text for this yet."
	}
}







})

























