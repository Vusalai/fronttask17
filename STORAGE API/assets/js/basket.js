function GetItems() {
    let basket = JSON.parse(localStorage.getItem('products'));

    if(basket.length === 0) {
        document.getElementById('empty').classList.remove('d-none')
        document.getElementById('btn_delete').classList.add('d-none')
    }
    else{
        document.querySelector('.table').classList.remove('d-none')
        let html = '';
        for(let item of basket) {
            html += `
                <tr>
                    <th scope="row">${item.Id}</th>
                    <td style="width:20%">
                        <img src=${item.Image} alt="">
                    </td>
                    <td>${item.Name}</td>
                    <td>
                    <input class="product-count-changer" data-id=${item.Id}type="number" min="1" max="10" value=${item.Count}>
                    </td>
                    <td data-id="${item.Id}-price"><span data-price=${item.Id}class="product-price">${item.Price}</span></td>
                </tr>
            `
        }
    
        document.querySelector('.table tbody').innerHTML = html
    }

   

}

GetItems();
document.getElementById('btn_delete').onclick=function(){
    localStorage.removeItem('products')
    location.reload();
}
const productCounter=document.querySelectorAll(".product-count-changer")
productCounter.forEach(pc=>addEventListener("change",function(event){
    let basket=JSON.parse(localStorage.getItem('products'));
    let dataId=pc.getAttribute("data-id");
    let count=event.target.value;
    for(const product of basket){
        if(product.Id==dataId){
            let productPrice=document.querySelectorAll("[data-price]");
            productPrice.forEach(n=>{
                if(n.getAttribute(`data-price`)==dataId){
                    n.innerHTML=parseInt(product.Price)*count;
                }
            });
        }
    }


    document.getAttribute(`${dataId}-price`).innerHTML=count;
    console.log(dataId);
}));