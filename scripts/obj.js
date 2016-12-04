

// TOP
function spreadTheLove(){;
	player.pAttack = data.pStats.attack;
	player.mAttack = data.pStats.magic;
	player.pDefence = data.pStats.defence;
	player.mDefence = data.pStats.magicDefence;
	player.speed = data.pStats.speed;
	player.luck = data.pStats.luck;
	
	player.moneyBonus = data.pStats.moneyBonus;
	player.woodBonus = data.pStats.woodBonus;
	player.fishingBonus = data.pStats.fishingBonus;
	player.itemDropBonus = data.pStats.itemDropBonus;

	player.XP = data.maxStats.maxXp;
	player.endurance = data.pStats.endurance;
	player.wisdom = data.pStats.wisdom;

	player.currentHP = data.pStatus.currentHealth;
	player.currentXP = data.pStatus.currentXp;
	player.currentMana = data.pStatus.currentMana;

	player.level = data.pStatus.level;
	player.afflicted.poison = data.pStatus.afflicted.poison;
	player.afflicted.stun = data.pStatus.afflicted.stun;
	player.afflicted.burn = data.pStatus.afflicted.burn;
	player.afflicted.freeze = data.pStatus.afflicted.freeze;
	player.afflicted.bind = data.pStatus.afflicted.bind;

	player.weapon = data.pEquipment.weapon;
	player.tools = data.pEquipment.tools;
	player.armour = data.pEquipment.armour;
	player.special = data.pEquipment.special;

	player.dirak = data.pInventory.dirak;
	player.essence = data.pInventory.essence;

	player.Class = data.user.Class;

	

	// console.log(JSON.stringify(player, null, 4))
}

function bringBackTheLove(){
	data.pStats.attack = player.pAttack;
	data.pStats.magic = player.mAttack;
	data.pStats.defence = player.pDefence;
	data.pStats.magicDefence = player.mDefence;
	data.pStats.speed = player.speed;
	data.pStats.luck = player.luck;

	data.pStats.moneyBonus = player.moneyBonus;
	data.pStats.woodBonus = player.woodBonus;
	data.pStats.fishingBonus = player.fishingBonus;
	data.pStats.itemDropBonus = player.itemDropBonus;

	data.maxStats.maxXp = player.XP;
	data.pStats.endurance = player.endurance;
	data.pStats.wisdom = player.wisdom;

	data.pStatus.currentHealth = player.currentHP;
	data.pStatus.currentXp = player.currentXP;
	data.pStatus.currentMana = player.currentMana

	data.pStatus.level = player.level;

	data.pStatus.afflicted.poison = player.afflicted.poison;
	data.pStatus.afflicted.stun = player.afflicted.stun;
	data.pStatus.afflicted.burn = player.afflicted.burn;
	data.pStatus.afflicted.freeze = player.afflicted.freeze;
	data.pStatus.afflicted.bind = player.afflicted.bind;

	data.pEquipment.weapon = player.weapon;
	data.pEquipment.weaponType = player.weaponType;
	data.pEquipment.pWeaponMin = player.pWeaponMin;
	data.pEquipment.pWeaponMax = player.pWeaponMax;
	data.pEquipment.mWeaponMin = player.mWeaponMin;
	data.pEquipment.mWeaponMax = player.mWeaponMax;

	data.pEquipment.tools = player.tools;
	data.pEquipment.armour = player.armour;
	data.pEquipment.special = player.special;

	data.pInventory.dirak = player.dirak;
	data.pInventory.essence = player.essence;

	data.user.Class = player.Class;

	objSave();

	// console.log(JSON.stringify(data, null, 4))

}


// player object

