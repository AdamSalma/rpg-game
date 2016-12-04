var clickedOn = undefined;
var eClickedOn = undefined;
var clickedOnImg = undefined;
var eClickedOnImg = undefined;

// var clickedOnOuter;

//for equipping/unequipping items
var toolImg, armourImg, weaponImg, specialImg;


jQuery(document).ready(function($) {


$('#doubleAttack').click(function(){
	if (battle.playerCanAttack && player.currentMana > 65) {
		battle.specialMove("doubleAttack")
	};
})

var playerNameFocused = false
$('#playerName').focus(function() {
	if (!playerNameFocused) {
		playerNameFocused = true;
		$(this).css({
			backgroundColor: '#0d0d0d',
			borderColor: 'darkorange'
		});
		var charC = $('#charCreateWrap');
		charC.show()
			.addClass('fadeInUp animated')
			.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
			$(e.target).removeClass('fadeInUp animated');
		});
	};
});



//horizontal scroll
	var position = 0
	var markerL = true;
	var markerR = true; 
	$('#LUscrollLeft').hide()

	$('#LUscrollLeft').on('click', function() {
		
		if (markerL) {
			markerL = false;
			position--;
			console.log("position is "+position)
			if (position === 1) {
				$('#LUscrollRight').fadeOut(400);
				$('#LUscrollLeft').fadeIn(400);
			} else if (position === 0) {
				$('#LUscrollLeft').fadeOut(400);
				$('#LUscrollRight').fadeIn(400);
			} else {
				throw new Error("You've broken life")
			}
			$('.levelUpScroll ul').velocity({marginLeft: "5px"}, 800, "linear")
			setTimeout(function(){
				markerL = true
			},600);

		} else {
			console.log("not registered")
		}

	});
	$('#LUscrollRight').on('click', function() {
		if (markerR) {
			markerR = false;
			position++;
			console.log("position is "+position)
			if (position === 1) {
				$('#LUscrollRight').fadeOut(400);
				$('#LUscrollLeft').fadeIn(400);
			} else if (position === 0) {
				$('#LUscrollLeft').fadeOut(400);
				$('#LUscrollRight').fadeIn(400);
			} else {
				throw new Error("You've broken life")
			}
			$('.levelUpScroll ul').velocity({marginLeft: "-545px"}, 800, "linear")
			setTimeout(function(){
				markerR = true
			},600)

		} else {
			console.log("not registered")
		}

	});

//the <li>s
var skillPoints = 3
$('#LUscroll li').on('click', function() {
	if (skillPoints !== 0) {
		var tick = '&#x2714;'
		var self = $(this).children('.checked')
		console.log(self.children('span'))
		if (self.children('span').length !== 0) {
			if (self.children('span').length === 1) {
				self.html("").append('<span class="ticked pos2_1">'+tick+'</span>\
				<span class="ticked pos2_2">'+tick+'</span>');
				skillPoints--
			} else if (self.children('span').length === 2) {
				self.html("").append('<span class="ticked pos3_1">'+tick+'</span>\
				<span class="ticked pos3_2">'+tick+'</span>\
				<span class="ticked pos3_3">'+tick+'</span>');
				skillPoints--
			};
		} else {
			self.append('<span class="ticked pos1 first">'+tick+'</span>')
			skillPoints--
		}
		updateSP();
	} else {
		var text = "You've used up all your Skill Points.";
		userMessage(text, 1700)
	}
 });



$('#levelUpReset').on('click', function() {
	$('#LUscroll li').each(function() {
		$(this).children('.checked').empty()
	});
	skillPoints = 3
	updateSP()
});

