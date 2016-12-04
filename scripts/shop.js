
// declare arrays

var shop = {
	isOpen: false,
	open: function(){
		this.isOpen = true;
		$('#innerScreenBackground').fadeIn(1000);
		$('#shopMain').fadeIn(1000);
		this.insertHead()
		
		//
	},
	close: function(){
		$('#innerScreenBackground').fadeOut(1000);
		$('#shopMain').fadeOut(1000);
		this.isOpen = false;
		this.itemIsOpen = false;
		this.equipIsOpen = false;
		setTimeout(function(){
			$('nav.shop ul>li').each(function() {
				$(this).children('span.text').removeClass('shopNavHighlight');
				$(this).children('ul').hide()
			});
		}, 1000)
	},
	itemIsOpen: false,
	equipIsOpen: false,
	nav: function(id){
		// slide
		var self = $('#'+id)
		if (id === 'Items' ) {
			if (this.itemIsOpen) {
				this.itemIsOpen = false;
				self.children('ul').slideUp(600);
			} else {
				this.itemIsOpen = true;
				self.children('ul').slideDown(600);
				if ( this.equipIsOpen ){
					$('#Equipment').children('ul').slideUp(600);
				} 
				this.insertItem()
				self.children('ul').children('li').first().addClass('bulletPoint');
			}
		} else {
			if (this.equipIsOpen) {
				this.equipIsOpen = false;
				self.children('ul').slideUp(600);
			} else {
				this.equipIsOpen = true;
				self.children('ul').slideDown(600);
				if ( this.itemIsOpen ){
					$('#Item').children('ul').slideUp(600);
				} 
				this.insertEquipment()
				self.children('ul').children('li').first().addClass('bulletPoint');
			}
		}
	},
	insertHead: function(){
		$('#shopHead').append("\
			<tr id='firstRow'>\
				<td>Name</td>\
				<td>Image</td>\
				<td>Dirak</td>\
				<td>Essence</td>\
				<td>Supply</td>\
			</tr>\
		")
	},
	scrollOn: false,
	tBodyScroll:function(){
		if (this.fw) {
			return false
		} else {
			$('#shopTable').slimScroll({
				width: '495px',
			    color: 'darkorange',
			    size: '6px',
			    distance: '3px',
			    opacity: 1,
			    alwaysVisible: true,
			    railVisible: true,
			    railColor: "#cc7000",
			    wheelStep: 4
			})
			this.scrollOn = true;
		}
	},




	tableIsAtFront: true,
	ani: function(id){
		var table = $('#shopTableWrap')
		var content = $('#shopContent')
		if (this.tableIsAtFront) {

			// input data
			this.insertContent(id)
			// send table to the back
			this.tableIsAtFront = false
			table.stop().velocity({
				top: "+=130px"
			}, 600, "easeOutQuad", function(){
				table
					.css("z-index", 0)
					.velocity({
						top: "-=130px"
					}, 600, "easeInQuad");
			})
			content.stop().velocity({
				top: "-=130px"
			}, 600, "easeOutQuad", function(){
				content
					.css("z-index", 1)
					.velocity({
						top: "+=130px"
					}, 600, "easeInQuad" );
			})	
		} else {

			// bring table to the front
			this.tableIsAtFront = true
			content.children("div").fadeOut(300);
			content.fadeOut(400, function(){
				table.css('z-index', 1);	
				content.css('z-index', 0).show()
					.children('div').show()
			})

		}
	},


	originalCost: [undefined, undefined],
	originalID: undefined,
	insertContent: function(id){

		var stats = $('#productS')
		var des = $('#productD')
		var img = $('#productP')
		var dirak = $('#shopDirak')
		var essence = $('#shopEssence')
		var arr;

		if ( this.equipIsOpen ){
			arr = this.equipmentArray
		} else {
			arr = this.itemArray
		}
		for ( var i = 0; i < arr.length; i++ ) {
			if ( arr[i][0] === id ) {
				var src = searchForItemProperty(id, 4);

				img.attr('src', src);
				des.empty().append( arr[i][5] )
				stats.empty().append( arr[i][6] )

				var d = arr[i][3][0]
				var e = arr[i][3][1]

				console.log("dirak and essence = "+ d + " " + e)

				dirak.html( d );
				essence.html( e );

				this.originalCost[0] = d;
				this.originalCost[1] = e;
				// for use on purchase
				this.originalID = id;

				var slide = $('#shopContent .slider')
				slide.slider( "option", "max", arr[i][4] );
				slide.slider( "option", "value", 1 );

				break;
			}
		}
	},
	
	equipmentArray: [
		// [0]ID, [1]unlocked?, [2]Cost(array)
		[ "steelAxe", true, "tools", [ 310, 35 ], 1],
		[ "ironAxe", true, "tools", [ 200, 20 ], 2],
		[ "rustyAxe", true, "tools", [ 110, 15 ], 5],
		[ "steelPick", true, "tools", [ 450, 10 ], 2],
		[ "ironPick", true, "tools", [ 250, 60 ], 2],
		[ "rustyPick", true, "tools", [ 110, 10 ], 4],
	],
	insertEquipment: function(branch){
		var classOfItem = "all"
		branch? (classOfItem = branch) : console.warn("No branch. Inserting equipment")
		var arr = this.equipmentArray;
		$('#shopTable').empty()
		for (var i = 0; i < arr.length; i++) {
			console.log("Loop "+i)
			if ( arr[i][1] && ( arr[i][2] === classOfItem || classOfItem === "all" ) ) {
				var id = arr[i][0];

				var name = searchForItemProperty(id, 3);
				var src = searchForItemProperty(id, 4);

				var dirak = arr[i][3][0];
				var essence = arr[i][3][1];

				var stock = arr[i][4]
				$('#shopTable').prepend('\
					<tr id="' +id+ '">\
						<td>' +name+ '</td>\
						<td>\
							<img src="' +src+ '">\
						</td>\
						<td>\
							' +dirak+ '\
						</td>\
						<td>\
							' +essence+ '\
						</td>\
						<td>\
							' +stock+ '\
						</td>\
					</tr>\
				');
					
			} else {
				console.log("Missed out on loop " + i)
			}
		};
		this.tBodyScroll()
	},
	itemArray: [
		[ "bGem", true, "material", [500,100], 2],
		[ "gGem", true, "material", [500,100], 2],
		[ "pGem", true, "material", [500,100], 2],
		[ "flint", true, "material", [150,0], 10],
		[ "rosemary", true, "material", [100,0], 7],
		[ "marigold", true, "material", [70,0], 8],
		[ "plantFiber", true, "material", [50,0], 10],
		[ "wood", true, "material", [25,0], 30],
		[ "thorn", true, "material", [15,0], 18],
		[ "leaf", true, "material", [10,0], 30],
	],
	insertItem: function(branch){
		var classOfItem = "all"
		branch? (classOfItem = branch) : console.warn("No branch. Inserting items")
		var arr = this.itemArray;
		$('#shopTable').empty()
		for (var i = 0; i < arr.length; i++) {
			console.log("Loop "+i)
			if ( arr[i][1] && ( arr[i][2] === classOfItem || classOfItem === "all" ) ) {
				var id = arr[i][0];

				var name = searchForItemProperty(id, 3);
				var src = searchForItemProperty(id, 4);

				var dirak = arr[i][3][0];
				var essence = arr[i][3][1];

				var stock = arr[i][4]
				$('#shopTable').prepend('\
					<tr id="' +id+ '">\
						<td>' +name+ '</td>\
						<td>\
							<img src="' +src+ '">\
						</td>\
						<td>\
							' +dirak+ '\
						</td>\
						<td>\
							' +essence+ '\
						</td>\
						<td>\
							' +stock+ '\
						</td>\
					</tr>\
				');
					
			} else {
				console.log("Missed out on loop " + i)
			}
		};
		this.tBodyScroll()
	},



















	//======================//
	// ===== PURCHASE ===== //
	//======================//
	notEnoughMoney: function(){
		var underBar = $('#topBar .currency');
		underBar
			.velocity({"border-bottom-color": "red"}, 400, function(){
				$(this).css('border-bottom-color', 'black')
					.velocity({"border-bottom-color": "red"}, 400, function(){
						$(this).css('border-bottom-color', 'black')
							.velocity({"border-bottom-color": "red"}, 600, function(){
								setTimeout(function(){
									$(underBar).css('border-bottom-color', 'black');
									
								},2000)
							})

					})
			})
	},
	validatePurchace: function(){
		var mult = $('#shopContent .slider').slider( "option", "value");
		console.log("mult in validation is " + mult );
		var dir = this.originalCost[0] * mult;
		var ess = this.originalCost[1] * mult;

		var pDir = player.dirak;
		var pEss = player.essence;

		var noSpace = false;

		var errorFound = false;

		var inventorySpace = true;
		$('#inventoryTable td').each(function() {
			if ($(this).children().length === 0) {
				noSpace = true
				return false
			}
		});

		if (pDir - dir < 0) {
			postToClipboard("I don't have enough Dirak.") 
			errorFound = true
			this.notEnoughMoney()
		} else if (pEss - ess < 0) {
			postToClipboard("I don't have enough Essence.") 
			errorFound = true
			this.notEnoughMoney()
			
		} else if (noSpace){
			postToClipboard("I don't have enough space in the inventory.") 
			errorFound = true
			// highlight inventory cells
		}

		if (errorFound) {
			// display error
			console.warn("Error in authenticating purchase")
			return false;
		} return [true, mult];
	},
	purchase: function(){
		var valid = this.validatePurchace()
		if (!valid) {
			return false
		}
		// BEGINS
		var mult = valid[1]

		// dirak/essence
		var price1 = this.originalCost[0]
		var price2 = this.originalCost[1]

		player.currency( "dirak", -(price1 * mult) );
		player.currency( "essence", -(price2 * mult) );

		toolBar.addToInventory(this.originalID, mult);
		this.reduceStock(mult)
	},
	reduceStock: function(deduction){
		var id = this.originalID;
		if (this.equipIsOpen) {
			var arr = this.equipmentArray;

			for (var i = 0; i < arr.length; i++) {
				if( arr[i] === id ){
					var howMuch = arr[i][4]
					howMuch -= deduction;
					reduceSlider(howMuch)
					break;
				}
			}
		}
		function reduceSlider(howMuch){
			$('#shopContent .slider').slider( "option", "max", howMuch).slider( "option", "value", 1);
		}
	},





































	//end
}