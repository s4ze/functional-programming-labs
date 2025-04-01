let sum a b = a + b
let sub a b = a - b
let prd a b = a * b
let div a b = a / b

let rec fact a =
    if a = 0 || a = 1 then 1
    elif a > 1 then a * fact (a - 1)
    else 0

printfn "Sum: %d" (sum 1 4)
printfn "Subtraction: %d" (sub 1 4)
let multiplyBy10 = prd 10
printfn "Multiplication by 10: %d" (multiplyBy10 89)
printfn "Division %d" (div 120 9)
let divByFact = fact >> div
let divByFact5 = divByFact 5
printfn "Division by factorial of 5: %d" (divByFact5 10)
printfn "Factorial: %d" (fact 5)