var $pS, $mS, $pD, $mD, $l, $s, $m, $h 
$('#levelUpContinue').on('click', function() {
	
	if ( skillPoints === 0 ) {
		self = $('#LUscroll li').children('.checked')
		self.each(function(index) {
			if ($(this).children('span').length !== 0){
				var Class = $(this).prev("div").attr('class')
				console.log(Class)
				switch(true){
					case (Class === "health num"):
						$h = $(this).children('span').length;
						player.endurance += $h
						console.log("health was chosen")
						break;
					case (Class === "mana num"):
						$m = $(this).children('span').length;
						player.wisdom += $m;

						break;
					case (Class === "pAttack num"):
						player.pAttack += $(this).children('span').length * 2;
						$pS = $(this).children('span').length * 2;
						break;
					case (Class === "mAttack num"):
						player.mAttack += $(this).children('span').length * 2;
						$mS = $(this).children('span').length * 2;
						break;
					case (Class === "pDefence num"):
						player.pDefence += $(this).children('span').length * 2;
						$pD = $(this).children('span').length * 2;
						break;
					case (Class === "mDefence num"):
						player.mDefence += $(this).children('span').length * 2;
						$mD = $(this).children('span').length * 2;
						break;
					case (Class === "speed num"):
						player.speed += $(this).children('span').length * 2;
						$s = $(this).children('span').length * 2;
						break;
					case (Class === "luck num"):
						player.luck += $(this).children('span').length * 2;
						$l = $(this).children('span').length * 2;
						break;
					default:
						throw new Error("No Class chosen. Not supposed to happen")
				}
			}
		})
		player.healthInit()
		player.manaInit()
		showStats();
		updateStats();
		$('#LUscroll li').each(function() {
			$(this).children('.checked').empty()
		});
		skillPoints = 3
		updateSP()

		var lus1 = $('#levelUpScreen');

		lus1.toggleClass('fadeOutRight animated');
		lus1.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
			$(e.target).removeClass('fadeOutRight animated');
			$(this).hide()
			$('#levelUpScreen2').fadeIn(1000)
		});



	} else {
		var text = "You still have " +skillPoints+ " Skill Points left."
		userMessage(text, 2500)
	}
});


$('#levelUpScreen2 .close').on('click', function() {
	var lus2 = $('#levelUpScreen2');

		lus2.toggleClass('fadeOutRight animated');
		lus2.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
			$(e.target).removeClass('fadeOutRight animated');
			$(this).hide()
			$('#levelUpWrapper').fadeOut(400)
		});

});


function showStats(){
	var b = ".before"
	var a = ".after"
	$("#pS_LU "+b+ ", #pS_LU "+a).html(player.pAttack);
	$("#mS_LU "+b+ ", #mS_LU "+a).html(player.mAttack);
	$("#pD_LU "+b+ ", #pD_LU "+a).html(player.pDefence);
	$("#mD_LU "+b+ ", #mD_LU "+a).html(player.mDefence);
	$("#s_LU "+b+ ", #s_LU "+a).html(player.speed);
	$("#l_LU "+b+ ", #l_LU "+a).html(player.luck);
	$("#m_LU "+b+ ", #m_LU "+a).html(player.wisdom);
	$("#h_LU "+b+ ", #h_LU "+a).html(player.endurance);

}

function updateStats(){
	var b = '.before'
	var a = '.after'
	console.log("$pS is " + $pS)
	console.log("$mS is " + $mS)
	for (var i = 0; i < 8; i++) {
		switch(true){
			case ($pS != undefined):
				var temp = parseInt( $('#pS_LU '+b).html() );
				$('#pS_LU '+b).html(temp - $pS);
				$('#pS_LU '+a).addClass('upgraded');
				$pS = undefined;
				break;
			case ($mS != undefined):
				var temp = parseInt( $('#mS_LU '+b).html() );
				$('#mS_LU '+b).html(temp - $mS);
				$('#mS_LU '+a).addClass('upgraded');
				$mS = undefined;
				break;
			case ($mD != undefined):
				var temp = parseInt( $('#mD_LU '+b).html() );
				$('#mD_LU '+b).html(temp - $mD);
				$('#mD_LU '+a).addClass('upgraded');
				$mD = undefined;
				break;
			case ($pD != undefined):
				var temp = parseInt( $('#pD_LU '+b).html() );
				$('#pD_LU '+b).html(temp - $pD);
				$('#pD_LU '+a).addClass('upgraded');
				$pD = undefined;
				break;
			case ($s != undefined):
				var temp = parseInt( $('#s_LU '+b).html() );
				$('#s_LU '+b).html(temp - $s);
				$('#s_LU '+a).addClass('upgraded');
				$s = undefined;
				break;
			case ($l != undefined):
				var temp = parseInt( $('#l_LU '+b).html() );
				$('#l_LU '+b).html(temp - $l);
				$('#l_LU '+a).addClass('upgraded');
				$l = undefined;
				break;
			case ($m != undefined):
				var temp = parseInt( $('#m_LU '+b).html() );
				$('#m_LU '+b).html(temp - $m);
				$('#m_LU '+a).addClass('upgraded');
				$m = undefined;
				break;
			case ($h != undefined):
				var temp = parseInt( $('#h_LU '+b).html() );
				$('#h_LU '+b).html(temp - $h);
				$('#h_LU '+a).addClass('upgraded');
				$h = undefined;
				break;
		}
	}
}


