// Data

let cupponList =[
	{cuppon_name : "통신사_할인쿠폰",
	cuppon_discounts : 2000,
	cuppon_expireDate : "2019-99-99"
	},
	{cuppon_name : "무료_할인쿠폰",
	cuppon_discounts : 3000,
	cuppon_expireDate : "2019-99-99"
	},
	{cuppon_name : "이벤트_할인쿠폰",
	cuppon_discounts : 1000,
	cuppon_expireDate : "2019-99-99"
	}
];

let reservation_info = {
	headcount : 2,
	
	d :[
	{	person_type : "일반", seat_type: "일반석"}
		]
}

let tickets_price = 10000;

let Payment_status = {
	payment_no : 1,
	payment_breakdown : "온라인구매",
	payment_method : null,
	payment_amount : 10000,
	discounts : 0
};


//Element Ref

let CupponList = document.querySelectorAll("#Cuppon-list  input");
let Payment = document.querySelectorAll("#Payment");
let price = document.querySelector("#price");
let discounts = document.querySelector("#discounts");
let total_price = document.querySelector("#total_price");


const make_CupponList = function(){
	const CupponList = document.querySelector("#Cuppon-list");
	if(CupponList.length == 0){
		CupponList.appendChild(document.createElement(document.createTextNode("보유하신 쿠폰이 없습니다")));
	}
	for(var i=0;i<cupponList.length;i++){
		const newCuppon = document.createElement("li");
		const newCuppon_label = document.createElement("label");
		const newCuppon_input= document.createElement("input");
		newCuppon_input.setAttribute("type","checkbox");
		const newCuppon_name= document.createElement("h5");
		const newCuppon_discounts = document.createElement("h5");
		const newCuppon_expiredate= document.createElement("h5");

		newCuppon_name.classList.add("cuppon_name");
		newCuppon_discounts.classList.add("cuppon_discounts");
		newCuppon_expiredate.classList.add("cuppon_expireDate");

		newCuppon_input.setAttribute("value", cupponList[i].cuppon_discounts);
		const newCuppon_discountsText = document.createTextNode(cupponList[i].cuppon_discounts);
		const newCuppon_nameText = document.createTextNode(cupponList[i].cuppon_name);
		const newCuppon_expiredateText = document.createTextNode(cupponList[i].cuppon_expireDate);

		newCuppon_name.appendChild(newCuppon_nameText);
		newCuppon_discounts.appendChild(newCuppon_discountsText);
		newCuppon_expiredate.appendChild(newCuppon_expiredateText);

		newCuppon_label.appendChild(newCuppon_input);
		newCuppon_label.appendChild(newCuppon_name);
		newCuppon_label.appendChild(newCuppon_discounts);
		newCuppon_label.appendChild(newCuppon_expiredate);
		newCuppon.appendChild(newCuppon_label);

		CupponList.appendChild(newCuppon);
	};
}

const change_Payment = function(){
	const price = document.querySelector("#price");
	const discounts = document.querySelector("#discounts");
	const total_price = document.querySelector("#total_price");

	price.innerHTML = tickets_price;
	discounts.innerHTML = Payment_status.discounts;
	total_price.innerHTML = Payment_status.payment_amount;
};



const change_PaymentStatus = function(){
	if(this.checked == true){	
		Payment_status.discounts  += parseInt(this.value);
		Payment_status.payment_amount = tickets_price - Payment_status.discounts;
		this.parentNode.classList.toggle('active');
	} else {
		Payment_status.discounts -= parseInt(this.value);
		Payment_status.payment_amount = tickets_price - Payment_status.discounts;
		this.parentNode.classList.toggle('active');
	}
	change_Payment();
};
const checkOut = function(){
	const reservation_form = document.querySelector("#reservation_form");
	reservation_form.action=`${location.protocol}//${location.host}/payment/checkout`;
	reservation_form.method= 'POST';
	reservation_form.submit();


}


make_CupponList();
change_Payment();

CupponList = document.querySelectorAll("#Cuppon-list  input");

CupponList.forEach((element)=>{
	element.addEventListener('click',change_PaymentStatus.bind(element));
})

const checkoutBtn = document.querySelector('#checkOutBtn');
checkoutBtn.addEventListener('click',checkOut);
