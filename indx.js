const temperaturefield=document.querySelector(".weather1");
const cityfield=document.querySelector(".weather2 p");
const datefield=document.querySelector(".weather2 span");
const emojifield=document.querySelector(".weather3 img");
const weatherfield=document.querySelector(".weather3 span");
const searchfield=document.querySelector(".searchfield");
const form=document.querySelector("form");

let target="Mumbai";

const fetchdata = async(target) => {
    try {
        const url=`https://api.weatherapi.com/v1/current.json?key=990a92b1c91e4f26882181641242001&q=${target}`
    const respo= await fetch(url);
    const data= await respo.json();
    console.log(data);
    const 
    {current: { 
        temp_c,
         condition :{text, icon }
},
    location: { name, localtime }
    }=data;
    updatedom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Please enter a correct location");
    }
};

function updatedom(temperature, city, time, emoji, text ) {
    temperaturefield.innerHTML = `${temperature}<sup class="superscript">&deg;c</sup>`;
    cityfield.innerText=city;
    const exactTime=time.split(" ")[1];
    const exactDate=time.split(" ")[0];
    const exactDay=new Date(exactDate).getDay();
    datefield.innerText=`${exactTime} - ${getDayfull(exactDay)}  ${exactDate}`
    emojifield.src=emoji; 
    weatherfield.innerText= text;
}
fetchdata(target);
function getDayfull (num){
    switch(num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
         case 5:
            return "Friday";
         case 6:
            return "Saturday";

    default:
            return "Nope";
            
    }
}

const search =(e)=> {
    e.preventDefault();
    target=searchfield.value;
    fetchdata(target);
};
 form.addEventListener("submit", search);