var usrmsg = true;
function userMessage(text, delay){
	if (usrmsg) {
		usrmsg = false;
		$('#levelUpSP').velocity({
			top: "-=60px",
			opacity: 0},
			400, function() {
				$('#levelMessage').empty().html(text).velocity({
					bottom: "+=60px",
					opacity: 1},
					400, function() {
						$('#levelMessage').delay(delay).velocity({
							bottom: "-=60px",
							opacity: 0},
							400, function() {
								$('#levelUpSP').velocity({
									top: "+=60px",
									opacity: 1},
									400)
								usrmsg = true
							});
					});
			});
	} else {
		console.log("Already running.")
	}
}




function updateSP(){
	$('#levelUpSPRemaining').fadeOut(100, function(){
		$('#levelUpSPRemaining').empty().html(skillPoints).fadeIn(200);
	})
}
	//onclick navBox time
	$('.navBox').on('click', function() {
		dataF.time.addTime(0, 0, 15, 20);
		$('#insertTime span').velocity({
			'opacity' : '0.20'
		}, 100).velocity({
			'opacity' : '1'
		}, 100)
	})



	//adds class on inventory item on hover
//iBox onclick
	// css of clicked on items in inventory
		var invTD = false;
		var equipTD = false;

		


	//changes css of clicked items in EQUIPMENT TAB
		
	
	// stops ^^ click from affecting it
		$('#selectionMenu').on('click', function(event) {
			event.stopPropagation();
		});

//iBox end

















			
			

			$('#miniEquipment td').click(function() {
				console.log("Activated")
				toolBar.equipTD = true;
				toolBar.invTD = false;
			});
			$('#miniInventory td').click(function() {
				console.log("Activated")
				toolBar.equipTD = false;
				toolBar.invTD = true;
			});


			$('#selectionUnequip, #selectionEquip, #selectionThrow, #selectionUse, #selectionOrganise').on('click', function() {
				console.log("Menu item selected")
				var clicky = toolBar.checkClickOn()
				var id = this.id
				if (clicky) {
					console.log("Id is " + id)
					switch(true){
						case id==="selectionEquip":
							toolBar.equipUI();
							break;
						case id==="selectionUnequip":
							toolBar.unequipUI();
							break;
						case id==="selectionOrganise":
							toolBar.organiseInventory();
							break;
						case id==="selectionThrow":
							toolBar.removeItem()
							break;
						case id==="selection":
							toolBar
							break;
						case id==="selection":
							toolBar
							break;
						default:
							console.log(id)
							throw new Error("Error: switch statement cases for toolBar were ignored")
					}
				} else {
					if (id==="selectionOrganise"){
						toolBar.organiseInventory()
					} else {
						console.log("Clicked on does not exist")
						// display error on top of selectionMenu?
						
					}
				}
			});



			// ^^ add more selectors like equip or drink or idk

			//['rustyPick', 'tools', 'pickaxe', 'Rusty Pickaxe', 'files/img/shop/pickaxe_rusty.png', false, false, false, false, false, false, false, 80, false, false];
			//['ironPick', 'tools', 'pickaxe', 'Iron Pickaxe', 'files/img/shop/pickaxe_iron.png',false, false, false, false, false, false, false, 170, false, false];

			//['steelPick', 'tools', 'pickaxe', 'Steel Pickaxe','files/img/shop/pickaxe_steel.png', false, false, false, false, false, false, false, 300, false, false];
			//['sword_1', 'weapon', 'sword', 'Novice Sword', 'files/img/shop/sword_1.gif', 5, false, -2, false, false, false, false, false, false, false, false]
			



			// goes through allItems
			window.searchForItemProperty = function(id, number, max){
				console.log("Searching for ID = "+id)
				for (var i = 0; i < allItems.length; i++) { // go through all items
					if (allItems[i][0] === id){ //compare values

						// max allows for an array to be returned with a range of values
						if (max) {
							var rangeArr
							for (var g = number; g < max; g++) {
								rangeArr.push( allItems[i][g] )

							}
							console.log(rangeArr)
							return rangeArr
						}
						// end
						return allItems[i][number];
					}
				}
				throw new Error( id + " wasn't found in searchForItemProperty")
			}




			









});

			function pInv(){

				$('#tableInventory td').each(function(index) {
					data.pInventory.array[index] = $(this).get(0).outerHTML;
				});

				$('#miniEquipment .table1 td').each(function(index) {
					data.pEquipment.array[index] = $(this).get(0).outerHTML;
				});

			}

			function pInvLoad(){
				$('#tableInventory td').remove();
				for (var i = 0; i < data.pInventory.array.length; i++) {
					$('#inventoryTD').append(data.pInventory.array[i]);
				};
				
				$('#miniEquipment .table1 td').each(function(index){
					$(this).prop('outerHTML', data.pEquipment.array[index])
				});

				toolImg = $(data.pInventory.toolImg);
				weaponImg = $(data.pInventory.weaponImg);
				armourImg = $(data.pInventory.armourImg);
				specialImg = $(data.pInventory.specialImg);
				
			}


