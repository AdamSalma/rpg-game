//=====================//
// Player Battle Stats //


var pBattle = {
	pAtk: function(criticalHit){
		var a = player.pAttack;
		// value between 0.75 and 1.25
		var rand = ((Math.random()* 50) + 75) / 100;
		var weaponBonus = 0;
		if ( player.weaponType === "physical" ){
			weaponBonus = rInt( player.weaponMin, player.weaponMax )
			console.log("weapon bonus = " +weaponBonus);
		} 
		var attackVariable = a*rand + weaponBonus;

		var defMultiplier = this.pDef();

		var atk = []
		atk[0] = Math.round(attackVariable * defMultiplier);
		
		if (criticalHit) {
			if (this.crit()) {
				console.log("crit enabled");
				atk[0] = Math.floor( 2.5 * atk );
				atk[1] = true;
			}	
		};
		if (atk[0] <= 0){
			atk[0] = 1;
		}
		return atk;

	},
	mAtk: function(criticalHit){
		var a = player.mAttack;
		var rand = ((Math.random()* 50) + 75) / 100;
		var weaponBonus = 0;
		if ( player.weaponType === "magic" ){
			weaponBonus = rInt( player.weaponMin, player.weaponMax );
			console.log("weapon bonus =" +weaponBonus);
		} 
		var attackVariable = a*rand + weaponBonus;


		var defMultiplier = this.mDef();

		var atk = []
		atk[0] = Math.round(attackVariable * defMultiplier);
		if (criticalHit) {
			if (this.crit()) {
				console.log("crit enabled");
				atk[0] = Math.floor( 2.5 * atk );
				atk[1] = true;
			}	
		};
		if (atk[0] <= 0){
			atk[0] = 1;
		}
		return atk;

	},
	pDef: function(){
		var eDefence = eval("currentMonster" + battleBox.attacked+ ".pDefence")/100;
		var defenceBonus = eval("currentMonster" + battleBox.attacked+ ".speed")/200 + eval("currentMonster" + battleBox.attacked+ ".luck")/200;
		var defMultiplier = 1 - ( eDefence + defenceBonus );
		return defMultiplier;
	},
	mDef: function(){
		var eDefence = eval("currentMonster"+ battleBox.attacked +".mDefence") /100;
		var defenceBonus = eval("currentMonster"+ battleBox.attacked +".speed") /200 + eval("currentMonster"+ battleBox.attacked +".luck") /200;
		var defMultiplier = 1 - ( eDefence + defenceBonus );
		return defMultiplier;
	},


	crit: function(){
		// crit chance
		var rand = Math.random();
		var threshold = 0.08 + (player.luck/200 + player.speed/200) + player.critBonus/100;
		if (rand <= threshold) {
			return true;
		} else return false;
	},
	miss: function(){
		var rand = Math.random();
		var speed = (player.speed / 200);
		var luck = (player.luck / 200);
		var dodge = rand+speed+luck;
		if (dodge >= 0.9){
			return true;
		} else return false;
	},
}

// Player Battle Stats //
//=====================//




