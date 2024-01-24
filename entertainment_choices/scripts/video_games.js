// let count = 0;
// let btns = document.querySelectorAll(".btn");
// let disps = document.querySelectorAll(".display");
    
// // for (let i = 0; i < buttons.length; i++)
// // btns.forEach = function () {
// //             count++;
// // disps.innerHTML = count;
// // }

// const buttons = document.querySelectorAll('.btn');
//   buttons.forEach(button => {
//     button.addEventListener('click', () => {
//       count++;
//       disps.innerHTML = count;
//     });
//   });


// var button = document.getElementsByClassName("clickme");
// var idbutton = document.getElementById("idbutton");
// var nbbutton = [0, 1, 2, 3, 4];
// count = 0;
// for (var y = 0; y < button.length; y++)
//   button[y].onclick = function() {
//     if (!this.classList.contains('alreadyClicked')) {
//       count += 1;
//       counter.innerHTML = "Total unique click: " + count;
//       nbbutton[y] = "clicked";
//       this.classList.add("alreadyClicked");
//     } else {
//       console.log("You've already clicked me!")
//     }
//   }

let counters = {};
 
 
function load_counters() {
    let counters_str = localStorage.getItem('multi_counter');
    if (counters_str === null) {
        console.log('new multi counter system');
    } else {
        counters = JSON.parse(counters_str);
    }
    show_counters();
}
 
function increase_counter(event) {
    let name = event.target.getAttribute("data-name");
    counters[name]++;
    localStorage.setItem('multi_counter', JSON.stringify(counters));
    show_counters();
}
 
function show_counters() {
    let counter_list =  Object.keys(counters);
    console.log(counter_list);
    let html = "";
    for (let ix = 0; ix < counter_list.length; ix++) {
        let name = counter_list[ix];
        html += `<button class="counter" data-name="${name}">${name} : ${counters[name]}</button> `;
    }
    document.getElementById('counters').innerHTML = html;
    let elements = document.getElementsByClassName('counter');
    console.log(elements);
    for (let ix = 0; ix < elements.length; ix++) {
        elements[ix].addEventListener('click', increase_counter);
    }
}
 
 
function reset_all() {
    document.getElementById('status').innerHTML = '';
    counters = {};
    localStorage.removeItem('multi_counter');
    show_counters();
}
 
function add_counter() {
    let name = document.getElementById('name').value;
    // remove spaces
    name = name.replace(/^\s+/g, "");
    name = name.replace(/\s+$/g, "");
    if (name == "") {
        document.getElementById('status').innerHTML = 'Missing name for new counter';
        return;
    }
    // console.log(counters[name]);
    if (name in counters) {
        document.getElementById('status').innerHTML = `counter '${name}' already exists`;
        return;
    }
    counters[name] = 1;
    localStorage.setItem('multi_counter', JSON.stringify(counters));
    document.getElementById('status').innerHTML = 'added';
    document.getElementById('name').value = "";
    show_counters();
}
 
document.getElementById('reset_all').addEventListener('click', reset_all);
document.getElementById('add_counter').addEventListener('click', add_counter);
load_counters();
show_counters();