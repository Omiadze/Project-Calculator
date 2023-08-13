let workGround = document.querySelector('.work-ground')
let btns = document.querySelectorAll(".btn")
let result = document.querySelector('.result')


let valueSaver = {
    firstNumber: null,
    operator: null,
    secondNumber: null,
    result: null,
    lastClick: null,
    equality: null
}

btns.forEach(btn => btn.addEventListener('click', (e) => {
    calculation(e.target)
}))

function calculation(element){
    let type = element.dataset.type
    let value = element.dataset.value
   
    
    if(type == "number"){
        if(valueSaver.operator == null && value == "." && valueSaver.firstNumber == null){
            value = "0" + '.'
            valueSaver.firstNumber = value
            lastClikSaver(type)
        }
    


        // else if(valueSaver.secondNumber !== null && value == "."){
        //     value = "0" + '.'
        //     valueSaver.secondNumber = value
        // }
        // else if(valueSaver.firstNumber == "0"  ){
        //     valueSaver.firstNumber = null   
        // }else if(valueSaver.secondNumber == "0"){
        //     valueSaver.secondNumber = null
        // }


        else if(valueSaver.secondNumber == null && valueSaver.operator == null){
            valueSaver.firstNumber = valueSaver.firstNumber == null ? value : valueSaver.firstNumber.toString() + value.toString()
            lastClikSaver(type)
        }else if(valueSaver.operator !== null){
            valueSaver.secondNumber = valueSaver.secondNumber == null ? value : valueSaver.secondNumber.toString() + value.toString()
            lastClikSaver(type)
        }
    }
        

        // if(valueSaver.equality !== null){
        //     clear()
        //     valueSaver.firstNumber = value
             

        // }


    
    if(type == "operator"){
        
        valueSaver.equality = null
        if(valueSaver.firstNumber == null){
            valueSaver.firstNumber = 0
        }
        if(valueSaver.secondNumber !== null ){
            valueSaver.result = operate(parseFloat(+valueSaver.firstNumber), valueSaver.operator, parseFloat(+valueSaver.secondNumber))
            valueSaver.firstNumber = valueSaver.result
           
        }
        valueSaver.operator = value


        lastClikSaver(type)
    }
    
    if(type == "equality" ){
        // if(valueSaver.operator == null){
        //     return
        // }

        if(valueSaver.secondNumber == null){
            valueSaver.secondNumber = valueSaver.firstNumber

            valueSaver.result = operate(parseFloat(valueSaver.firstNumber), valueSaver.operator, parseFloat(valueSaver.firstNumber))
        } 
        
       valueSaver.result = operate(parseFloat(valueSaver.firstNumber), valueSaver.operator, parseFloat(valueSaver.secondNumber))
       valueSaver.firstNumber = valueSaver.result
        
        lastClikSaver(type)
        
    }
    if(type == "clear"){
        clear()
    
    }
    if(type == "delete"){
        clearOne()
        
    }
    if(valueSaver.lastClick == "operator" ){
       
        
         valueSaver.secondNumber = null 
    }
    
    displayNumbers(value, type)
}

function lastClikSaver(clickedBtnValue){
    
    valueSaver.lastClick = clickedBtnValue
}

function displayNumbers(clickedBtnValue, clickedBtnType){



    if(clickedBtnType == "number"){
        if(valueSaver.equality !== null){
            clear()
            valueSaver.firstNumber = clickedBtnValue
            
        }
    if(workGround.textContent == "0"){
        workGround.textContent = ''
    }
        
    
        if(valueSaver.secondNumber !== null){
            workGround.textContent = valueSaver.secondNumber
        } else {
            workGround.textContent += clickedBtnValue 
        }
        if(valueSaver.operator !== null){
            result.textContent += ""
        }   
    
    }else if(clickedBtnType == "operator" ){
        if(valueSaver.secondNumber == null){
            result.textContent = valueSaver.firstNumber.toString() + valueSaver.operator
        }
        
        workGround.textContent = valueSaver.firstNumber        
    }else if(clickedBtnType == "equality"){
        
        
        workGround.textContent = valueSaver.result
        result.textContent = result.textContent + valueSaver.secondNumber.toString() + clickedBtnValue
        
        valueSaver.operator = null
        valueSaver.secondNumber = null
        valueSaver.result = null
        valueSaver.lastClick = null
        valueSaver.equality = clickedBtnValue
        
    }
}




function clear(){
    
    valueSaver.firstNumber = null
    valueSaver.operator = null
    valueSaver.secondNumber = null
    valueSaver.result = null
    valueSaver.lastClick = null
    valueSaver.equality = null
    workGround.textContent = 0
    result.textContent = ''
    
}


 function clearOne(){
    
    workGround.textContent = workGround.textContent.slice(0, -1)
    if(valueSaver.operator == null){
        valueSaver.firstNumber = workGround.textContent
    }
    if(valueSaver.secondNumber !== null){
        valueSaver.secondNumber = workGround.textContent
    }

    if(valueSaver.firstNumber == null || valueSaver.firstNumber == ""){
        valueSaver.firstNumber = "0"
    }
    // valueSaver.firstNumber = null
    // valueSaver.operator = null
    // valueSaver.secondNumber = null
    // valueSaver.result = null
    // valueSaver.lastClick = null
 }




function add(x, y){
    let sum = x + y;
    return sum
}

function substract(x, y){
    return x - y;
}


function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}



function operate(numberOne, operator, numberTwo){
    let result = null
    if(operator == "+"){
        result = add(numberOne, numberTwo)
    } else if(operator == "-"){
        result = substract(numberOne, numberTwo)
    } else if(operator == "*"){
        result = multiply(numberOne, numberTwo)
    } else if(operator == "/"){
        result = divide(numberOne, numberTwo)
    }
    return result
}
