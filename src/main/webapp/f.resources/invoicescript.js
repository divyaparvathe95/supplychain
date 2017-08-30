function myFunction() {
   			    var x = document.getElementById('demo');
   			    if (x.style.display === 'none') {
   			        x.style.display = 'block';
   			    } else {
   			        x.style.display = 'none';
   			    }
  }
   function myFunction1() {
   			    var x = document.getElementById('demo1');
   			    if (x.style.display === 'none') {
   			        x.style.display = 'block';
   			    } else {
   			        x.style.display = 'none';
   			    }
  	}
  function toggleview(){
	  var x = document.getElementById('invoicelist');
	  var y = document.getElementById('view');
	  var z = document.getElementById('view1');
		    if (y.style.display === 'none') {
		        x.style.display = 'none';
		        z.style.display = 'none';
		        y.style.display = 'block';
		    } else {
		    	x.style.display = 'block';
		        y.style.display = 'none';
		        z.style.display = 'none';
		    }
}
  function toggleview1(){
	  var x = document.getElementById('invoicelist');
	  var y = document.getElementById('view');
	  var z = document.getElementById('view1');
		    if (z.style.display === 'none') {
		        x.style.display = 'none';
		        y.style.display = 'none';
		        z.style.display = 'block';
		    } else {
		    	x.style.display = 'block';
		        y.style.display = 'none';
		        z.style.display = 'none';
		    }
}
  function getStatus(x){
	  if(x==0)
		  {
		  	document.getElementById("status").innerHTML="Draft";
		  }
	  else if(x==1)
	  {
	  	document.getElementById("status").innerHTML="Approved";
	  }
	  else
	  {
	  	document.getElementById("status").innerHTML="Rejected";
	  }
  }
  var invoiceApp = angular.module('invoiceApp', ["ngRoute"]);
	invoiceApp.config(function ($routeProvider){
		$routeProvider
		.when('/InvoiceLanding', {
		templateUrl : 'InvoiceLanding.html'
		})
		.when('/InvoiceCreate', {
		templateUrl : 'InvoiceCreate.html'
		})
		.when('/InvoiceView', {
		templateUrl : 'InvoiceView.html'
		})
		.when('/InvoiceUpdate', {
		templateUrl : 'InvoiceUpdate.html'
		})
		.when('/InvoiceDelete', {
		templateUrl : 'InvoiceDelete.html'
		})
		.when('/InvoiceSearch', {
		templateUrl : 'InvoiceSearch.html',
	
		})
		.when('/InvoiceDeleteConfirm', {
		templateUrl : 'InvoiceDeleteConfirm.html',
	
		})
	});

	invoiceApp.controller('mainController', function($scope, $http){
		
        $scope.deletefunc = function () {
        console.log("on delete function ");

			var invoiceNo = $scope.invoiceNo;
			console.log(invoiceNo);
			/*  view Invoice  */
			$http.post('http://localhost:8181/invoice/searchInvoice?invoiceID='+invoiceNo).success(function (data) {
				console.log( "in view http");
				$scope.invoice = data;
                console.log($scope.invoice);
                window.location = "#/InvoiceDeleteConfirm";
            });
			/*  view product  */
            $http.post('http://localhost:8181/invoice/viewProduct/?id=' + invoiceNo)
			.success(function (data) {
                $scope.productslist = data;
                console.log($scope.productslist);
                });
                
		}
        $scope.searchfunc = function () {
            
        	console.log("in search function ");
    			var invoiceNo = $scope.invoiceNo;
    			console.log(invoiceNo);
    			/*  view Invoice  */
    			$http.post('http://localhost:8181/invoice/searchInvoice?invoiceID='+invoiceNo).success(function (data) {
    				console.log( "in search page after service");
    				$scope.invoice = data;
                    console.log($scope.invoice);
                    window.location = "#/InvoiceSearch";
                });
    			/*  view product  */
                $http.post('http://localhost:8181/invoice/viewProduct/?id=' + invoiceNo)
    			.success(function (data) {
                    $scope.productslist = data;
                    console.log($scope.productslist);
                });
    	}
      
        $scope.updateSearchfunc = function () {
            
        	console.log("in search function ");
    			var invoiceNo = $scope.invoiceNo;
    			console.log(invoiceNo);
    			/*  view Invoice  */
    			$http.post('http://localhost:8181/invoice/searchInvoice?invoiceID='+invoiceNo).success(function (data) {
    				console.log( "in updat after Search http");
    				$scope.invoice = data;
                    console.log($scope.invoice);
                    window.location = "#/InvoiceUpdate";
                });
    			/*  view product  */
                $http.post('http://localhost:8181/invoice/viewProduct/?id=' + invoiceNo)
    			.success(function (data) {
                    $scope.productslist = data;
                    console.log($scope.productslist);
                });
    	}
        $scope.addItemFunc = function () {
            
        	console.log("in addItem function ");
    			var invoiceNo = $scope.invoiceNo;
    			console.log('invoice: ' + invoiceNo);
    			console.log('Product id: ' + $scope.productID);
    			console.log('quantity: ' + $scope.quantity);
    			console.log('grossAmount: ' + $scope.grossAmount);
    			console.log('tax: ' + $scope.tax);
    			console.log('netAmount: ' + $scope.netAmount);
    		
    			/*  Add New product  */
                $http.post('http://localhost:8181/invoice/addItems?invoiceID='+$scope.invoiceNo+'&productID='+$scope.productID+'&quantity='+ $scope.quantity+'&grossAmount='+$scope.grossAmount +'&tax='+$scope.tax +'&netAmount=' + $scope.netAmount)
    			.success(function (data) {
    				alert("Added new Item");
    				$http.post('http://localhost:8181/invoice/viewProduct/?id=' + invoiceNo)
        			.success(function (data) {
                        $scope.productslist = data;
                        console.log($scope.productslist);
                    });
                    $scope.productID="";
                    $scope.quantity="";
                    $scope.grossAmount="";
                    $scope.tax="";
                    $scope.netAmount="";
                });
                
    	}
        
        $scope.deleteItemFunc = function () {
            
        	console.log("in update function ");
    			var invoiceNo = $scope.invoiceNo;
    			console.log('invoice: ' + invoiceNo);
    			console.log('Product id: ' + $scope.delProductId);
    			
    			/*  view Invoice  
    			$http.post('http://localhost:8181/invoice/searchInvoice?invoiceID='+invoiceNo).success(function (data) {
    				console.log( "in updat after Search http");
    				$scope.invoice = data;
                    console.log($scope.invoice);
                });*/
    			/*  delete product  */
              $http.post('http://localhost:8181/invoice/deleteItem?invoiceID='+$scope.invoiceNo +'&productID=' + $scope.delProductId)
    			.success(function (data) {
                    $scope.productslist = data;
                    console.log($scope.productslist);
                });
    	}
        
		$scope.landingfunc = function () {
		console.log('go to landing page');
		window.location = "#/InvoiceLanding";
        }
	
	 
		$scope.deleteresultfunc = function () {
		console.log('go to delete result page');
		 $http.post('http://localhost:8181/invoice/deleteInvoice?invoiceID=' + $scope.invoiceNo)
			.success(function (data) {
                $scope.message = data;
                console.log(data);
                });
		window.location = "#/InvoiceDeleteResult";
        }
		

		$scope.receivedInvoicefunc = function () {
			console.log('inside received invoice');
      		$http.post('http://localhost:8181/invoice/ReceivedInvoices?sellerID=' + $scope.sellerID)
			.success(function (data) {
				console.log("inside http");
                $scope.invoicelist = data;
                console.log(data);
                });
      		$scope.message="Click to view received invoices";
      		window.location = "#/InvoiceLanding";
        }
		
		$scope.sentInvoicefunc = function () {
			console.log('inside sent invoice');
      		$http.post('http://localhost:8181/invoice/SentInvoices?sellerID=' + $scope.sellerID)
			.success(function (data) {
				console.log("inside http");
                $scope.invoicelist = data;
                console.log(data);
                });
      		$scope.message1="Click to view sent invoices";
      		window.location = "#/InvoiceLanding";
        }
		$scope.viewfunc = function (invoiceNo) {
			console.log('inside view invoice');
			$http.post('http://localhost:8181/invoice/searchInvoice?invoiceID='+invoiceNo).success(function (data) {
				console.log( "in search page after service");
				$scope.invoice = data;
                console.log($scope.invoice);
                
            });
			/*  view product  */
            $http.post('http://localhost:8181/invoice/viewProduct/?id=' + invoiceNo)
			.success(function (data) {
                $scope.productslist = data;
                console.log($scope.productslist);
            });
            window.location = "#/InvoiceLanding";
	}
		$scope.approvefunc = function (invoiceNo) {
			console.log('inside approve invoice');
			$http.post('http://localhost:8181/invoice/approveInvoice?invoiceID='+invoiceNo).success(function (data) {
				console.log( "in approve page after service");
				$scope.status = "You have approved invoice no:"+invoiceNo;
                console.log($scope.status);  
                
            });
			
            window.location = "#/InvoiceLanding";
	}
		$scope.rejectfunc = function (invoiceNo) {
			console.log('inside approve invoice');
			$http.post('http://localhost:8181/invoice/rejectInvoice?invoiceID='+invoiceNo).success(function (data) {
				console.log( "in reject page after service");
				$scope.status = "You have rejected invoice no:"+invoiceNo;
                console.log($scope.status);  
                
            });
			
            window.location = "#/InvoiceLanding";
	}
		$scope.savedraftfunc = function () {
			console.log('inside save as draft invoice');
			
			/*$http.post('http://localhost:8181/invoice/rejectInvoice?invoiceID='+invoiceNo).success(function (data) {
				console.log( "in reject page after service");
				$scope.status = "You have rejected invoice no:"+invoiceNo;
                console.log($scope.status);  
                
            });
			*/
			$scope.draftstatus = "You have saved the invoice as draft";
			//windows.alert("You have saved the invoice as draft");
            window.location = "#/InvoiceLanding";
	}
		$scope.sendtoapproval = function () {
			console.log('inside send to approval invoice');
			
			/*$http.post('http://localhost:8181/invoice/rejectInvoice?invoiceID='+invoiceNo).success(function (data) {
				console.log( "in reject page after service");
				$scope.status = "You have rejected invoice no:"+invoiceNo;
                console.log($scope.status);  
                
            });
			*/$scope.draftstatus = "You have sent the invoice for approval";
			//windows.alert("You have saved the invoice as draft");
            window.location = "#/InvoiceLanding";
	}
	});