var player = {
	Class: undefined,
	pAttack: undefined,
	mAttack: undefined,
	pDefence: undefined,
	mDefence: undefined,
	speed: undefined,
	critBonus: 0,
	luck: undefined,
	endurance: undefined,
	wisdom: undefined,

	// ++ makes it harder to initiate battle. Will happen eventually tho
	battleEvasion: 0,

	HP: function(){
		return 100 + (20 * (this.level - 1)) + (5 * this.endurance);
	},

	currentHP: undefined,

	healthInit: function(){
					var healthPercent =  String(Math.round((this.currentHP / this.HP()) * 100))+ "%";
					$('#healthPercent').empty().html(this.currentHP + "/" + this.HP());
					$('#healthContent').velocity({width: healthPercent}, 1000)
				},
	healthChange: 	function(value, other) {
						var change = String(value);
						var uniqueid = Date.now();
						var newId = "a" + uniqueid;
						var classColor;
						var integer = parseInt(change);
						var regExp = new RegExp("[0-9]")
						var healthPerInt;
						// other health effects that require a color change
						if (other) {
							if (other === "miss") {
								change = "Miss";
								classColor = "textYellow";
							} else if (other === "poison"){
								var poiRes = player.resistance.poison || 1
								integer = Math.round(this.HP() / (15 + poiRes));
								change = "-"+integer;
								classColor = "textPurple";
								this.currentHP -= integer;
								healthPerInt = Math.round((this.currentHP / this.HP()) * 100);
								if (healthPerInt <= 0) {
									healthPerInt = "0";
									this.gameOver();	
								};
								postToClipboard("<span class='textPurple'>The monsters poison dealt " + integer + "</span>")
							}
						} else {
							if ( regExp.test(change.charAt(0)) ) {

								classColor = "textLime"								
								this.currentHP += integer;
								healthPerInt = Math.round((this.currentHP / this.HP()) * 100);
								changeOuterDivTo('green', 1);

								if (healthPerInt >= this.HP()) {
									healthPerInt = "100";
									this.currentHP = this.HP();
								} else if (this.currentHP > this.HP()){
									this.currentHP = this.HP()
								}
								change = "+" + change;
							} else if (change.charAt(0) === "-") {

								classColor = 'textRed'
								this.currentHP += integer;
								healthPerInt = Math.round((this.currentHP / this.HP()) * 100);
								changeOuterDivTo('red', 1);
								if (healthPerInt <= 0) {
									healthPerInt = "0";
									$('#healthPercent').empty().html("0%");
									$('#healthContent').css("width", "0%");
									this.gameOver();	
								}

							} else {
								console.log("change is " + change + " and typeof is " + typeof change + " other="+other)
								throw new Error(" player.healthChange(), No '-' or '+' symbol in front of argument");
							}
							
						}
							$('#healthChange').append('<span class="' +classColor+ '" id="' + newId + '">' + change + '</span');
							$("#" + newId).velocity({top: "-=60px", opacity : 0}, 3000);
							setTimeout(function(){
								$("#" + newId).remove();
							}, 3000)

							this.healthInit();
					},

	XP: undefined,
	currentXP: undefined,
	level: undefined,
	XPInit: function(){
				var XPercent/*eyy*/ = Math.round((this.currentXP / this.XP) * 100);
				$('#xpPercent').empty().html(this.currentXP + "/" + this.XP);
				$('#xpContent').velocity({width: XPercent+"%"}, 1000)
			},
	XPChange: function(value){
					var change = value;
					this.currentXP += change;
					if (this.currentXP >= this.XP) {
						$('#xpContent').velocity({width: "100%"}, 1000, function(){
							$(this).css('width', 0);
						})
						setTimeout("levelup.init();", 2500);
						
					} else {
						if (change > 0){
							change = "+" + change;
						} 
						var unique = Date.now();
						var newId = "a" + unique;
						$('#xpChange').append('<span class="textYellow hideMe" id="' + newId + '">' + change + '</span')
						
						$("#" + newId).fadeIn(100).delay(100).velocity({
							top: "-=40px",
							opacity : 0
						}, 3000);

						setTimeout(function(){
							$("#" + newId).remove();
						}, 3000)

						this.XPInit()						
					}
				},
	levelInit: function(){
					$('#levelContent').html(this.level);
				},
	
	mana: function(){
		return 100 + (8 * (this.level - 1)) + (5 * this.wisdom)

	},
	currentMana: undefined,
	manaChange: function(value){
					var change = value;
					this.currentMana += change;
					if (this.currentMana >= this.mana()) {
						this.currentMana = this.mana();
					};

					var unique = Date.now();
					var newId = "a" + unique;
					if (change > 0){
						change = "+" + change;
					} 
					$('#manaChange').append('<span class="textBlue hideMe" id="' + newId + '">' + change + '</span')
					
					$("#" + newId).fadeIn(100).delay(100).velocity({
						top: "-=40px",
						opacity : 0
					}, 3000);

					setTimeout(function(){
						$("#" + newId).remove();
					}, 3000)

					
					changeOuterDivTo("blue", 1);
					this.manaInit()
				},
	manaInit: function(){
				var manaPer = Math.round((this.currentMana / this.mana()) * 100);
				$('#manaPercent').empty().html(this.currentMana + "/" + this.mana());
				$('#manaContent').velocity({width: manaPer + "%"}, 1000);
			},

	

	resourceBonus: function(x){
						if (x) {	
							var q = (x*100)/4;
							this.moneyBonus += q
							this.woodBonus += q
							this.itemDropBonus += q
							this.fishingBonus += q
						} else {
							return (this.moneyBonus + this.woodBonus + this.itemDropBonus + this.fishingBonus) / 400
						}
					},
	moneyBonus: undefined,
	woodBonus: undefined,
	itemDropBonus: undefined,
	fishingBonus: undefined,
	//any other bonuses

	weapon: undefined,
	weaponType: undefined,
	weaponMin: undefined,
	weaponMax: undefined,

	tools: undefined,
	armour: undefined,
	special: undefined,


	dirak: 100,
	essence: 0,


	currencyInit: 	function(){
					$('#dirak').html(this.dirak)
					$('#essence').html(this.essence)
				},
	currency: function(which, change){
						var amount = change;
						//change color of text
						var className, string, id;
						var refD = this.dirak
						var refE = this.essence



						if (which === "dirak") {


							if ( (refD += amount ) < 0) {
								console.warn("Cannot deduct more Dirak than available")
								return false
							} else {
								this.dirak += amount;
							}
							id = $('#dirakContent')

						} else {


							if ( (refE += amount) < 0) {
								console.warn("Cannot deduct more Essence than available")
								return false
							} else {
								this.essence += amount;
							}
							id = $('#essenceContent')

						}

						if (amount === 0) {
							bool = true
							className = "textWhite";
						} else if (amount > 0){
							bool = true;
							amount = "+" + amount
							className = ( which === "dirak" ) ? "textGold" : "textEssence"

						} else {
							bool = false;
							className = "textRed";
						};
						//random ID so it can be deleted with callback after ani
						var unique = "a" + Date.now();
						var string = '<span class="' +unique+ " " +className+ '">' +amount+ '</span>'
						id.append(string);

					
						$("." + unique).fadeIn(100).delay(100).velocity({
							top: "-=30px",
							opacity : 0
						}, 1500, function(){
							$("." + unique).remove();
						})

						this.currencyInit();

						return "YES SIR!"
						},


	afflicted: { // whats afflicting the player
		burn: false,
		freeze: false,
		poison: false, 
		stun: false,
		bind: false // depends on speed
	}, 

	resistance:{ // bonus to not be afflicted
		burn: undefined,
		freeze: undefined,
		poison: undefined,
		stun: undefined,
		bind: undefined // depends on speed
	},

	gameOver: function(){
		// kill all processes here that can be linked such as fights.... and thats it lol
		// new idea, deduct gold by 1/5, start currentXP at 0
		postToClipboard("You died...")
		throw new Error("You died. Fatal error there m8")
	},

	specialAttack: {	
		//different special attacks go here plus learnt ones. They pop up in a list or pre-set boxes like adventure quest
		// each has accurancy and power.
		// here calculate damage
	}
}