var eHealthInit = function(all){
	var which = battleBox.attacked;
	if ( which === 3 || ( all && currentMonster3 !== undefined ) ) {
		console.log("starting eHealth 3")
		var healthPercent = Math.round( (currentMonster3.currentHealth / currentMonster3.health) * 100 );
		if (currentMonster3.enemyDetails() === undefined || currentMonster3.enemyDetails()) {
			$('#monsterFightPageInner #monster3 .percent').empty().html(healthPercent + "%");
		} else {
			$('#monsterFightPageInner #monster3 .percent').empty().html("???");
		}
		$('#monsterFightPageInner #monster3 .barInner').velocity({width: healthPercent + "%"}, 1000);
		// check to see if dead
		if (healthPercent === 0) {
			currentMonster3.defeated()
		};
	};	
	if ( which === 2 || ( all && currentMonster2 !== undefined ) ) {
		console.log("starting eHealth 2")
		var healthPercent = Math.round( (currentMonster2.currentHealth / currentMonster2.health) * 100 );
		if (currentMonster2.enemyDetails() === undefined || currentMonster2.enemyDetails()) {
			$('#monsterFightPageInner #monster2 .percent').empty().html(healthPercent + "%");
		} else {
			$('#monsterFightPageInner #monster2 .percent').empty().html("???");
		}
		$('#monsterFightPageInner #monster2 .barInner').velocity({width: healthPercent + "%"}, 1000);
		// check to see if dead
		if (healthPercent === 0) {
			currentMonster2.defeated()
		};
	};
	if ( which === 1 || ( all && currentMonster1 !== undefined ) ) {
		console.log("starting ehealth 1")
		var healthPercent = Math.round( (currentMonster1.currentHealth / currentMonster1.health) * 100 );
		if (currentMonster1.enemyDetails() === undefined || currentMonster1.enemyDetails()) {
			$('#monsterFightPageInner #monster1 .percent').empty().html(healthPercent + "%");
		} else {
			$('#monsterFightPageInner #monster1 .percent').empty().html("???");
		}
		$('#monsterFightPageInner #monster1 .barInner').velocity({width: healthPercent + "%"}, 1000);
		// check to see if dead
		if (healthPercent === 0) {
			currentMonster1.defeated()
		};
	};

	battle.checkForVictory()
}



window.rand10 = function(){
				return Math.random() * 10;
			}



		//========//
		// BATTLE //
