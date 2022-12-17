const inputStrng = require('./input');
const normailiseInput = () => {
    const monkeys = inputStrng.reduce((acc, curr) => {
        if(curr === ""){
            acc.push([])
        }else{
            acc[acc.length-1].push(curr)
        }
        return acc;

    }, [[]])
    const config = [];
    for(const monkey of monkeys){
        const rules = {}
        rules.number = Number(monkey[0].split(" ")[1].replace(":", ""));
        rules.items = monkey[1].split(":")[1].split(",").map(el => Number(el));
        rules.operationLogic = monkey[2].split("=")[1].trim();
        rules.testConfig = {
            divisibleBy:  Number(monkey[3].split(": ")[1].replace("divisible by ", "")),
            condition_true:  Number(monkey[4].split("monkey ")[1]),
            condition_false:  Number(monkey[5].split("monkey ")[1]),
        }
        config.push(rules)
    }
    return config;
}
const input = normailiseInput();


const OPERATIONS = {
    "*": (a, b) => a * b,
    "+": (a,b) => a + b,
}
class Monkey {
    constructor(items = [], operationLogic, testConfig){
        this.items = items,
        this.nextItems = []
        this.inspectedCount = 0;
        this.operationLogic = operationLogic;
        this.testConfig = testConfig
    }

    inspectItems(divisor){
        const resultMapping = [];
        this.items.forEach((firstParam) => {
            this.inspectedCount++;

            const [, operation, unit] = this.operationLogic.split(" ");
            const secondParam = unit === "old" ? firstParam : Number(unit);
            const result =OPERATIONS[operation](firstParam, secondParam)
            if(divisor){
                const cond = result % divisor;
                resultMapping.push({
                    monkeyIndex: cond % this.testConfig.divisibleBy === 0 ? this.testConfig.condition_true: this.testConfig.condition_false,
                    val: cond
                })
            }else{
                const cond = Math.ceil(result / 3);
                resultMapping.push({
                    monkeyIndex: cond % this.testConfig.divisibleBy === 0 ? this.testConfig.condition_true: this.testConfig.condition_false,
                    val: result
                })
            }
            
        })

        return resultMapping
    }

    moveItemToAnotherMonkey(val){
        this.addItem(val);
    }

    addItem(item){
        this.items.push(item);
    }

    removeItem(){
        this.items.shift()
    }

}

const part1 = () => {
    const monkeys = []
    for(const monkey of input){
        monkeys.push(new Monkey(monkey.items, monkey.operationLogic, monkey.testConfig));
    }

    for(let i=0; i<20; i++){
        for(const monkey of monkeys){
            const results = monkey.inspectItems();
            for(  let j =0; j< results.length; j++){
                const result = results[j];
                monkeys[result.monkeyIndex].addItem(result.val)
                monkey.removeItem()
            }
        }
    }
    const sortedMonkeys = monkeys.sort((a,b) => b.inspectedCount - a.inspectedCount)
    return sortedMonkeys[0].inspectedCount * sortedMonkeys[1].inspectedCount
}


const part2 = () => {
    const monkeys = []
    for(const monkey of input){
        monkeys.push(new Monkey(monkey.items, monkey.operationLogic, monkey.testConfig));
    }
    const divisor = monkeys.map((m) => m.testConfig.divisibleBy).reduce((a, b) => a * b, 1);

    for(let i=0; i<10000; i++){
        for(const monkey of monkeys){
            const results = monkey.inspectItems(divisor);
            for(  let j =0; j< results.length; j++){
                const result = results[j];
                monkeys[result.monkeyIndex].addItem(result.val)
                monkey.removeItem()
            }
        }
    }
    const sortedMonkeys = monkeys.sort((a,b) => b.inspectedCount - a.inspectedCount)
    return sortedMonkeys[0].inspectedCount * sortedMonkeys[1].inspectedCount
}

// console.log(part1());

console.log(part2());