var levelup = {
	//adds stats to level up screen
	stats: function(){
		$('#leveltext .level').html(player.level)
		// also get second page ready like quests shop items etc
		switch(true){
			case ( player.level%2 === 0 ):
				this.newQuest();
			case ( player.level%5 === 0 ):
				this.newShopitems();
			case ( player.level%8 === 0 || player.level===2 ):
				this.newSkill();
				break;
			default:
				$('#lvlbutton').html("Close").addClass('close')
		};
	},
	init: function(){

				while(player.currentXP > player.XP){

					player.level += 1;
					
					player.currentXP = player.currentXP - player.XP;
					player.XP -= Math.round( (Math.sqrt(player.level)+player.level)/2*100-player.level*100 );
					player.currentHealth += 20
					player.currentMana += 8

				}
				player.levelInit()
				player.healthInit()
				player.manaInit()

				//levelup screen

				this.stats()
				$('#levelUpScreen').fadeIn(500)
				$('#levelUpWrapper').fadeIn(500)
				var l = 0
				
				if (!this.levelUpRecently) {
					this.levelUpRecently = true
					setTimeout(function(){

						$('.levelUpHeader').show()
						for (var i = 0; i < 2; i++) {
							$('.levelUpHeader').velocity({opacity: 0}, 800, function(){
								$('.levelUpHeader').css({opacity: 1});
								//for adding multiple flashes of the "level up"
								l++
								if (l === 2) {			
									console.log("starting anim")
									$('#levelUpScreen .levelUpHeader').velocity({"top": "20px"}, 1000, function(){						

										$('#leveltext').fadeIn(800, function(){
											$('#levelStats div').each(function(index) {
												var self = $(this)
												setTimeout(function(){
													self.show()
												},(index)*800)
											});
											setTimeout(function(){
												$('#lvlbutton').fadeIn(400)
												levelup.levelUpRecently = false
											},2200)
										});

									});
								};
							});
						};
						player.levelInit();
						player.XPInit()
					}, 800)
				}
			},
	levelUpRecently: false,
	term: function(){
		// end of lvlup
		$('#levelUpWrapper').fadeOut( 500 )
		$('#levelUpScreen').fadeOut( 500, function(){
			$('#lvlbutton').html("Next").removeClass('close').hide();
			$('#levelUpScreen .levelUpHeader').css("top", "145px");
			$('#leveltext').hide()
			$('#levelStats div').hide()
			$('#levelUpScreen .screen1').show()
			$('#levelUpScreen .screen2').hide()
			$('#levelUpScreen').css({
				borderColor: 'darkorange',
				boxShadow: 'inset 0px 0px 10px darkorange'
			});

		})
	},
	switchScreens: function(){
		$('#lvlbutton').velocity({
				color: '#b300b2',
				"border-color": '#b300b2'
			}).addClass('close');

		$('#lvlbutton').hide().html("Close").fadeIn(400)
			
		$('#levelUpScreen .screen2').fadeIn(600)
		$('#levelUpScreen .screen1').fadeOut(400, function(){
			$('#levelUpScreen').css({
				borderColor: 'purple',
				boxShadow: 'inset 0px 0px 10px purple'
			});
		})
	},


	questCounter: undefined,
	newQuest: 	function(){
					var q = this.questCounter;
					if (q === 0) {

					} else if (q === 1) {

					} else if (q === 2) {

					} else if (q === 3) {

					} else if (q === 4) {

					} else if (q === 5) {

					} else if (q === 6) {

					} else if (q === 7) {

					} else if (q === 8) {

					} else if (q === 9) {

					} else if (q === 10) {

					} else if (q === 11) {

					} else if (q === 12) {

					} else if (q === 13) {

					} else if (q === 14) {

					} else if (q === 15) {

					} else if (q === 16) {

					} else if (q === 17) {

					} else if (q === 18) {

					} else if (q === 19) {

					} else {

					}
				},

	shopItemCounter: undefined,
	newShopitems: function(){},

	skillCounter: undefined,
	newSkill: function(){},
}

























