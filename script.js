const main = document.getElementById("main")
const addUserBtn = document.getElementById("add-user")
const doubleBtn = document.getElementById("double")
const showMillionariesBtn = document.getElementById("Show-millionaries")
const sortBtn = document.getElementById("Sort")
const calculateWealthBtn = document.getElementById("caculate-wealth")

let data = []
// event calling
addUserBtn.addEventListener("click", getRandomUser)
doubleBtn.addEventListener("click",doubleMoney)
sortBtn.addEventListener("click",sortByRichest)
showMillionariesBtn.addEventListener("click",showMillionarie)
calculateWealthBtn.addEventListener("click",calculateWealth)

// function
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api")
    const data = await res.json()
    // console.log(data);
    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 100000000)

    }
    addData(newUser);
}
// double money
function doubleMoney()
{
    data=data.map((user)=>{
        return {...user,money:user.money*2}
    })
    updateDom()
}
// sort ny richest
function sortByRichest()
{
    data.sort((a,b)=>b.money-a.money)
    updateDom();
}

// pushto array
function addData(obj) {
    data.push(obj)
    updateDom();
}
// show millianores
function showMillionarie()
{
   data= data.filter(i=>i.money>100000000)
    updateDom();

}
// calculate wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  
    const wealthEl = document.createElement('div');
    wealthEl.classList.add("wealth")
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
      wealth
    )}</strong></h3>`;
    main.appendChild(wealthEl);
  }

// update dom
function updateDom(providedData=data){
    // clear div
    main.innerHTML=` <h2><strong>Person</strong>Wealth</h2>`
    providedData.forEach(item=>{
        const element=document.createElement("div")
        element.classList.add("person")
        element.innerHTML=`<strong> ${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}
// formath the money
function formatMoney(num){
    return num.toLocaleString("hi-IN")

}





