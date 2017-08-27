var acmApp = angular.module('acmApp', ["ngRoute"]);
acmApp.config(function ($routeProvider){
	console.log("page1");
	$routeProvider
	.when('/', {redirectTo : 'ACMindex.html'})
	.when('/coaList', {templateUrl : 'coaList.html'})
	.when('/viewGL', {templateUrl : 'viewGL.html'})
	.when('/addCOA', {templateUrl : 'addCOA.html'})
});
	
acmApp.controller('coaListCtrl', function ($scope, $http){    
	$scope.callCoaList = function () {
		console.log("coaListCtrl");
        $http.post('http://localhost:8181/ACM/viewCOAlist').success(function (data) {
            $scope.coaList = data;
            console.log(data);
            window.location = "#coaList";
					
        });
	}
	$scope.callGl = function () {
        $http.post('http://localhost:8181/ACM/viewGL').success(function (data) {
            $scope.glList = data;
            console.log(data);
            window.location = "#viewGL";
					
	    });
	}
	$scope.callGlSearch = function () {
		var acEntryNo=this.acEntryNo;
		var transNo=this.transNo;
		var custAcNo=this.custAcNo;
		var swiftID=this.swiftID;
		var paymentDate=this.paymentDate;
		var invoiceNo=this.invoiceNo;
		var drCr=this.drCr;
		var dueDate=this.dueDate;
		/*var dueDate=this.dueDate;*/
		if(acEntryNo==undefined||acEntryNo=='null')
			acEntryNo='';
		if(transNo==undefined||transNo=='null')
			transNo='';
		if(custAcNo==undefined||custAcNo=='null')
			custAcNo='';
		if(swiftID==undefined||swiftID=='null')
			swiftID='';
		if(paymentDate==undefined||paymentDate=='null')
			paymentDate='';
		else
			paymentDate=getFormattedDate(paymentDate);
		if(invoiceNo==undefined||invoiceNo=='null')
			invoiceNo='';
		if(drCr==undefined||drCr=='null')
			drCr='';
		if(dueDate==undefined||dueDate=='null')
			dueDate='';
		else
			dueDate=getFormattedDate(dueDate);
		console.log(paymentDate);
		console.log(dueDate);
		if(acEntryNo==''&&transNo==''&&custAcNo==''&&swiftID==''&&paymentDate==''&&invoiceNo==''&&drCr==''&&dueDate=='')
		{	
			alert("Enter atleast one field");
			$scope.callGl();
		}
		else
		{
			var url='http://localhost:8181/ACM/viewGLBySearch';
			$http({url:url,method:"POST",params:{'acEntryNo':acEntryNo,'transNo':transNo,'custAcNo':custAcNo,'swiftID':swiftID,'paymentDate':paymentDate,'invoiceNo':invoiceNo,'drCr':drCr,'dueDate':dueDate}}).success(function (data) {
	            $scope.glList = data;
	            console.log(data);
	            window.location = "#viewGL";					
			});
		}
	}
});
acmApp.controller('glCtrl', function ($scope, $http){    
		
});

function getFormattedDate(input) {
    var pattern = /(.*?)-(.*?)-(.*?)$/;
    var result = input.replace(pattern,function(match,p3,p1,p2){
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return p2 + "-" + months[(p1-1)] + "-" + p3%100;
    });
    //alert(result);
    return result;
}

//getFormattedDate("6/1/2013");
	
/*var boxes = $('.myCheckBox');

boxes.on('change', function() {
    $('#deleteButton').prop('disabled', !boxes.filter(':checked').length);
}).trigger('change');*/

var checkBoxes = $('.myCheckBox');
checkBoxes.change(function () {
    $('#deleteButton').prop('disabled', checkBoxes.filter(':checked').length < 1);
});
checkBoxes.change();