//=====================//
// Monster Constructor //

var rockElem, rockElemAlpha, airElem, airElemAlpha, fireElem, fireElemAlpha, waterElem, waterElemAlpha;
jQuery(document).ready(function($) {
	

						   //health, pAttack, mAttack, pDefence, mDefence, speed, luck, drops,                       monsterName, xp, essenceDropped
	rockElem = new MonsterFactory(   30,   8,       0,       14,        4,     3,    5,   "rock"             , "Earth Elemental", 35, 2)
	rockElemAlpha = new MonsterFactory(70,18,       0,       30,        8,     8,    5,   "earthElementalEssence", "Alpha Earth Elemental", 75, 6)
	airElem = new MonsterFactory(25,0,       13,       30,        20,     20,    2,   "oxygenCrystal", "Air Elemental", 32, 2)
	airElemAlpha = new MonsterFactory(60, 0,        23,       70,        2,     12,    1,   "ocygenCrystal", "Alpha Air Elemental", 80, 7)
	waterElem = new MonsterFactory(24,9,       0,       30,        12,     13,    10,   "waterCrystal", "Water Elemental", 36, 3)
	waterElemAlpha = new MonsterFactory(75,20,       0,       25,        30,     16,    15,   "waterCrystal", "Alpha Water Elemental", 68, 5)
	fireElem = new MonsterFactory(14,0,       16,       5,        10,     10,    4,   "fireCrystal", "Fire Elemental", 33, 2)
	fireElemAlpha = new MonsterFactory(65,0,       20,       2,        19,     15,    24,   "fireCrystal", "Alpha Fire Elemental", 89, 7)

});



