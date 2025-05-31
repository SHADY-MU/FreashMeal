
var products = [
    {
        id:1 ,
        img:"images/icone.png" ,
        name:"Product one",
        price:30,

    },
    {
        id:2 ,
        img:"images/jars.jpg" ,
        name:"Product two",
        price:45,
    },
    {
        id:3 ,
        img:"images/plate-2.png" ,
        name:"Product three",
        price:28,
    },
    {
        id:4 ,
        img:"images/plate-3.png" ,
        name:"Product four",
        price:28,
    },
    {
        id:5 ,
        img:"images/plate-1.png" ,
        name:"Product five",
        price:50,
    },
    {
        id:6 ,
        img:"images/salad-table.jpg" ,
        name:"Product six",
        price:60,
    },
    {
        id:7 ,
        img:"images/yogurt.png" ,
        name:"Product seven",
        price:75,
    },
    {
        id:8 ,
        img:"images/cupcake.png" ,
        name:"Product eight",
        price:72,
    },
    {
        id:9 ,
        img:"images/food-table.jpg" ,
        name:"Product nine",
        price:80,
    },
    {
        id:10,
        img:"images/coffee.jpg" ,
        name:"Product ten",
        price:100,
    },
]
let text = "";
const container = document.querySelector(".products .container");
const cart = document.querySelector(".cart-products .container");
const TolalPrice = document.querySelector(".last p");
const totalCartPros = document.getElementById("totalCartPros");
let amount = 1;
let cartproducts;

if(localStorage.getItem("cartPro")){
    cartproducts = JSON.parse(localStorage.getItem("cartPro"));
}
else{
    cartproducts = [];
}

for(let i = 0; i < products.length ; i++){
    text += `
        <div class="card">
                <div class="img">
                    <img src="${products[i].img}" alt="">
                </div>
                <div class="card-body">
                    <h5>${products[i].name}</h5>
                    <p>$${products[i].price}</p>
                    <button onclick="addToCart(${i})">Add to Cart</button>
                </div>
        </div>
    `
}
container.innerHTML = text;

$("nav .fa-cart-shopping").click(function(){
  $(".cart-products").css({right: 0 })
})
$(".fa-circle-xmark").click(function(){
  $(".cart-products").css({right: "-400px" })
})

function addToCart(index){

    let found;

    let product = {
        ProName : products[index].name,
        ProPrice : products[index].price,
        ProImg : products[index].img,
        amount : 1
    }

    cartproducts.map(function(i){
        if(product.ProName == i.ProName){
            i.amount += 1;
            found = true
        }
    })

    if(!found){
        cartproducts.push(product);
    }
    display();
}

display();

function display(){
    let textC = "";
    let total = 0;

    if(cartproducts.length < 1){
        textC = "ur cart is empty"
        totalCartPros.style.color = "brown";
    }

    else{
      cartproducts.map(function(a , index){
          textC += `
              <div class="cart-product">
                  <div class="part-one">
                          <div>
                              <img src="${a.ProImg}" alt="">
                          </div>
                          <div>
                              <p>${a.ProName}</p>
                              <p>#${a.ProPrice * a.amount}.00</p>
                          </div>
                      </div>
                      <div class="part-two">
                          <div>
                              <button id="plus" onclick="plusOrminus('plus' , ${index})">+</button>
                              <span>${a.amount}</span>
                              <button id="minus" onclick="plusOrminus('minus' , ${index})">-</button>
                          </div>
                          <i class="fa-solid fa-trash" onclick="Delete(${index})"></i>
                      </div>
                  </div>
              </div>    
          `
          total += a.ProPrice * a.amount;
      })
      totalCartPros.style.color = "#EEBF00";
    }

    TolalPrice.innerText = total;
    cart.innerHTML = textC;
    totalCartPros.innerText = cartproducts.length;
    localStorage.setItem("cartPro" , JSON.stringify(cartproducts))
}

function plusOrminus(id , index){
    if(id == "plus"){
        cartproducts[index].amount += 1;
    }
    else{
        if(cartproducts[index].amount != 1){
            cartproducts[index].amount -= 1;
        }
        else{
            cartproducts.splice(index , 1 );
        }
    }

    display();
}

function Delete(index){
    cartproducts.splice(index , 1);
    display()
}

$(".fa-bars").click(function(){
  $(".fa-bars").toggleClass("active");
  $(".ul").toggleClass("active");

})