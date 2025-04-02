let tryReadInt () =
    match System.Console.ReadLine() |> System.Int32.TryParse with
    | true, num -> Some num
    | false, _ -> None

let tryReadFloat () =
    match System.Console.ReadLine() |> System.Double.TryParse with
    | true, arg -> Some arg
    | false, _ -> None

let tryReadFloats () =
    let args = System.Console.ReadLine().Split(' ', 2)
    let res1, arg1 = System.Double.TryParse(args[0])
    let res2, arg2 = System.Double.TryParse(args[1])

    match res1, res2 with
    | true, true -> Some(arg1, arg2)
    | _, _ -> None

let rec readValidInt () =
    match tryReadInt () with
    | Some num -> num
    | None ->
        printfn "Некорректный ввод! Попробуйте ещё раз."
        readValidInt ()

let rec readValidOperation () =
    match tryReadInt () with
    | Some num when num >= 0 && num < 10 -> num
    | Some num ->
        printfn "Операции %d не существует. Попробуйте ещё раз" num
        readValidOperation ()
    | None ->
        printfn "Некорректный ввод! Попробуйте ещё раз."
        readValidOperation ()

let rec readValidArgument () =
    match tryReadFloat () with
    | Some arg -> arg
    | None ->
        printfn "Некорректный ввод! Попробуйте ещё раз."
        readValidArgument ()

let rec readValidArguments () =
    match tryReadFloats () with
    | Some(arg1, arg2) -> arg1, arg2
    | None ->
        printfn "Некорректный ввод! Попробуйте ещё раз."
        readValidArguments ()

open System
let sum a b = a + b
let sub a b = a - b
let prd a b = a * b
let div a b = a / b

let executeAction operation =
    match operation with
    | 1 ->
        printfn "Введите 2 числа для сложения:"
        let arg1, arg2 = readValidArguments ()
        sum arg1 arg2
    | 2 ->
        printfn "Введите 2 числа для вычитания:"
        let arg1, arg2 = readValidArguments ()
        sub arg1 arg2
    | 3 ->
        printfn "Введите 2 числа для произведения:"
        let arg1, arg2 = readValidArguments ()
        prd arg1 arg2
    | 4 ->
        printfn "Введите 2 числа для деления:"
        let arg1, arg2 = readValidArguments ()
        div arg1 arg2
    | 5 ->
        printfn "Введите 2 числа для возведения в степень:"
        let arg1, arg2 = readValidArguments ()
        Math.Pow(arg1, arg2)
    | 6 ->
        printfn "Введите число для вычисления квадратного корня:"
        let arg = readValidArgument ()
        Math.Sqrt arg
    | 7 ->
        printfn "Введите значение угла в радианах для вычисления синуса:"
        let arg = readValidArgument ()
        Math.Sin arg
    | 8 ->
        printfn "Введите значение угла в радианах для вычисления косинуса:"
        let arg = readValidArgument ()
        Math.Cos arg
    | 9 ->
        printfn "Введите значение угла в радианах для вычисления тангенса:"
        let arg = readValidArgument ()
        Math.Tan arg
    | 0 ->
        printfn "Выход из программы..."
        0
    | _ ->
        printfn "Некорректная операция"
        0

let mutable operation = 10

while operation <> 0 do
    printfn "Выберите операцию:"

    if operation = 10 then
        printfn "1. Сложение"
        printfn "2. Вычитание"
        printfn "3. Произведение"
        printfn "4. Деление"
        printfn "5. Возведение в степень"
        printfn "6. Вычисление квадратного корня"
        printfn "7. Вычисление синуса угла"
        printfn "8. Возведение косинуса угла"
        printfn "9. Возведение тангенса угла"
        printfn "0. Выход"

    operation <- readValidOperation ()
    let result = executeAction operation

    if operation <> 0 then
        printfn "%s" (result.ToString("0.########"))