var currentMonster1, currentMonster2, currentMonster3;

var MonsterFactory = function(health, pAttack, mAttack, pDefence, mDefence, speed, luck, drops, monsterName, xp, essenceDropped){
	this.pAttack = pAttack;
	this.mAttack = mAttack;
	this.pDefence = pDefence;
	this.mDefence = mDefence;
	this.speed = speed;
	this.luck = luck;
	this.health = health;
	this.currentHealth = health;
	this.drops = drops;
	this.monsterName = monsterName;
	this.mult = 1;
	this.xp = xp;
	this.essence = essenceDropped;

	this.nightTime = false;
	this.statusEffect = false;
	this.beaten = false;

	monsterNumber = undefined;
};


MonsterFactory.prototype.defeated = function(  ){
			
	if (!this.beaten) {
		this.beaten = true

		var items = $.isArray(this.drops) ? this.drops : [this.drops];
		var rand = Math.random();
		
		var bin = battle.loot;
		bin.xp += this.xp;
		bin.essence += this.essence;
		

		var quantity;
		if (rand > 5) {
			rand = Math.random();
			quantity = ( rand <= 0.33 ) ? 1 : (rand <= 0.66 ) ? 2 : 3;

			for (var i = 0; i < quantity; i++) {
				if (items.length > 1) {
					var length = items.length;
					rand = Math.ceil( length * Math.random() );
					bin.items.push( items[rand] );
				} else {
					bin.items.push( items[0] );
				}
			
			}
		} 

		var monster = eval(  $('#monster' + this.monsterNumber) )
		monster.velocity({'opacity': '0.6'}, 500);
		battle.checkForVictory()

	}
};


MonsterFactory.prototype.enemyDetails = function(){
		// === 1? have levels for all of the iinformation you can gain off an enemy like stats and attribues and level etc
	return false
}
MonsterFactory.prototype.pAtk = function(criticalHit){
	var a = this.pAttack;
	var rand = ( ( Math.random()*50 ) + 75 ) / 100;

	var attackVariable = a*rand;

	var defMultiplier = this.pDef();

	var atk = []
	atk[0] = Math.round(attackVariable * defMultiplier);
	if (this.crit()) {
		console.log("crit enabled");
		atk[1] = Math.floor( 2.5 * atk[0] );
	}	
	
	if (atk[0] <= 0){
		atk[0] = 1;
	}

	return atk;

}

MonsterFactory.prototype.mAtk = function(criticalHit){

		var a = this.mAttack;
		var rand = ((Math.random()* 50) + 75) / 100;

		var attackVariable = a*rand;

		var defMultiplier = this.mDef();

		var atk = []
		atk[0] = Math.round(attackVariable * defMultiplier);
		if (this.crit()) {
			console.log("enemy crit enabled");
			atk[1] = Math.floor( 2.5 * atk[0] );
		}	
		if (atk[0] <= 0){
			atk[0] = 1;
		}
		return atk;

	}
