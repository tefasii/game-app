let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector("#time")
let $time_header = document.querySelector("#time-header")
let $result_header = document.querySelector("#result-header")
let $result = document.querySelector("#result")
let $game_time = document.querySelector('#game-time')
let $tapped = document.querySelector("#tapped")
let $app = document.querySelector(".app")
let $loginName = document.querySelector(".loginName")
let $userName = document.querySelector("#userName")
let $listOfUSer = document.querySelector(".listOfUsers")





let score = 0
let person = {}
let list = []
$start.addEventListener('click',start)

        function start(){
            score = 0
            $start.classList.add('hide')
            $start.style.backgroundColor = ' white'
            timer()
            createBox()
            $time_header.classList.remove('hide')
            $result_header.classList.add('hide')
            setTime()
            $game_time.setAttribute("disabled","true")
        }
function timer(){
let Interval = setInterval(function(){
    $time.textContent = (Number($time.textContent) - 0.1).toFixed(1)
    if ($time.textContent == 0.0){
       
        
        clearInterval(Interval)
        gameEnd()
        
    }
},100)}


    function createBox(){
        $game.innerHTML = ""
        let box = document.createElement('div')
        let size = getRandom(30,300)
        let top = getRandom(0,300-size)
        let left = getRandom(0,300-size)


        box.style.backgroundColor = `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 254)})`
        box.style.width = box.style.height =size + "px"
        box.style.position = 'absolute'
        box.style.top =top + "px"
        box.style.left =left + "px"
        box.style.cursor = "pointer"
        box.setAttribute("data-box","true")
        $game.insertAdjacentElement('afterbegin', box)
    }

    $game.addEventListener("click",clickBox)

    function clickBox(event){
       if (event.target.dataset.box){
        createBox()
        score++
       }
    }

             function getRandom(min, max) {
            return Math.ceil(Math.random() * (max -min) + min);
        }


        function gameEnd(){
                $start.classList.remove('hide')
                $game.style.backgroundColor = "#ccc"
                $game.innerHTML = ""
                $time_header.classList.add('hide')
                $result_header.classList.remove('hide')
                $result.textContent = score
                $game_time.removeAttribute("disabled")
               saveResult()
        }
        function showUsers(){
            let data = getData()
            data.sort(function(a,b){
                return a.score > b.score ? -1 : 1
            })
            $listOfUSer.innerHTML = ""
            data.forEach(function(element){
                $listOfUSer.insertAdjacentHTML('beforebegin',
                `<div class="users">
                <h1>
                ${element.name}
                ---
                ${element.score}
                <h1/>
                <div/>`)
            });
        }
        function saveResult(){
            person.name = $userName.value
            person.score = score
            list = getData()
            list.push(person)
            postData(list)
            showUsers()

        }

        function postData(list){
            localStorage.setItem('list',JSON.stringify(list))
        }
        function getData(){
            return JSON.parse(localStorage.getItem('list'))
        }


        $game_time.addEventListener('input',setTime)

        function setTime(){
            $time.textContent = $game_time.value
            $time_header.classList.remove('hide')
            $result_header.classList.add('hide')
        }

        $tapped.addEventListener('click', function(){
            $app.classList.remove("hide")
            $loginName.classList.add("hide")
            showUsers()
        })
