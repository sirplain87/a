<html>
<body>

<script type="text/javascript" src="../js/jquery-1.11.3.min.js">
</script>
	<h1>test</h1>
<input id="ip">
	<button onclick="fun()">pay</button>

<script type="text/javascript" >
function fun(){
	var input = $("#ip").val();
	var response = $.ajax({url:'http://localhost:8080/order/payment/payinfo',
		async:false,
		type:'POST',
		data:{'orderId':input},
		success:function(data){

			var risk = "";
			var obj = eval('(' + data + ')')
			var obj1 = obj.data;
			var url = 'http://pb-pmt-ui-cashier.vip.elong.com:8080/cash.html?chanelType=9114&orderId=' + input +'&tradeNo=' + obj1.token + '&businessType=1002&orderFrom=1&payFrom=20000000&asynNotifyUrl=' + obj1.callBackUrl + '&productName=北京-上海(2015年7月31)&businessName=机票&payAmount=680&memberCardNo=18000&requestType=1&requestDate=2015-07-08 14:11:13&requestor=air3&requestIP=10.20.254.74&line1=&line2=&line3=&line4=&line5=';
			window.open(url);
		}
	});

//	var obj = eval(response);
//	alert(obj);
//	alert(response.data)
//	alert(response.toString)
//
//	alert(obj.data);
	//获取token
//		url = http://pb-pmt-ui-cashier.vip.elong.com:8080/cash.html?chanelType=9114&orderId=30002181&tradeNo=-100000000000507742&businessType=1002&orderFrom=1&payFrom=20000000&asynNotifyUrl=http://flight.test.elong.com/webservice_v2/PaymentPlatformCallback.aspx&productName=北京-上海(2015年7月31)&businessName=机票&payAmount=680&memberCardNo=18000&requestType=1&requestDate=2015-07-07 15:46:13&requestor=air3&requestIP=10.20.254.74&line1=&line2=&line3=&line4=&line5=;
//	window.open("http://pb-pmt-ui-cashier.vip.elong.com:8080/cash.html");
}


</script>
</body>
</html>