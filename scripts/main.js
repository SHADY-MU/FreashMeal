$(document).ready(function(){
  $('.slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay : true ,
    autoplaySpeed : 3000 , 
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});

const container = document.querySelector(".products .container");
const cart = document.querySelector(".cart-products .container");
const TolalPrice = document.querySelector(".last p");
let cartproducts;

if(localStorage.getItem("cartPro")){
    cartproducts = JSON.parse(localStorage.getItem("cartPro"));
}
else{
    cartproducts = [];
}

const upButton = document.querySelector(".toup");

window.addEventListener("scroll" , function(){
  if(window.scrollY > 345){
    upButton.style.visibility = "visible"
    upButton.style.opacity = 1;
  }
  else{
    upButton.style.display = "hidden"
    upButton.style.opacity = 0;
  }
})

upButton.addEventListener("click" , function(){
  scrollTo({
    top: 0,
    behavior: "smooth"
  })
})

$("nav .fa-cart-shopping").click(function(){
  $(".cart-products").css({right: 0 })
})
$(".fa-circle-xmark").click(function(){
  $(".cart-products").css({right: "-400px" })
})

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

display()


$(".fa-bars").click(function(){
  $(".fa-bars").toggleClass("active");
  $(".ul").toggleClass("active");

})