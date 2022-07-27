let myLeads = []
let inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
// localStorage.clear()
const leadsFromLocalSorage = JSON.parse(localStorage.getItem('myLeads'))
console.log(leadsFromLocalSorage)

if(leadsFromLocalSorage){
    myLeads = leadsFromLocalSorage
    render(myLeads)
}



tabBtn.addEventListener("click",function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem('myleads', JSON.stringify(myLeads) )
        render(myLeads)
    })
})

deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener('click', function() {
    myLeads.push (inputEl.value)
    inputEl.value = '' 

    localStorage.setItem('myLeads',JSON.stringify(myLeads))

    render(myLeads)
    console.log(localStorage.getItem('myLeads'))
})


function render(leads){
    let listItems = ''
    for(let i=0; i < leads.length; i++){
        // listItems += "<li><a target='_blank' href='" +myLeads[i]+"'>"+ myLeads[i]+ "</a></li>"


        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
                </a>
            </li>
        `
    }

    ulEl.innerHTML =  listItems
}