MonsterFactory.prototype.pDef = function(){
		var eDefence = player.pDefence /100;
		var defenceBonus = player.speed /200 + player.luck /200;
		var defMultiplier = 1 - ( eDefence + defenceBonus );
	
		return defMultiplier;
	}
MonsterFactory.prototype.mDef = function(){
		var eDefence = player.mDefence /100;
		var defenceBonus = player.speed /200 + player.luck /200;
		var defMultiplier = 1 - ( eDefence + defenceBonus );
		return defMultiplier;
	}


MonsterFactory.prototype.crit = function(){
		// crit chance
		var rand = Math.random();
		var threshold = 0.08 + (this.luck/200 + this.speed/200);
		if (rand <= threshold) {
			return true;
		} else return false;
	}
MonsterFactory.prototype.miss = function(){
		var rand = Math.random();
		var speed = (this.speed / 200);
		var luck = (this.luck / 200);
		var dodge = rand+speed+luck;
		if (dodge >= 0.9){
			return true;
		} else return false;
	}

MonsterFactory.prototype.specialAttack = function(){
	var bool = rand10() < 1 ? true : false;
	return false 
	// return bool
}
MonsterFactory.prototype.isItNight = function(){
	var h = dataF.time.hours
	var wellIsIt;
	if (h >= 20) {
		wellIsIt = true
	} else if (h <= 6){
		wellIsIt = true
	} else wellIsIt = false;

	if(wellIsIt){
		this.nightTime = true;

		var multiplier = this.multiplier + 1.5
		this.pAttack = Math.floor( this.pAttack * mult );
		this.pDefence = Math.floor( this.pDefence * mult);
		this.mAttack = Math.floor( this.mAttack * mult);
		this.mDefence = Math.floor( this.mDefence * mult);
		this.speed = Math.floor( this.speed * mult);
		this.luck = Math.floor( this.luck * mult);
		this.health = Math.floor( this.health * mult);

		// max health goes up, so too should current health
		this.currentHealth = Math.floor( this.health );

	}
}
MonsterFactory.prototype.checkStatusEffect = function(){
	if (true) {
		return true
	};
	// ?? check secondary damage like poison or burn
}

MonsterFactory.prototype.turn = function(){
	// engine for a turn

 	// time 
	battleBox.enemyTurn++
	if (!this.beaten) {
		console.log("currentMonster"+this.monsterNumber+" attacks")
		dataF.time.addTime(0,0,0,45);

		if (this.statusEffect) {
			this.checkStatusEffect()
		};

		if (this.nightTime) {
			console.log("night night")
			this.isItNight();
		};

		var attack = {}
		var missed = this.miss();

		if (missed) {

			postToClipboard("<span class='battleTextGreen'>The enemy attack missed!</span>")
			attack.damage = "miss"
			attack.miss = true
			attack.crit = false
			attack.type = " ";

		} else {

			console.log("atkTime")
			if (this.specialAttack()) {
				// special damage here. Sleep, poison, burn, blind;
				// set up 4 stypes of special attacks for fire wind earth and water. 
				// attach to prototype so all have it
				// then here chose which one is specified
				// maybe not the 4 attack thing. probably different types

				console.log("Special Attack occured. No Damage... Yet.")
			} else {
				if (this.pAttack > this.mAttack) {
					dam = this.pAtk(true);
					attack.damage = dam[0]
					attack.crit = dam[1] ? true : false;
					attack.type = "Physical";
				} else {
					dam = this.mAtk(true);
					attack.damage = dam[0]
					attack.crit = dam[1] ? true : false;
					attack.type = "Magic";
				}
			}
		}
		
		battleBox.enemy(attack)
		

		// mechanism that displays UI indicating that it is attacking
		// how about a circle that inflates behind the img in the center and then retracts after turn 

		// if statement to choose type of attack. can add a bit of AI boost to counter player. 

		// inflict damage against me

		// THE ANIMATION OH YEAH

		// consoles

		// 
	} else {
		// check for victory, else add items to the loot array
		console.log("currentMonster"+this.monsterNumber+" is defeated")
	}
}

