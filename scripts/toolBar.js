jQuery(document).ready(function($) {
	toolBar.init()
});

var toolBar = {
	// vars for alternating

	init: function(){
		this.invFunc();
		this.equFunc();
		this.unMount();
	},






















	removeItem: function(){
		// get
		var location = this.checkClickOn();

		if (location.parent("tableInventory")) {};
		location.empty()
	},

	equipTD: false,
	invTD: false,
	organiseInventory: function(){
		var invTable = $('#miniInventory td')
		var itemArray = [];
		getItemsReady() // re-organise everything and put into itemArray
		invTable.fadeOut(800, function(){
			pasteItems() // output itemArray when the td's are hidden. Ey.
			invTable.each(function(index) {
				var self = $(this)
				console.log( "index="+index )
				setTimeout(function(){
					self.fadeIn( 500 );
				}, index*100 )
			});
		})

		// == functions == //

		function getItemsReady(){
			invTable.each(function(index){
				if ( $(this).children.length ) { // if > 0 then ~ true
					var self = $(this).children('div')
					var id = $(this).children('div').attr('id');
					var hasItemCounter = self.children('span.tableCounter').length ? true : false;
						console.log("hasItemCounter is "+hasItemCounter)
					var quant;
					// find type
					if (hasItemCounter) {
						quant = self.children('span').html()
					} else {
						quant = self.children('span').children('span').css('width');
					}

					// merge similar types
					console.log("length of itemArray = "+ itemArray.length)
					if (/*itemArray.length*/ false) {
						for (var i = 0; i < itemArray.length; i++) {
							console.log("length of itemArray = "+ itemArray.length)
							console.log("loop number = " + i)
							if ( itemArray[i][0]=== id ) {
								console.log("found similar ID")	

								// replica found. Check quantity
								if ( hasItemCounter ){

									// if bigger than max quantity (20)
									if( itemArray[i][2] + quant > 20 ){
										console.log("Its' quantity would be more than 20, reMaking")	

										var newQuant = ( itemArray[i][2] + quant ) - 20;
										itemArray[i][2] = 20;
										// push the remaining into a new slot. lol. 
										itemArray.push([id, hasItemCounter, newQuant])

									} else itemArray[i][2] = itemArray[i][2] + quant;

								} else {
									itemArray.push([id, hasItemCounter, quant])
								}


							};
						};
					} else {
						itemArray.push([id, hasItemCounter, quant])
					}

				};
			})
		}

		function pasteItems(){
			invTable.empty()
			for (var i = 0; i < itemArray.length; i++) {
				if (itemArray[i][2] !== undefined) {
					if( itemArray[i][1] ){
						// material
						toolBar.addToInventory( itemArray[i][0], itemArray[i][2] )
					} else {
						// equipment
						toolBar.addToInventory(itemArray[i][0])
					}
				} else {

				}

			};

		}

	},
	checkClickOn: function(){
		var found = false
		$('#miniInventory td, #miniEquipment td').each(function() {
			if ($(this).hasClass('clickOn')) {
				found = $(this);
				return false
			};
		});
			return found;
	},
	removeClickOn: function(){
		$('#miniInventory td, #miniEquipment td').each(function() {
			if ($(this).hasClass('clickOn')) {
				$(this).removeClass('clickOn')
				return false
			};
		});

		this.invTD = false;
		this.equipTD = false;
	},
	unequipUI: function(){
		console.log("unequip started")
		if (this.equipTD) {

			var id = eClickedOn.get(0).id
			var oldSrc = eClickedOn.children("img").attr('src');
			var subClass = searchForItemProperty(id, 1);
			var string = '<div id="' +id+ '"><img src="' +oldSrc+ '" class="hoverText ' +subClass+ '"><span class="tableDurabilityWrap"><span class="tableDurability"></span></span></div>';
			var bar = eClickedOn.children('span').children('span');
			var barWidth = bar.css('width');
			var percent = ( parseInt(barWidth) / 45 ) * 100 + "%";

			console.log("id="+id+", oldSrc="+oldSrc+", subClass="+subClass+", barWidth="+barWidth)

			// append item to inventory
			$('#miniInventory td').each(function(index) {
				console.log("Loop index="+index)

				if (!$(this).children().length) {
					console.log("appendage found")
					$(this).html(string)
					// make same bar length
					bar.css('width', percent);
					return false
				} else {
					console.log("empty cell in index "+index)
				}
			});

			// remove and replace equipment td img
			if (subClass === "weapon") {
				$('#weaponImg').removeClass().addClass('empty hoverOver').attr('src', 'files/img/other/weaponEmpty.png');
				$('#miniEquipment .durabilityBar.weapon').velocity({width: "100%", backgroundColor: "#ccc"}, 1000)
			} else if (subClass === "tools") {
				$('#toolImg').removeClass().addClass('empty hoverOver').attr('src', 'files/img/other/toolsEmpty.png');
				$('#miniEquipment .durabilityBar.tools').velocity({width: "100%", backgroundColor: "#ccc"}, 1000)
			} else if (subClass === "armour") {
				$('#armourImg').removeClass().addClass('empty hoverOver').attr('src', 'files/img/other/armourEmpty.png');
				$('#miniEquipment .durabilityBar.armour').velocity({width: "100%", backgroundColor: "#ccc"}, 1000)
			} else if (subClass === "special") {
				$('#specialImg').removeClass().addClass('empty hoverOver').attr('src', 'files/img/other/specialEmpty.png');
				$('#miniEquipment .durabilityBar.special').velocity({width: "100%", backgroundColor: "#ccc"}, 1000)
			} else throw new Error("SubClass was not an equipment-type")


		};
		this.unequip();
	},
	equipUI: function(){	

		console.log("toolBar.equip started")

		var div = clickedOn.children('div')
		var id = div.get(0).id;
		var oldSrc = div.children('img').attr('src');
		var Class = searchForItemProperty(id, 1);
		var subClass = searchForItemProperty(id, 2);
		if (Class === "material") {
			console.warn("Tried to equip something unequipabble")
			return false
		} 

		var barWidth = div.children('span').children('span').css("width");
		var percent = ( parseInt(barWidth) / 32 ) * 100 + "%"

		console.log("id="+id+", oldSrc="+oldSrc+", Class="+Class+", subClass="+subClass+", barWidth="+barWidth)
		if (this.invTD) {
			console.log("clickedOn is inventory")
			if (Class === "tools") {	
				console.log("Class was tools")
				if ($("#toolImg").hasClass('empty')) {

					$('#toolImg').attr('src', oldSrc);
					$('#toolImg').parent("td").get(0).id = id;
					$('#toolImg').removeClass('empty').addClass(subClass)
					$('#miniEquipment .durabilityBar.tools').css({	width: 0, backgroundColor: 'lime' })
						.velocity({width: percent},	1000);
					data.pEquipment.tools = id
				} else {
					console.warn("Can't equip. Already full")
					return false
				}
			} else if (Class === "weapon") {
				console.log("Class was Weapon")
				if ($("#weaponImg").hasClass('empty')) {

					$('#weaponImg').attr('src', oldSrc);
					$('#weaponImg').parent("td").get(0).id = id;
					$('#weaponImg').removeClass('empty').addClass(subClass)
					$('#miniEquipment .durabilityBar.weapon').css({	width: 0, backgroundColor: 'lime' })
						.velocity({width: percent},	1000);
					data.pEquipment.weapon = id
				} else {
					console.warn("Can't equip. Already full")
					return false
				}
			} else if (Class === "armour") {
				console.log("Class was Armour")
				if ($("#armourImg").hasClass('empty')) {

					$('#armourImg').attr('src', oldSrc);
					$('#armourImg').parent("td").get(0).id = id;
					$('#armourImg').removeClass('empty').addClass(subClass)
					$('#miniEquipment .durabilityBar.armour').css({	width: 0, backgroundColor: 'lime' })
						.velocity({width: percent},	1000);
					data.pEquipment.armour = id
				} else {
					console.warn("Can't equip. Already full")
					return false
				}
			} else throw new Error("No special in equipUI");
			$('#miniInventory td').each(function(index) {
				if ($(this).hasClass('clickOn')) {
					$(this).html("").removeClass('clickOn')
				};
			});
		this.removeClickOn()
		this.equip(id);
		};
	},


























	scrollDiv: function(distanceFromTop){
		console.log("ScrollDiv Activated")
		$('#menuParent>div').animate({
        	scrollTop: distanceFromTop
        }, 800, "easeInOutCubic");
	},
	invFunc: function(){
		$('#game').on('click', '#miniInventory td', function(e){
			e.stopPropagation();
			if (clickedOn != $(this)) {
				console.log("layer 2 passed")
			// set clickedOn
				if (clickedOn != undefined) {
					clickedOn.removeClass('clickOn');
				} if (eClickedOn != undefined) {
					eClickedOn.removeClass('clickOn');
					eClickedOn = undefined
				}
					
				clickedOn = $(this);
				clickedOn.addClass('clickOn');
				invTD = true
				// clickedOnOuter = $(this).prop('outerHTML')
				if ($(this).children.length !== 0) {
					clickedOnImg = $(this).children('div').children('img');         
				};
				
				
			} else {
				console.log('duplicate click. removing class')
				$('#tableInventory td').removeClass('clickOn');
				clickedOn = undefined;
			}
			var fromTop = false;
			if ( ( clickedOnImg.hasClass('tools') || clickedOnImg.hasClass('weapon') || clickedOnImg.hasClass('armour') || clickedOnImg.hasClass('special')) && (!clickedOn.hasClass('equipped')) ) {
				fromTop = 40
			} else if ( clickedOnImg.hasClass('material') ){
				fromTop = 0
			}
			fromTop ? toolBar.scrollDiv(fromTop) : false
		});
	},
	equFunc: function(){
		$('#game').on('click', '#miniEquipment td', function(e){
			e.stopPropagation()
			console.log('clicked');
			if (eClickedOn != $(this)) {
			// set eClickedOn
				if (eClickedOn != undefined) {
					eClickedOn.removeClass('clickOn');
				} if (clickedOn != undefined) {
					clickedOn.removeClass('clickOn');
					clickedOn = undefined
				}
				eClickedOn = $(this);
				equipTD = true
				if ($(this).children.length !== 0) {
					eClickedOnImg = $(this).children('img');            
				};
				eClickedOn.addClass('clickOn');
				
			} else {
				$('#tableInventory td').removeClass('clickOn');
				eClickedOn = undefined;
			}
			var fromTop = false
			if (!eClickedOnImg.hasClass('empty')) {
				fromTop = 80
			}
			fromTop ? toolBar.scrollDiv(fromTop) : false
		});
	},
	unMount: function(){
		//adds click event to document => removes clickOn. 
		$(document).on('click', function() {
			if (this.equipTD) {
				$('#miniInventory td').removeClass('clickOn');
				prevClickedOn = undefined;
				clickedOn = undefined;
				
			} 
			if (this.invTD) {
				$('#miniEquipment td').removeClass('clickOn');
				ePrevClickedOn = undefined;
				eClickedOn = undefined;	
			};
		});
	},


	unequip: function(id){
		console.log("Unequipping item with an ID of " + id )
		for (var i = 0; i < allItems.length; i++) {
			//compare values
			if (id === allItems[i][0]){

				//remove ID in data.pEquipment
				if (allItems[i][1] === 'tools') {
					player.tools = undefined;
					switch (true){
							case allItems[i][12] !== undefined: // adds stats to data.pStats. ADD MORE IF NESS
								player.goldBonus -= allItems[i][12];
							case allItems[i][13] !== undefined:
								player.woodBonus -= allItems[i][13];
							case allItems[i][14] !== undefined:
								player.fishingBonus -= allItems[i][14];
							
							
						}

				} else if (allItems[i][1] === 'weapon') {
					player.weapon = allItems[i][0];
						console.log(data.pEquipment.weapon)
						switch (true){
							case allItems[i][2] !== undefined:
								player.weaponType = allItems[i][2];
								console.log("weapontype "+player.weaponType)
							case allItems[i][5] !== undefined:
								player.weaponMin = undefined
							case allItems[i][6] !== undefined:
								player.weaponMax = undefined
							case allItems[i][11] !== undefined:
								player.speed -= allItems[i][11];
							

						} //else if (allItems[i][1] === 'armour') {
				// 	data.pEquipment.armour = allItems[i][0]							
				// } else if (allItems[i][1] === 'special') {
				// 	data.pEquipment.special = allItems[i][0]							
				
				//save ID END
				}
			}
		}
	},








	//adds stats to player data
	equip: function(id){
		console.log("Equipping item with an ID of " + id )
		if (id) { // default values of data.pEquipment are false
			for (var i = 0; i < allItems.length; i++) { // go through all items
				if ( id === allItems[i][0] ){ //compare values

					console.warn("ID was found. It is " + allItems[i][0])
					console.log("equipping... [1] =" + allItems[i][1])

					//save ID in data.pEquipment
					if (allItems[i][1] === 'tools') {
						player.tools = allItems[i][0];
						console.log("player.tools is "+player.tools)
						switch (true){
							case allItems[i][12] !== undefined: // adds stats to data.pStats. ADD MORE IF NESS
								player.goldBonus += allItems[i][12];
							case allItems[i][13] !== undefined:
								player.woodBonus += allItems[i][13];
							case allItems[i][14] !== undefined:
								player.fishingBonus += allItems[i][14];
							
							
						}
					} else if (allItems[i][1] === 'weapon') {
						player.weapon = allItems[i][0];
						console.log(player.weapon)
						switch (true){
							case allItems[i][2] !== undefined:
								player.weaponType = allItems[i][2];
								console.log("weapontype "+player.weaponType)
							case allItems[i][5] !== undefined:
								player.weaponMin = allItems[i][5]
							case allItems[i][6] !== undefined:
								player.weaponMax = allItems[i][6];
							case allItems[i][9] !== undefined:
								player.speed += allItems[i][9];
							

						}
					} else if (allItems[i][1] === 'armour') {
						console.log("equipping armour")
						console.log("equipping armour="+ allItems[i][5])
						data.pEquipment.armour = allItems[i][0]	
						switch (true){
							case allItems[i][7] !== undefined:
								player.pDefence += allItems[i][7]
							case allItems[i][7] !== undefined:
								player.mDefence += allItems[i][8];
							case allItems[i][9] !== undefined:
								player.speed += allItems[i][9];
						}
					}						
					// } else if (allItems[i][1] === 'special') {
					// 	data.pEquipment.special = allItems[i][0]							
					
					// save ID END
					return false
				}
			}
		}
	},



























	addToInventory: function(itemID, howMany){
		var quantity = howMany || 1;
		console.log("What we're searching with is " + itemID)
		var classOfItem = searchForItemProperty(itemID, 1)
		console.log("classOfItem is " + classOfItem)
		var id, Name, src, subClass, string;
		console.log("")
		if (classOfItem === "material") {
				subClass = searchForItemProperty(itemID, 2)
				src = searchForItemProperty(itemID, 4)
				string = '<div id="' +itemID+ '"><span class="tableCounter">' +quantity+ '</span><img src="' +src+ '" class="hoverText ' +classOfItem+ ' ' +subClass+ '"></div>';
		} else if (classOfItem === "weapon") {
				subClass = searchForItemProperty(itemID, 2)
				src = searchForItemProperty(itemID, 4)
				string = '<div id="' +itemID+ '"><img src="' +src+ '" class="hoverText ' +classOfItem+ ' ' +subClass+ '"><span class="tableDurabilityWrap"><span class="tableDurability"></span></span></div>';
		} else if (classOfItem === "tools") {
				subClass = searchForItemProperty(itemID, 2)
				src = searchForItemProperty(itemID, 4)
				string = '<div id="' +itemID+ '"><img src="' +src+ '" class="hoverText ' +classOfItem+ ' ' +subClass+ '"><span class="tableDurabilityWrap"><span class="tableDurability"></span></span></div>';
		} else if (classOfItem === "armour") {
				subClass = searchForItemProperty(itemID, 2)
				src = searchForItemProperty(itemID, 4)
				string = '<div id="' +itemID+ '"><img src="' +src+ '" class="hoverText ' +classOfItem+ ' ' +subClass+ '"><span class="tableDurabilityWrap"><span class="tableDurability"></span></span></div>';
		} else if (classOfItem === "special") {};
		
		// Search Inventory for replicas
		if(classOfItem === "material"){
			var howMany = 0;
			var duplicateFound = false;
			$('#tableInventory td').each(function(index) {
				if ( $(this).children('div').attr("id") === itemID ) {
					howMany++

					var el = $(this).children("div").children('span')
					var value = parseInt( el.html() )

					console.log("There is another <div> with the same ID");
					console.log("And its value is " + el.html())

					if (  value + quantity <= 20 ) {
						duplicateFound = true;
						console.log("Combined value is less than 20")

						value += quantity
						el.html(value)
						
						return false;
					} else if ( (value + quantity) > 20){
						duplicateFound = false;
						console.log("Combined value is more than 20")

						el.html(20);
						quantity = ( value + quantity ) - 20
						string = '<div id="' +itemID+ '"><span class="tableCounter">' +quantity+ '</span><img src="' +src+ '" class="hoverText ' +classOfItem+ ' ' +subClass+ '"></div>';
					}
				};
			});
			// insert into existing empty cell
			if (!duplicateFound && quantity) {
				$('#tableInventory td').each(function() {
					if ($(this).children().length === 0) {
						$(this).append( string );
						console.log("No duplicate material found. Item inserted into first empty cell")
						return false;
					};
					
				});
			};
		} else {
			$('#tableInventory td').each(function() {
				if (quantity){
					if ($(this).children().length === 0) {
						$(this).append( string );
						quantity--
					};
				} else {
					return false;
				}
			});
		}

		// add to inv
		dragNdrop.inventory.drag()
		//removes box shadow of items
		setTimeout(function(){
			$('#tableInventory td').css({
				"box-shadow": '',
				"display" : ''
			});
		}, 1000 );
	},





























	durabilityFor: function( equipCategory, changeAmount ){

		// locate
		var tdLoc = 
			equipCategory === "weapon" ?
				$('#miniEquipment tr').children().eq(0) :
			equipCategory === "tool" ?
				$('#miniEquipment tr').children().eq(1) :
			equipCategory === "armour" ?
				$('#miniEquipment tr').children().eq(2) :
				$('#miniEquipment tr').children().eq(3) ;

		// get
		var durabilityBar = tdLoc.find('.durabilityBar')
		var width = durabilityBar.css('width');

		// change
		console.log(width)
		var converted = parseInt( width ) * 0.45;
		console.log(converted)
		var newValue  = converted + changeAmount;
		console.log(newValue)
			converted = Math.ceil( ( newValue / 45 ) * 100 )  + "%";
		console.log(converted)
		if (converted <= 0) {
			setTimeout( function(){
				var i = tdLoc.index() + 1
				toolBar.destroyEquip(i);
			}, 200 )
		}
		// return
		durabilityBar.animate({'width': converted}, 200);

	},




	destroyEquip: function(loc){

	},







//end
}