var monsters = {
	pathway: {
		upper: [
			["rockElemAlpha", "alpha"], ["airElemAlpha", "alpha"], ["fireElemAlpha", "alpha"], ["waterElemAlpha", "alpha"]			
		],
		lower:[
			["rockElem", "normal"], ["airElem", "normal"], ["fireElem", "normal"], ["waterElem", "normal"]
		]
	},
	cave: ["crystElem", "crystElemAlpha", "crystQueen"]
}
var battle = {
		
		// all loot goes in here, at the end of the battle the player recieves it
		loot: {
			xp: 0,
			essence: 0,
			items: []
		},
		showBattleScreen: function(){
			var popper = $('#monsterPopup')
			popper.children('.battleStart').show()
			popper.children('.battleEnd').hide()
			popper.fadeIn(400)
			$('#monsterPopupBackground').fadeIn(400)
		},
		showLootScreen: function(){
			var popper = $('#monsterPopup')
			popper.children('.battleStart').hide()
			popper.children('.battleEnd').show()
			popper.fadeIn(1000)
			$('#monsterPopupBackground').fadeIn(1000)
		},
		awardLoot: function(){

			var bin = this.loot
			$('#essenceloot .container').html(bin.essence)
			$('#xploot .container').html(bin.xp)

			if (bin.items.length) {
				var item = $('#itemsloot .container');
				item.empty()
				for (var i = 0; i < bin.items.length; i++) {
					 item.append(bin.items[i])
				}
			}
			var foundAbug = true;
			$('#lootclose').one('click', function() {
				if (foundAbug) {
					foundAbug = false
					bin.essence = 0
					player.currency(true, bin.essence)
					player.XPChange(bin.xp)
					bin.xp = 0
					if (bin.items.length) {
						for (var i = 0; i < bin.items.length; i++) {
							 toolBar.addToInventory(bin.items[i])
						}
					}
					setTimeout(function(){
						$('#monsterPopup').fadeOut(400)
						$('#monsterPopupBackground').fadeOut(400, function(){
							battle.off()
							battle.resetBattle()
						})
					},500)
				}
			});

			this.showLootScreen()
			// INCOMPLETE
			// different id's are used to input data into fields. random ids so that can attach event 
			// lol just realised random ids aren't necessary. thanks jquery .one()
		},
		// so can stop monsters from attacking
		attackOn: true,
		attackCounter: 0,
		chanceOfAttack: function(){
			var rand = Math.floor( Math.random() * 100 );
			this.attackCounter++
			var minRepetitions = player.battleEvasion + 15
			if (this.attackCounter >= minRepetitions) {

				if (rand < 35) {
					console.warn(this.attackCounter)
					this.attackCounter = 0;
					return true;
				}
				return false
			}
		},
		init: function(mapLocation, bool){
			
			// bool makes attack happen 100%
			if (this.attackOn){
				var attacked = this.chanceOfAttack()
				if (attacked || bool) {	
					if (mapLocation !== undefined) {
						battle.loc = mapLocation;
						console.log("location is " + mapLocation)
					} else {
						throw new Error("mapLocation not supplied")
					}
					// BEGIN
					var quantityOfMonsters = function(){
						return Math.random()*10
					}

					if (quantityOfMonsters() > 5) {
						if (quantityOfMonsters() > 3) {
							console.warn(3)
							battleBox.howMany = 3;
						};
						battleBox.howMany = 2;
					} else {
						battleBox.howMany = 1;
					}
					console.log("Up against " + battleBox.howMany + " monsters.")
					this.getMonsters()
				};
			} else console.log("Attack Occured")
		},
		loc: undefined,
		getMonsters: function(){
			var x = battle.loc;
			var HowMany;
			var curMons = []
			var type = this.type
			HowMany = battleBox.howMany;


			// x === "pathway" ? (monsterQuant = monsters.pathway.length) : 
			// x === "caves" ? (monsterQuant = monsters.caves.length) :
			// console.log("Another one. WAIT THIS IS ERROR");

			if (x === "pathway") {
				var monsArr;
					var rand = rand10();
					var balance = player.level > 5? true : false;
					var harmony = 0
					if (!balance) { 
						harmony = 10 > player.level ? 0.5 : 1.2
					} 
				for (var i = 0; i < HowMany; i++) {
					if (rand < (2 + harmony) ) {
						monsArr = monsters.pathway.upper
					} else monsArr = monsters.pathway.lower;
					rand = rand10()
					switch(true){
						case (rand < 2.5):
							curMons[i] = monsArr[0][0]
							type[i] = monsArr[0][1]
							break;
						case (rand < 5):
							curMons[i] = monsArr[1][0]
							type[i] = monsArr[1][1]
							break;
						case (rand < 7.5):
							curMons[i] = monsArr[2][0]
							type[i] = monsArr[2][1]
							break;
						default:
							curMons[i] = monsArr[3][0]
							type[i] = monsArr[3][1]
					};
				};
			console.log("selected monsters= "+ curMons)
			} else {
				console.log(x + " is not === to pathway")
			}
			this.currentMonsters = curMons
			this.placeMonsters()
		},
		currentMonsters: [],
		type: [],
		placeMonsters: function(){
			var x = battleBox.howMany;
			var monsterNum = 1;
			while(x){
				var mons = $('#monster'+monsterNum);
				console.log( this.currentMonsters );
				var monsName = this.currentMonsters[monsterNum-1];
				// sets name
				if (this.loc === "pathway") {
					mons.children('span').children('img').attr("src", "files/img/monsters/pathway/"+monsName+".png")
				} else if (this.loc === "caves"){
					mons.children('span').children('img').attr("src", "files/img/monsters/caves/"+monsName+".png")
				}
				this.createCurrentMonster(monsterNum, monsName)
				var realName = eval("currentMonster" + monsterNum + ".monsterName" )
				mons.children('div.monsterName').html(realName)
				mons.fadeIn(1000).delay(1000).css('display', 'inline-block');
				console.log("created monster " + eval("currentMonster" + String( monsterNum )) )
				monsterNum++;
				x--;
			}
			eHealthInit(true)
			this.on()
		},
		createCurrentMonster: function(monsterNum, monsName){
			// set currentMonster and unhide monsterX
			// for (var i = 1; i <= maxNum; i++) {
			// 	console.log(i)
			// 	var me = this.currentMonsters[i]
			// 	eval( "currentMonster"+i+ " = " + toString( me ) )
			
			// 	eval( "currentMonster" + i + ".monsterNumber ="+ i)
			// 	console.log(eval("currentMonster"+i))
			// }
			eval("currentMonster" + String( monsterNum ) + "= Object.create( "+monsName+" )" )
			eval("currentMonster" + monsterNum + ".monsterNumber = " + monsterNum)	
			
		},

		on: function(){
				clearC()
				monsterPopupFadeOut();
				$('#monsterFightPage').fadeIn();
				var both = $('#battleRight, #battleLeft')
				$('#fightMode .bar, #fightMode').show()
				both.show().velocity({width: "400px"}, 800, function(){
					$('#fightMode .content').fadeIn(600)
					setTimeout(function(){
						both.hide()
					}, 1000)
					
				})
				setTimeout(function(){
					battle.startFight()
				}, 1700);
			},
		off: function(){
				var both = $('#battleRight, #battleLeft');
				both.show()
				$('#fightMode .content').fadeOut(600, function(){
					both.velocity({width: "0px"}, 800, function(){
						both.hide();
						$('#fightMode .bar, #fightMode').hide()
						$('#monsterFightPage').fadeOut(800)
					})
				})
			},
		startFight: function(){
					var whoStarts = Math.random();
					var value;
					if (whoStarts <= 0.5) {
						value = "Monster attacks first!";
						battle.turn(false)
					} else {
						value = "You get the first attack!";
						battle.turn(true)
					}
					clearC()
					$('#interaction1').prepend("<div id='banter'>" + value + "<hr /></div>").unbind();
					$('#interaction1 div').first().hide().fadeIn(400).unbind();
					setTimeout(function(){
						$('#banter').fadeOut(400, function() {
							$(this).remove()
						});
					}, 5000)
				},
		playerCanAttack: false,
		showArrow: function(){
			if (this.nextEnemyExists(3)) {
				$('#monster1').trigger('click')
			} else if (this.nextEnemyExists(1)) {
				$('#monster2').trigger('click')
			} else if (this.nextEnemyExists(2)){
				$('#monster3').trigger('click')
			}
		},
		turn: 	function(bool){
					if (bool === true) {
						//players turn
						this.turnCount++
						battleBox.enemyTurn = 0;
						console.log("Turn " + this.turnCount)
						this.showArrow()
						// checks for status effect and acts upon it
						var affected = this.statusEffect()
						if (!affected) {
							this.playerCanAttack = true
						};


						// maybe change something here on the UI

					} else {
						// enemy turn

						var numberOfEnemies = battleBox.howMany;
						var attackTimer = 0;
						console.log("Enemy attack start")
						for (var i = 1; i <= numberOfEnemies; i++) {
							var enemyBeaten = eval("currentMonster" + String(i) + ".beaten")
							if (!enemyBeaten) {
								var newNumber = i;
								setTimeout(function(){
									eval("currentMonster" + String(newNumber) + ".turn()")							
								}, 1500*attackTimer )
								attackTimer++
							};
						};						
					}
				}, 
		chooseAttack: function(atkName){
			// split for monster and player?


			// get type of attack from an obj here and decided what damage is based on it. eg:
			// if atkType = "normal", take either physical or magic atk and calculate damage, then pass it to something that does the deduction
			// might have to re-configure eHealth

			// find out which monster we're attacking:

			// insert content
			// here we calculate damage


			if (this.playerCanAttack) {
				this.playerCanAttack = false;
				var returned = []

				// damage and type
				if (atkName === "normalAttack") {
					console.log("Normal Attack Activated")
					returned = this.normalAttack()
		 			console.log(returned)
					// maybe be able to pass milliseconds to normalAttack and other attacks which gets added to a setTimeout to coincide with battleBox
				} else if (atkName === "doubleAttack"){
					returned = this.normalAttack()
					//////////////////////////////////////////////////////
				}
				
				// maybe have damage in setTimeout and call the battleBox movement from here?
				// or even battleBox inside eHealthChange. Maybe its a bit much tho

				

		 		if (returned === undefined) {
		 			console.log(returned, atkName)
		 			throw new Error("returned damage + type is undefined --- before player battlebox")
		 		}


				battleBox.player(returned);

			} else {
				console.warn("Not players turn to attack")
			}
		},
		pTypeOfAttack: function(){
			return "physical"
			// depending on what button is selected on UI next to big attack button
		},




		normalAttack: 	function(){
			var attack = {};
			var d = pBattle.miss()
			if (d) {
				postToClipboard("<span class='battleTextGreen'>The attack missed!</span>")
				attack.damage = "miss"
				attack.crit = false
				attack.type = " ";
				attack.miss = true
			} else {
				var damage;
				if( this.pTypeOfAttack() === "physical"){
					dam = pBattle.pAtk(true);
					attack.damage = dam[0];
					attack.crit = dam[1] ? true : false;
					attack.type = "Physical";
				} else {
					dam = pBattle.mAtk(true);							
					attack.damage = dam[0];
					attack.crit = dam[1] ? true : false;
					attack.type = "Magic";
				}
			}
			setTimeout(function(){
				battle.turn(false)
			},1300)
			return attack;
		},




		checkForVictory: function(){
			var numberOfEnemies = battleBox.howMany;
			var allDead = true;
			for (var i = 1; i <= numberOfEnemies; i++) {
				console.log("checking monster " + i);
				eval( "currentMonster" + i + ".currentHealth <= 0 ? console.log('its aliiiiiiive') : allDead = false;")
			};
			if (allDead) {
				setTimeout(function(){
					battle.victory()	
				}, 2500)
			}
		},
		specialAttackQuantity:1,
		specialSkillQuantity:0,
		specialMove: function(id){
							switch(true){
								case id === "doubleAttack":
									this.specialMoveList.doubleAttack()
									break;
								case id === "sleep":
									this.specialMoveList.sleep()
									break;
							}
						},
		specialMoveList:{



							doubleAttack: function(){
								postToClipboard("<span class='battleTextOrange'> Special move! Double Attack!</span>")
								$('#doubleAttack').css('backgroundColor', 'green');
								var atk;
								// uses whichever is higher. phy or mag
								function calc(){
									if (player.pAttack >= player.mAttack) {
										atk = pBattle.pAtk();
									} else {
										atk = pBattle.mAtk();
									}
								}
								calc()
								var damage1 = Math.floor( atk * 0.75 )
								calc()
								var damage2 = Math.floor( atk * 0.75 )
								setTimeout(function(){
									player.manaChange(-10)
									eHealthChange("-", damage1)
									postToClipboard("<span class='battleTextGreen'>The first hit dealt "+ -damage1 + "</span>" )				
								},400)
								setTimeout(function(){
									console.log("second attack activated")
									postToClipboard("<span class='battleTextGreen'>The second hit dealt "+ -damage2 +"</span>" )
									eHealthChange("-", damage2)
									battle.turn(false)
								}, 1400)

							},
							sleep: function(){
								var rnd = Math.random()
								if (rnd >= 0.33) {
									currentMonster.statusEffect = "sleep"
								};
							},







						},
		victory: function(){
						
						postToClipboard("<span class='textGreen'>You won the battle!</span>");
						this.awardLoot()	

				},
		resetBattle: function(){
			$('#monster1, #monster2, #monster3').css('opacity', '1');
			currentMonster1 = undefined;
			currentMonster2 = undefined;
			currentMonster3 = undefined;
			this.turnCount = 0
		},


		turnCount: 0, // for time based damage like poison
		statusCount: 0,
		affectedThisTurn: false,
		statusEffect:   function(){
							var a = player.afflicted
							if (a.poison === true || a.burned === true || a.freeze === true || a.stun === true || a.bind === true) {
								// 1
								if (a.poison === true) {
									this.statusCount++
									if (this.statusCount >= rInt(3,5)) {
										postToClipboard("<span class='battleTextRed'>Enemys' poison effect wore off...</span>")
										a.poison = false
										this.statusCount = 0
									} else {
										if (!this.affectedThisTurn){
											affectedThisTurn = true
											setTimeout(function(){
												player.healthChange(false, "poison")
												
											}, 500)
										}
									}
								} else if (false) {}; // 2
								console.log("reached")
								setTimeout(function(){
									battle.playerCanAttack = true									
								}, 400)
								return true
							} else {
								return false
							}
						},

		running: false,
		nextEnemyExists: function(currentEnemy){
			if (currentEnemy === 1) {
				if (currentMonster2 !== undefined && !currentMonster2.defeated){
					return true;
				} else if (currentMonster3 !== undefined && !currentMonster3.defeated){
					return true;
				}
				return false;
				
			} else if (currentEnemy === 2) {
				if (currentMonster3 !== undefined && !currentMonster3.defeated){
					return true
				} 
				return false
			} else if (currentMonster1 !== undefined && !currentMonster1.defeated) {
				return true
			}
			return false
		},
	}