// Monster Constructor //
//=====================//









// objects (lol)

function objSave(){

	data.obj.rockArray = [];
	data.obj.treeArray = [];
	data.obj.bushArray = [];
	data.obj.shrubArray = [];

	// ROCKS
	for (var i = 0; i < rockArr.length; i++) {
		var x = eval( rockArr[i] + ".counter" ) 
		data.obj.rockArray.push( x );
	};

	// TREES
	for (var i = 0; i < treeArr.length; i++) {
		var x = eval( treeArr[i] + ".counter" ) 
		data.obj.treeArray.push( x );
	};

	// GEORGE BUSH
	for (var i = 0; i < bushArr.length; i++) {
		var x = eval( bushArr[i] + ".counter" ) 
		data.obj.bushArray.push( x );
	};

	// SHRUB
	for (var i = 0; i < shrubArr.length; i++) {
		var x = eval( shrubArr[i] + ".counter" ) 
		data.obj.shrubArray.push( x );
	};
	
}

var rockArr = ["rockObj1"]
var treeArr = ["treeObj1", "treeObj2", "treeObj3", "treeObj4", "treeObj5", "treeObj6", "treeObj7", "treeObj8", "treeObj9", "treeObj10", "treeObj11", "treeObj12", "treeObj13", ]
var bushArr = ["bushObj1", "bushObj2", "bushObj3", "bushObj4", "bushObj5", "bushObj6"]
var shrubArr = ["shrubObj1", "shrubObj2", "shrubObj3"]


function objLoad(){

	 var tree = data.obj.treeArray;
	 for (var i = 0; i < tree.length; i++) {
	 	eval( treeArr[i] + ".counter =" + tree[i]); 
	 };

	 var rock = data.obj.rockArray;
	 for (var i = 0; i < rock.length; i++) {
	 	eval( rockArr[i] + ".counter =" + rock[i]); 
	 };

	 var bush = data.obj.bushArray;
	 for (var i = 0; i < bush.length; i++) {
	 	eval( bushArr[i] + ".counter =" + bush[i]); 
	 };

	 var shrub = data.obj.shrubArray;
	 for (var i = 0; i < shrub.length; i++) {
	 	eval( shrubArr[i] + ".counter =" + shrub[i]); 
	 };
}

var clickEvent, parentOffset;


var MapObj = function( itemDropArray, durability, hardness, mapArea, toolRequired ){

	this.itemDropArray = itemDropArray,
	
	this.durability = durability,
	this.hardness = hardness,
	this.counter = 0,

	this.mapArea = mapArea,

	this.toolSubClass = toolRequired, 

	this.xPos = undefined;
	this.yPos = undefined;
	this.gameScreenID = undefined

}

MapObj.prototype.checkRemaining = function(self) {
	var remaining = this.durability - this.counter
	if ( !remaining ) {
		self.unbind('click').fadeOut(400)
	} 
};

MapObj.prototype.checkTools = function(){
	var bool = $('#toolImg').hasClass(this.toolSubClass)
	if (bool || this.toolSubClass === "none") {
		return true
	} 
	postToClipboard("I don't have the right tool equipped.")
	return false
}

MapObj.prototype.clicked = function( self, mapArea, event ){
	if (this.checkTools()) {

		this.counter++;

		this.checkRemaining(self)

		toolBar.durabilityFor
		
		shakeRock( self )


		this.gold()

		if ( this.Item() ) {
			this.setDim( self,event )
			this.dropOnMap()
		};
		battle.init( this.mapArea );
	}
}

MapObj.prototype.setDim = function( self,event ){
	this.xPos = event.pageX;
	this.yPos = event.pageY;
	this.gameScreenID = self.parent().attr("id");
}


