$(document).ready(function(){
  if (document.title == "CarsCarsCars | Inventory"){
    createInventory()
  }
  $('#inventory').on('click', 'button.car-price-btn', addTax)
  $('.searchbox').keyup(filterCars)
})


function createInventory(){
  fetch("data/cars.json")
  .then(response => response.json())
  .then((json) => {
    for (i in json.cars){
      addToInventory(json.cars[i], i)
    }
  });
}

function addToInventory(car, key){
  name = car.name.toLowerCase().split(" ").join("-")

  //create individual car container
  $('<article class="car-container row justify-content-center align-items-center" id="' + name + '">').html(
    //add title row androw with info and pic
    '<div class="col-12 text-center h4 car-name">' + car.name +
    '</div><div class="col-9 car-image"><img class="img-fluid" src="' +
     car.image + '"/></div><div class="col-3 car-price-container row"><div class="col-12 text-center car-price" id="' +
     name + '-price">' + car.price + '</div><button class="col-12 car-price-btn btn" id="' +
    name + '-button">w/Tax</button></div>').appendTo('#inventory')
}

function addTax(e){
  let price = e.target.id.split("-") //.pop().push("price").join("-")
  price.pop()
  price.push("price")
  price = price.join('-')
  price = parseInt($('#' + price).text().replace(/[^0-9\.]+/g, ""))
  let afterTax = price*0.08 + price
  afterTax = afterTax.toString()
  afterTax = afterTax.split('')
  afterTax.unshift("$")
  if (afterTax.length > 3){
    afterTax.splice((afterTax.length-3), 0, ",")
  }
  afterTax = afterTax.join('')
  $('#' + e.target.id).text(afterTax)
}

function filterCars(){
  let input = $(this).val().toLowerCase()
  let $cars = $('.car-container')
  for (i in $cars){
    $cars[i].id
    if ($cars[i].id != undefined){
      if (($cars[i].id).indexOf(input) == -1){
        $('#' + $cars[i].id).css("max-height", "0").css("padding-top", "0")
      } else {
        $('#' + $cars[i].id).css("max-height", "1000px").css("padding-top", "3%")
      }
    }
  }
}