//==============================================================================================//
//==============================================================================================//
//==============================================================================================//
//==============================================================================================//
//==============================================================================================//



var battleBox = {
	howMany: 3,
	attacked: 1,
	enemyTurn: 0,
	posWhen1: "375px",
	posWhen2: ["266px", "480px"],
	posWhen3: ["156px", "375px", "589px"],
	
	ePosWhen2: ["240px", "458px"],
	ePosWhen3: ["133px", "355px", "565px"],

	player: function(returned){

		//put value in box paste out into box
		var id = "#" + this.tempID
		if (this.howMany === 1) {
			this.moveP(this.posWhen1, returned)
		};

		if (this.howMany === 2) {
			if (this.attacked === 1) {
				this.moveP(this.posWhen2[0], returned)
			} else {
				this.moveP(this.posWhen2[1], returned)
			}
		};

		if (this.howMany === 3) {
			if (this.attacked === 1) {
				this.moveP(this.posWhen3[0], returned)
			} else if (this.attacked === 2){
				this.moveP(this.posWhen3[1], returned)
			} else {
				this.moveP(this.posWhen3[2], returned)
			}
		};

	},
	tempID: undefined,
	moveP: function(x, returned){
		console.log("Started moveP")

 		// UI of box
 		var color = (returned.damage === "magic") ? "textBlue" : 
 					returned.miss ? "boxMiss" : "textRed"
 		var border = returned.crit ? "gold solid 2px" : " #282828 solid 1px "


		// create box
		var id = "a"+Date.now();
		var box = '<div id="'+id+'" class="movingBox">\
						<div class="content">\
							<div class="number ' +color+ '">' +returned.damage+ '</div>\
							<span class="type">' +returned.type+ '</span>\
						</div>\
					</div>'
 		$('#damageZone').append(box)
 		var newID = $('#'+ id)



 		// rebound x offset
 		var offset = "+=0px";
 		var newX = parseInt(x);
 		if (newX > 375) {
 			offset = "+=30px"
 		} else if( newX < 375){
 			offset = "-=30px"
 		}

 		// hide monsterArrow while attacking
 		var monsterArrow = $('#monsterFightPageInner .arrow')
 		monsterArrow.fadeOut(400)
 		// settings for box:
 		// width: "90px", height: "90px", backgroundColor: "#282828", border:"darkorange solid 2px", outline: "#282828 solid 1px"
 		setTimeout(function(){
 			newID
 				.velocity({top: 0, left: x}, 600, "easeInQuart", function(){
					// move to player
 					if (returned.miss) {
 						console.log("miss")
 					} else {
	 					eHealthChange('-', returned.damage);
	 					eHealthInit("all");
 					}
 				})
	 				.velocity({top: "+=30px", left: offset}, 400, "easeOutSine")
	 					// after rebound
	 					.delay(200).velocity({left: "+=20px", top: "+=5px", opacity: 0}, 200, "easeInSine", function(){
	 						// reappears on the side:
		 					$('#'+id+ " .content").show()
	 						$(this).hide()
	 							.css({
		 							top: '50px',
		 							left: '700px',
		 							opacity: 1,
		 							backgroundColor: "#282828",
		 							border: border,
		 							width: "90px",
		 							height: "90px",
		 						})
		 						.slideToggle(500);

	 						// fades out
	 						setTimeout(function(){
	 							newID.velocity({top: "+=20px", opacity: 0}, 500, function(){
	 								$(this).remove()
	 							})
	 						},1500)
		 					
	 						
	 					})
			
 		},100)
	},
	enemy: function(returned){

 		if (returned === undefined) {
 			console.log(returned)
 			throw new Error("attackArray damage + type is ^^")
 		}

		//put value in box paste out into box
		if (this.howMany === 1) {
			this.moveE(this.posWhen1, returned)
		};

		if (this.howMany === 2) {
			if (this.enemyTurn === 1) {
				this.moveE(this.posWhen2[0], returned)
			} else {
				this.moveE(this.posWhen2[1], returned)
			}
		};

		if (this.howMany === 3) {
			if (this.enemyTurn === 1) {
				this.moveE(this.posWhen3[0], returned)
			} else if (this.enemyTurn === 2){
				this.moveE(this.posWhen3[1], returned)
			} else {
				this.moveE(this.posWhen3[2], returned)
			}
		};

	},
	moveE: function(x, returned){
		console.log("Started moveE")
		// UI of box
		var nextEnemyExists = battle.nextEnemyExists(this.enemyTurn)
 		var color = (returned.damage === "magic") ? "textBlue" : 
 					returned.miss ? "boxMiss" : "textRed"
 		var border = returned.crit ? "gold solid 2px" : " #282828 solid 1px "


		// create box
		var id = "a"+Date.now();
		var box = '<div id="'+id+'" class="movingBox">\
						<div class="content">\
							<div class="number ' +color+ '">' +returned.damage+ '</div>\
							<span class="type">' +returned.type+ '</span>\
						</div>\
					</div>'
 		$('#damageZone').append(box)
 		var newID = $('#'+ id)

 		var offset = "+=0px";
 		var newX = parseInt(x);
 		if (newX < 375) {
 			offset = "+=30px"
 		} else if( newX > 375){
 			offset = "-=30px"
 		}

 		newID.css({
 			top: '10px',
 			left: x
 		});
 		$('#monsterFightPageInner .arrow').hide()
 		setTimeout(function(){
 			newID
 				.velocity({top: "150px", left: "375px", opacity:0.7}, 600, "easeInQuart", function(){
 					if (returned.miss) {
 						player.healthChange(false, "miss")
 					} else {
 						player.healthChange(-returned.damage)
 					}
 				})
 				// hits ^^
 				.velocity({top: "-=30px", left: offset}, 400, "easeOutSine")
	 			// rebounds ^^
	 			.delay(200).velocity({left: "-=20px", top: "-=5px", opacity: 0}, 200, "easeInSine", function(){
				// dissappears ^^ reappears on the side:
					if (!nextEnemyExists) {
						battle.turn(true)
					}
					$('#'+id+ " .content").show()

					$(this).hide()
					.css({
						opacity: 1,
						top: '50px',
						left: '20px',
						width: "90px",
						height: "90px",
						border: border,
						backgroundColor: "#282828",
					})
					.slideToggle(500);

					// fades out
					setTimeout(function(){
						newID.velocity({top: "+=20px", opacity: 0}, 500, function(){
							$(this).remove()
						})
					}, 1500)
 				})
 		}, 100)
	},
}