MapObj.prototype.dropOnMap = function(){
		var itemConfirmed = false;
		var itemInfo  = [];

		//randomly select one of the arrayOfItems
		var getArray = this.itemDropArray;

		var randomNumber = Math.floor(Math.random() * getArray.length);
		var randomElement = getArray[randomNumber];

		for (var i = 0; i < allItems.length; i++) {
			if (allItems[i][0] === randomElement){
				itemInfo = allItems[i]
				itemConfirmed = true
				break;
			}
		};

		if ( itemConfirmed ) {

			postToClipboard("You obtained some " +itemInfo[3]+ "!");

			var randomID = "a"+Date.now();
			var src = itemInfo[4];
			var classOfItem = itemInfo[1];

			var string = '<img id="' +randomID+ '" src="' +src+ '" class="' +randomElement+ ' droppedOnMap">';


			var x = this.xPos - ( ( $(document).width() - 1000) / 2 ) 
			var y = this.yPos - ( ( $(document).height() - 600) / 2 ) + 20

			// calcEnd
        	var rx = rInt(-30, 30);
        	var ry = rInt(10, 30);

        	console.log( "Spawning at x="+x+" y="+y );
        	console.log( "Animating to x="+ ( x+rx ) +" y="+ ( y+ry ) );

        	$( '#'+ this.gameScreenID ).append( string );
        	$( '#'+randomID )
        		.css({
        			position: "absolute", 
        			top: y, left: x, 
        			width: "35px", 
        			height: "35px", 
        			zIndex: 20
        		})
        		.velocity({
        			top: "+="+ry, 
        			left: "+="+rx
        		}, 1000)

		} else {
			console.log(randomElement)
			throw new Error("No item found in dropOnMap()")
		}
	}

MapObj.prototype.gold = function(){
	var gold = Math.random() * ( ( player.moneyBonus/100 ) + ( player.luck/10 ) * 2.5 );		
	player.currency( "dirak", Math.floor( gold ) )
}

MapObj.prototype.Item = function(){
	var rand = Math.random() * 100
	var multiplier = player.itemDropBonus/100 + player.luck/20
	if ( rand <= ( 10+multiplier ) ){
		return true;
	} else return false;
}



	//===============//
	// objects start //
						
						//=============//
						// TREES BEGIN //
						//=============//

var treeObj1 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj2 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj3 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj4 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj5 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj6 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj7 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj8 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj9 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj10 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj11 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj12 = new MapObj(["wood"], 100, 1, "pathway", "axe")
var treeObj13 = new MapObj(["wood"], 100, 1, "pathway", "axe")

var rockObj1 = new MapObj(["flint"], 125, "pathway", "pickaxe")

var bushObj1 = new MapObj(["leaf", "thorn", "plantFiber"], 125, 1, "pathway", "none")
var bushObj2 = new MapObj(["leaf", "thorn", "plantFiber"], 125, 1, "pathway", "none")
var bushObj3 = new MapObj(["leaf", "thorn", "plantFiber"], 125, 1, "pathway", "none")
var bushObj4 = new MapObj(["leaf", "thorn", "plantFiber"], 125, 1, "pathway", "none")
var bushObj5 = new MapObj(["leaf", "thorn", "plantFiber"], 125, 1, "pathway", "none")
var bushObj6 = new MapObj(["leaf", "thorn", "plantFiber"], 125, 1, "pathway", "none")


var shrubObj1 = new MapObj(["marigold", "rosemary"], 75, 1, "pathway", "none")
var shrubObj2 = new MapObj(["marigold", "rosemary"], 75, 1, "pathway", "none")
var shrubObj3 = new MapObj(["marigold", "rosemary"], 75, 1, "pathway", "none")
var shrubObj4 = new MapObj(["marigold", "rosemary"], 75, 1, "pathway", "none")
var shrubObj5 = new MapObj(["marigold", "rosemary"], 75, 1, "pathway", "none")









	// Functions end //
	//===============//



						//===========//
						// TREES END //
						//===========//

						//================//
						// CRYSTALS BEGIN //
						//================//		



				//===========//
				// ROCKS END //
				//===========//








// spawn item on map drop.

// function itemDrop(){

// }



// i think this is the end

