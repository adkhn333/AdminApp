adminApp
.controller('MenuCtrl', function($scope, $http){
	console.log("Menu");
	$scope.serviceIds = ["S01", "S02", "S03", "S04", "S05"];
	$scope.vendorId = 7; //Selected vendor id
	$scope.uid = 322; //Current login user
	$scope.menus = []; //Table menus
	$scope.vendorMenus = []; // Input forms
	$scope.editItem = false; // checked if user is editing the form

	$scope.menuStatus = 'No menu item'; // Status of the menu (Editable/not-editable)

	$scope.getVendorMenu = function() {
		$http({
			url: "http://139.162.43.74/getVendorMenuForUpdate",
			method: "GET",
			params: {
				vendorId: $scope.vendorId,
				opt: 1
			}
		}).then(function(response) {
			$scope.addMenuItemStatus = true;
		   	console.log(response);
		   	if(response.data.ItemList){

			   	for(var i = 0;i<response.data.ItemList.length; i++){
			   		$scope.menus.push(response.data.ItemList[i]);
			   	}
		   	}else{
		   		$scope.menuStatus = response.data.Message;
		   	}
		});// get editable menu
	}
	$scope.getVendorMenu();

    $scope.addMenu = function(data) {
		$scope.addMenuItemStatus = false;
    	$scope.reset();

    	$scope.menus.push(data);


    	$http({
	        url : "http://139.162.43.74/insertVendorMenuItem",
	        method : "POST",
	        params: {
	        	vendorId: $scope.vendorId,
	        	serviceId: data.serviceId,
	        	menuItem: data.menuItem,
	        	maleFlag: data.maleFlag ? 1:0,
	        	femaleFlag: data.femaleFlag ? 1:0,
	        	kidsFlag: data.kidsFlag ? 1:0,
	        	vendorPrice: data.vendorPrice,
	        	fab2uPrice: data.fab2uPrice,
	        	customerPrice: data.customerPrice,
	        	trackingId: $scope.uid
	        }
	    }).then(function(response) {
	    	//console.log(response);
	    	if(response.data.StatusCode == '200'){
	    		$scope.addMenuItemStatus = true;
	    		//console.log($scope.addMenuItemStatus);
	    	}

	    });
    } // addMenu
    $scope.reset = function() {
    	$scope.vendorMenus = {
    		serviceId: $scope.vendorMenus.serviceId
    	}
    	$scope.vendorMenuForm.$setPristine();
    	$scope.vendorMenuForm.$setUntouched();
    } // reset

    $scope.saveMenu = function() {
    	$http({
	        url : "http://139.162.43.74/saveVendorMenu",
	        method : "POST",
	        params: {
	        	vendorId: $scope.vendorId,
	        	trackingId: $scope.uid
	        }
	    }).then(function(response) {
	    	//console.log(response);
	    });
    } //saveMenu
    $scope.deleteMenuItem = function(menuid) {
    	console.log(menuid);
    	$http({
    		url: 'http://139.162.43.74/deleteVendorMenuItem',
    		method: 'POST',
    		params: {
    			menuItemId: menuid,
    			trackingId: $scope.uid
    		}
    	}).then(function(response){
    		console.log(response);
    		$scope.getVendorMenu();
    	});
    } //deleteMenuItem

    $scope.editMenuItem = function(obj) {
    	$scope.editItem = true;
    	var temp = obj;
    	if(temp.maleFlag){
	    	if(temp.maleFlag == '1'){
	    		temp.maleFlag = true;
	    	}else{
		    	temp.maleFlag = false;
		    }    		
    	}else{
	    	temp.maleFlag = false;
	    } 
    	if(temp.femaleFlag){
	    	if(temp.femaleFlag == '1'){
	    		temp.femaleFlag = true;
	    	}else{
		    	temp.femaleFlag = false;
		    }
    	}else{
	    	temp.femaleFlag = false;
	    }
    	if(temp.kidFlag){
	    	if(temp.kidFlag == '1'){
	    		temp.kidFlag = true;
	    	}else{
	    		temp.kidFlag = false;
	    	}
    	}else{
    		temp.kidFlag = false;
    	}


    	// console.log(temp.serviceId);
    	$scope.vendorMenus = temp;
    	//console.log($scope.vendorMenus);
    }// Edit menu

    $scope.updateMenu = function(data,menuItemId){

    	$scope.editItem = false;
    	$http({
	        url : "http://139.162.43.74/UpdateVendorMenuItems",
	        method : "POST",
	        params: {
	        	menuItemId: menuItemId,
	        	vendorId: $scope.vendorId,
	        	serviceId: data.serviceId,
	        	menuItem: data.menuItem,
	        	maleFlag: data.maleFlag ? 1:0,
	        	femaleFlag: data.femaleFlag ? 1:0,
	        	kidsFlag: data.kidsFlag ? 1:0,
	        	vendorPrice: data.vendorPrice,
	        	fab2uPrice: data.fab2uPrice,
	        	customerPrice: data.customerPrice,
	        	trackingId: $scope.uid
	        }
	    }).then(function(response) {
	    	console.log(response);
	    	$scope.reset();
	    });
    } // update menu
});