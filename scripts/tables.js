var toolsArr = [ ["Rusty Pickaxe","files/img/shop/pickaxe_rusty.png", ["0","1","20"], "rustyPick"], ["Iron Pickaxe","files/img/shop/pickaxe_iron.png", ["0","5","0"], "ironPick"], ["Steel Pickaxe","files/img/shop/pickaxe_steel.png", ["1","0","0"], "steelPick"],]
var weaponArr = [ ["Novice Sword", "files/img/shop/sword_1.png", ["0","1","15"], "sword_1"], ["Novice Dagger", "files/img/shop/dagger_1.png", ["0","0","80"], "dagger_1"]]
var armourArr = [ [""] ]
var itemsArr = [ [""] ]
var materialArr = [ [""] ]

var classOfItem = null;

var pInventoryArray = [];

var shopTabOpen = false;

var shop = {
	init: function(typeLoad){
			for (var i = 0; i < toolsArr.length; i++) {
				
				var toolName = toolsArr[i][0];
				var toolURL = toolsArr[i][1];

				var toolCost1 = toolsArr[i][2][0];
				var toolCost2 = toolsArr[i][2][1];
				var toolCost3 = toolsArr[i][2][2];

				var id = toolsArr[i][3];

				$('#shopTable').append('\
					<tr>\
					<td>' +toolName+ '</td>\
						<td>\
							<img id="' +id+ '" src="' +toolURL+ '" class=" hoverText ' +id+ ' ' +classOfItem+ ' ">\
						</td>\
						<td>\
							' +toolCost1+ '\
						</td>\
						<td>\
							' +toolCost2+ '\
						</td>\
						<td>\
							' +toolCost3+ '\
						</td>\
						<td>\
							<input type="textbox" placeholder="0">\
						</td>\
						<td>\
							<label><input type="checkbox" id="' +id+ 'Box"</label>\
						</td>\
				</tr>');
					
			};
	},
}
jQuery(document).ready(function($) {


	$('.shopCat').on('click',function(){
		console.log("Something was clicked");
		$('#shopTable').empty();
		$('#shopTable tbody').append("<tr id='firstRow'><td>Name</td><td>Image</td>\
									<td class='money'>\
										<div>Gold</div>\
										<img src='files/img/money/gold.png' class='goldImg'>\
									</td>\
									<td class='money'>\
										<div>Silver</div>\
										<img src='files/img/money/silver.png' class='silverImg'>\
									</td>\
									<td class='money'>\
										<div>Copper</div>\
										<img src='files/img/money/copper.png' class='copperImg'>\
									</td>\
									<td>Quantity</td>\
									<td>Checkbox</td>\
								</tr>")
		$('#shopPurchase').remove();
		$('#shopMain').append('<span class="bottom">\
									<div id="shopPurchase">\
										<div>\
											Total Cost:\
											<span>\
												<img src="files/img/money/gold.png" class="coinImg2">\
												<span id="shopPurchaseGold">0</span>\
											</span>\
											<span>\
												<img src="files/img/money/silver.png" class="coinImg2">\
												<span id="shopPurchaseSilver">0</span>\
											</span>\
											<span>\
												<img src="files/img/money/copper.png" class="coinImg2">\
												<span id="shopPurchaseCopper">0</span>\
											</span>\
										</div>\
										<input type="button" id="shopBuyButton" value="Purchase" class="allBorder">\
									</div>\
								</span>');
		
		$('.shopCat').css('backgroundColor', 'white');
		var shopTotalCost = 0;
		var shopTotalCostArray = [];
		$(this).css('background-color', 'lightgrey');

		if (this.id === 'shopTools'){
			classOfItem = "tools";

			for (var i = 0; i < toolsArr.length; i++) {
				
				var toolName = toolsArr[i][0];
				var toolURL = toolsArr[i][1];

				var toolCost1 = toolsArr[i][2][0];
				var toolCost2 = toolsArr[i][2][1];
				var toolCost3 = toolsArr[i][2][2];

				var id = toolsArr[i][3];

				$('#shopTable tbody').append('\
					<tr>\
					<td>' +toolName+ '</td>\
						<td>\
							<img id="' +id+ '" src="' +toolURL+ '" class=" hoverText ' +id+ ' ' +classOfItem+ ' ">\
						</td>\
						<td>\
							' +toolCost1+ '\
						</td>\
						<td>\
							' +toolCost2+ '\
						</td>\
						<td>\
							' +toolCost3+ '\
						</td>\
						<td>\
							<input type="textbox" placeholder="0">\
						</td>\
						<td>\
							<label><input type="checkbox" id="' +id+ 'Box"</label>\
						</td>\
				</tr>');
					
			};


// add type of tab open eg tools, equip etc
		} else if (this.id === "shopWeapons") {
			classOfItem = "weapon"

			for (var i = 0; i < weaponArr.length; i++) {
				
				var weaponName = weaponArr[i][0];
				var weaponURL = weaponArr[i][1];

				var weaponCost1 = weaponArr[i][2][0];
				var weaponCost2 = weaponArr[i][2][1];
				var weaponCost3 = weaponArr[i][2][2];

				var id = weaponArr[i][3];

				$('#shopTable').append('\
					<tr>\
					<td>' +weaponName+ '</td>\
						<td>\
							<img id="' +id+ '" src="' +weaponURL+ '" class=" hoverText ' +id+ ' ' +classOfItem+ ' ">\
						</td>\
						<td>\
							' +weaponCost1+ '\
						</td>\
						<td>\
							' +weaponCost2+ '\
						</td>\
						<td>\
							' +weaponCost3+ '\
						</td>\
						<td>\
							<input type="textbox" placeholder="0">\
						</td>\
						<td>\
							<label><input type="checkbox" id="' +id+ 'Box"</label>\
						</td>\
				</tr>');
					
			};
		}
		// ekse if material etc




		// after items have been inserted
		$('#shopTableWrap').slimScroll({
		    color: 'darkorange',
		    height: '230px',
		    size: '10px',
		    distance: '5px',
		    opacity: 1,
		    alwaysVisible: false,
		    railVisible: true
		});


		$('#shopTable input[type=textbox]').attr('disabled', 'disabled');
		

		//checked - rolling for dubs
		$('#shopTable :checkbox').change(function(){
			var cell = $(this).parents('td').prev('td');
			var input = cell.children('input');
			if (this.checked) {
				console.log("checkem");
				input.removeAttr('disabled');
				input.focus();
			} else {
				console.log("checkemNOT");
				var quant = input.val();
				var cost = cell.prev("td").html();
				var output = $('#shopPurchaseCount').html();
				shopTotalCost -= quant * cost;
				$('#shopPurchaseCount').html(shopTotalCost);
				input.attr('disabled', 'disabled');
				input.val("");
			}
		})

		// quantity input calculates total price
		$('#shopTable input[type=textbox]').keyup(function() {
			shopTotalCost = 0;

			var costC = $(this).parents("td").prev("td").html();
			var costS = $(this).parents("td").prev("td").prev("td").html();
			var costG = $(this).parents("td").prev("td").prev("td").prev("td").html();
			console.log(costC+ " " +costS+ " " +costG)

			var cost = player.coinsToCopper(parseInt(costC), parseInt(costS), parseInt(costG));
			console.log(cost + " Cost")
			var quantity = $(this).val();
			var index = $(this).parents("tr").index() - 1;
			shopTotalCostArray[index] = (cost * quantity);
			for (var i = 0; i < shopTotalCostArray.length; i++) {
				shopTotalCost += parseInt(shopTotalCostArray[i]);
			};
			var arr = player.copperToCoins(shopTotalCost);
		
			$('#shopPurchaseCopper').html(arr[0])
			$('#shopPurchaseSilver').html(arr[1])
			$('#shopPurchaseGold').html(arr[2])
		});
	
		//onclick buy button
		$('#shopBuyButton').on('click',function(){
			var goldCost = $('#shopPurchaseGold').html()
			var silverCost = $('#shopPurchaseSilver').html()
			var copperCost = $('#shopPurchaseCopper').html()
			
			var totalCopperCost = player.coinsToCopper(parseInt(copperCost), parseInt(silverCost), parseInt(goldCost))

			var playerCopper = player.howMuchMoney();

			var notif = $('#shopNotification');
			var checked = $('#shopTable :checked')

			console.log("is " + totalCopperCost +" bigger than " + playerCopper + "?")
//admin mode kek
			if (totalCopperCost > playerCopper || totalCopperCost > playerCopper){
			// check to see if user has enough money
				console.log("insufficient funds")
				notif.empty().html("<span>You do not have enough money.</span>").show(600)
				invalidMoney();
			} else if(totalCopperCost === 0 || totalCopperCost == false){
			// check to see if user has selected anything
				notif.html("<span>No items were selected</span>")
			} else {
				notif.empty().html("<span>Successfully Purchased.</span>")
				console.log("Copper is " + -copperCost +" Silver is " + -silverCost + " and Gold is " + -goldCost)
				player.currency(-totalCopperCost);
				//temp if statement
				if (false) {
				// if the shop tab open + selected is a limited item, then delete it after purchase. Or some shit. 
					checked.parents('tr').remove();
				};
				

				//moving to inventory
				var imgs = [];
				var ids = [];
				var quant = [];

				checked.each(function(index) {
					imgs[index] = $(this).parents("tr").children("td").first().next("td").children('img').attr("src");
					ids[index] = $(this).parents("tr").children("td").first().next("td").children('img').attr("id");
					quant[index] = $(this).parents('td').prev('td').children('input').val();
				});

				var fadeIn = 1;

				for (var i = 0; i < imgs.length; i++) {
					console.log("imgs.length is " + imgs.length);
					console.log("i is " + i)

					var string = '<div id="'+ ids[i]+ '"><img src="' +imgs[i]+ '" class="hoverText ' +ids[i]+ ' ' +classOfItem+ '"></div>';

					//adds array to array. cheeky m8
					pInventoryArray.push([ ids[i], imgs[i], classOfItem, string ]);


					//repeats append as many times as user sets quantity in the <input>
					for (var z = 0; z < parseInt(quant[i]); z++) {
						console.log("Shop id is " + ids[i])
						toolBar.addToInventory(ids[i])						

						// add items to main inventory window. the big one m8

					} // end of for loop 2 ..............................................

					imgs[i] = "";
					ids[i] = "";
					quant[i] = "";
				}	// end of for loop 1 .........................................................................
			}



			setTimeout(function(){
			//sets the total cost back to zero
				$('#shopPurchaseCount').html("0")
			//resets totalCost
				shopTotalCost = 0
			}, 1000 );

		//shop notification on buy
			notif.fadeIn(400);
			setTimeout(function(){
				notif.fadeOut(400);
			}, 2000)

			


		//removes content of <input> after purchase. helpful i suppose...
			checked.each(function() {
				$(this).parents("td").prev("td").children('input').val("").attr('disabled', 'disabled');
				$(this).prop('checked', false).removeAttr('checked')
			});


//statusSelection onClicks:
			var movingItem = null;
			



		})
	})



	window.invalidMoney = function(){
		var counter = 0;
		$('#coinWrap>span').velocity({"borderBottomColor": "red", "borderLeftColor": "red", "borderRightColor": "red"}, 800);
		setTimeout(function(){
			$('#coinWrap>span').css('border-color', 'black');
		}, 3000)
	}






























});