// [0]id, [1]class, [2]subClass, [3]name, [4]URL, [5]attackMin, [6]attackMax, [7]pDefence, [8]mDefence, [9]speed, 
// [10]luck, [11]statusEffect, [12]goldBonus, [13]WoodBonus, [14]fishingBonus, [15]itemDropBonus,

var allItems = []
			allItems[0] = new Array(18); 
					allItems[0][0] = "rustyPick"
					allItems[0][1] = "tools"
					allItems[0][2] = "pickaxe"
					allItems[0][3] = "Rusty Pickaxe"
					allItems[0][4] = 'files/img/shop/pickaxe_rusty.png'
					allItems[0][12] = 80

			allItems[1] = new Array(18)
					allItems[1][0] = "ironPick"
					allItems[1][1] = "tools"
					allItems[1][2] = "pickaxe"
					allItems[1][3] = "Iron Pickaxe"
					allItems[1][4] = 'files/img/shop/pickaxe_iron.png'
					allItems[1][12] = 170
			allItems[2] = new Array(18)
					allItems[2][0] = "steelPick"
					allItems[2][1] = "tools"
					allItems[2][2] = "pickaxe"
					allItems[2][3] = "Steel Pickaxe"
					allItems[2][4] = 'files/img/shop/pickaxe_steel.png'
					allItems[2][12] = 300

			allItems[5] = new Array(18)
					allItems[5][0] = "leaf"
					allItems[5][1] = "material"
					allItems[5][2] = "dropped"
					allItems[5][3] = "Leaves"
					allItems[5][4] = 'files/img/materials/leaf.png'

			allItems[6] = new Array(18)
					allItems[6][0] = "marigold"
					allItems[6][1] = "material"
					allItems[6][2] = "dropped"
					allItems[6][3] = "Marigold"
					allItems[6][4] = 'files/img/materials/marigold.png'

			allItems[7] = new Array(18)
					allItems[7][0] = "rosemary"
					allItems[7][1] = "material"
					allItems[7][2] = "dropped"
					allItems[7][3] = "Rosemary"
					allItems[7][4] = 'files/img/materials/rosemary.png'

			allItems[8] = new Array(18)
					allItems[8][0] = "help"
					allItems[8][1] = "[0]id, [1]class, [2]subClass, [3]name, [4]URL, [5]attackMin, [6]attackMax, [7]pDefence, [8]mDefence, [9]speed"
					allItems[8][2] = " [10]luck, [11]statusEffect, [12]goldBonus, [13]WoodBonus, [14]fishingBonus, [15]itemDropBonus"

			allItems[4] = new Array(18)
					allItems[4][0] = "flint"
					allItems[4][1] = "material"
					allItems[4][2] = "dropped"
					allItems[4][3] = "Flint"
					allItems[4][4] = 'files/img/materials/flint.png'
			allItems[9] = new Array(18)
					allItems[9][0] = "slimeEssence"
					allItems[9][1] = "material"
					allItems[9][2] = "dropped"
					allItems[9][3] = "Slime Essence"
					allItems[9][4] = 'files/img/materials/slimeEssence.png'
			allItems[10] = new Array(18)
					allItems[10][0] = "smallGolemEssence"
					allItems[10][1] = "material"
					allItems[10][2] = "dropped"
					allItems[10][3] = "Small Golem Essence"
					allItems[10][4] = 'files/img/materials/smallGolemEssence.png'

		// Crystal Shards
			allItems[11] = new Array(18)
					allItems[11][0] = "yShard"
					allItems[11][1] = "material"
					allItems[11][2] = "dropped"
					allItems[11][3] = "Cintrine Shard"
					allItems[11][4] = 'files/img/mapObj/Citrine/shard.png'
			allItems[12] = new Array(18)
					allItems[12][0] = "pShard"
					allItems[12][1] = "material"
					allItems[12][2] = "dropped"
					allItems[12][3] = "Iolite Shard"
					allItems[12][4] = 'files/img/mapObj/Iolite/shard.png'
			allItems[13] = new Array(18)
					allItems[13][0] = "gShard"
					allItems[13][1] = "material"
					allItems[13][2] = "dropped"
					allItems[13][3] = "Beryl Shard"
					allItems[13][4] = 'files/img/mapObj/Beryl/shard.png'
			allItems[14] = new Array(18)
					allItems[14][0] = "bShard"
					allItems[14][1] = "material"
					allItems[14][2] = "dropped"
					allItems[14][3] = "Tanzanite Shard"
					allItems[14][4] = 'files/img/mapObj/Tanzanite/shard.png'
			allItems[15] = new Array(18)
					allItems[15][0] = "rShard"
					allItems[15][1] = "material"
					allItems[15][2] = "dropped"
					allItems[15][3] = "Cuprite Shard"
					allItems[15][4] = 'files/img/mapObj/Cuprite/shard.png'

			// Crystal Gems
			allItems[16] = new Array(18)
					allItems[16][0] = "yGem"
					allItems[16][1] = "material"
					allItems[16][2] = "dropped"
					allItems[16][3] = "Cintrine Gem"
					allItems[16][4] = 'files/img/mapObj/Citrine/gem.png'
			allItems[17] = new Array(18)
					allItems[17][0] = "pGem"
					allItems[17][1] = "material"
					allItems[17][2] = "dropped"
					allItems[17][3] = "Iolite Gem"
					allItems[17][4] = 'files/img/mapObj/Iolite/gem.png'
			allItems[18] = new Array(18)
					allItems[18][0] = "gGem"
					allItems[18][1] = "material"
					allItems[18][2] = "dropped"
					allItems[18][3] = "Beryl Gem"
					allItems[18][4] = 'files/img/mapObj/Beryl/gem.png'
			allItems[19] = new Array(18)
					allItems[19][0] = "bGem"
					allItems[19][1] = "material"
					allItems[19][2] = "dropped"
					allItems[19][3] = "Tanzanite Gem"
					allItems[19][4] = 'files/img/mapObj/Tanzanite/gem.png'
			allItems[20] = new Array(18)
					allItems[20][0] = "rGem"
					allItems[20][1] = "material"
					allItems[20][2] = "dropped"
					allItems[20][3] = "Cuprite Gem"
					allItems[20][4] = 'files/img/mapObj/Cuprite/gem.png'

	// newish stuff
			allItems[21] = new Array(18)
					allItems[21][0] = "dagger_1"
					allItems[21][1] = "weapon"
					allItems[21][2] = "physical"
					allItems[21][3] = "Novice Dagger"
					allItems[21][4] = 'files/img/shop/dagger_1.png'
			allItems[22] = new Array(18)
					allItems[22][0] = "wood"
					allItems[22][1] = "material"
					allItems[22][2] = "dropped"
					allItems[22][3] = "Wood Log"
					allItems[22][4] = 'files/img/materials/wood.png'

			allItems[23] = new Array(18)
					allItems[23][0] = "plantFiber"
					allItems[23][1] = "material"
					allItems[23][2] = "dropped"
					allItems[23][3] = "Plant Fiber"
					allItems[23][4] = 'files/img/materials/plantFiber.png'

			allItems[24] = new Array(18)
					allItems[24][0] = "thorn"
					allItems[24][1] = "material"
					allItems[24][2] = "dropped"
					allItems[24][3] = "Thorns"
					allItems[24][4] = 'files/img/materials/thorn.png'
	//  swords

			allItems[25] = new Array(18)
					allItems[25][0] = "sword_1"
					allItems[25][1] = "weapon"
					allItems[25][2] = "physical"
					allItems[25][3] = "Novice Sword"
					allItems[25][4] = 'files/img/shop/sword_1.png'
					allItems[25][5] = 1
					allItems[25][6] = 4
					allItems[25][9] = -2

			allItems[26] = new Array(18)
					allItems[26][0] = "sword_2"
					allItems[26][1] = "weapon"
					allItems[26][2] = "physical"
					allItems[26][3] = "Cataclysm"
					allItems[26][4] = 'files/img/shop/sword_2.png'
					allItems[26][5] = 5
					allItems[26][6] = 12
					allItems[26][9] = -5

			allItems[27] = new Array(18)
					allItems[27][0] = "sword_3"
					allItems[27][1] = "weapon"
					allItems[27][2] = "physical"
					allItems[27][3] = "Ragnarok"
					allItems[27][4] = 'files/img/shop/sword_3.png'
					allItems[27][5] = 8
					allItems[27][6] = 20
					allItems[27][9] = -10

			allItems[28] = new Array(18)
					allItems[28][0] = "sword_4"
					allItems[28][1] = "weapon"
					allItems[28][2] = "physical"
					allItems[28][3] = "Gladiator"
					allItems[28][4] = 'files/img/shop/sword_4.png'
					allItems[28][5] = 25
					allItems[28][6] = 40
					allItems[28][9] = -20
	// axe
			allItems[29] = new Array(18)
					allItems[29][0] = "rustyAxe"
					allItems[29][1] = "tools"
					allItems[29][2] = "axe"
					allItems[29][3] = "Rusty Axe"
					allItems[29][4] = 'files/img/shop/rustyAxe.png'
					allItems[29][12] = 200
			allItems[30] = new Array(18)
					allItems[30][0] = "ironAxe"
					allItems[30][1] = "tools"
					allItems[30][2] = "axe"
					allItems[30][3] = "Iron Axe"
					allItems[30][4] = 'files/img/shop/ironAxe.png'
					allItems[30][12] = 200

			allItems[3] = new Array(18)
					allItems[3][0] = "steelAxe"
					allItems[3][1] = "tools"
					allItems[3][2] = "axe"
					allItems[3][3] = "Steel Axe"
					allItems[3][4] = 'files/img/shop/steelAxe.png'
					allItems[3][12] = 200

			allItems[31] = new Array(18)
					allItems[31][0] = "ironArmour"
					allItems[31][1] = "armour"
					allItems[31][2] = "chestPlate"
					allItems[3][3] = "Iron Armour"
					allItems[31][4] = 'files/img/shop/ironArmour.png'
					allItems[31][7] = 30
					allItems[31][8] = 15
					allItems[31][9] = -20





// example
// allItems[0] = new Array(18); 
// 					allItems[0][0] = "rustyPick"
// 					allItems[0][1] = "tools"
// 					allItems[0][2] = "pickaxe"
// 					allItems[0][3] = "Rusty Pickaxe"
// 					allItems[0][4] = 'files/img/shop/pickaxe_rusty.png'
// 					allItems[0][12] = 80
			// next is 10

// [0]id, [1]class, [2]subClass, [3]name, [4]URL, 
// [5]attackMin, [6]attackMax, [7]pDefence, [8]mDefence, [9]speed, 
// [10]luck, [11]statusEffect, [12]goldBonus, [13]WoodBonus, 
// [14]fishingBonus, [15]itemDropBonus,
