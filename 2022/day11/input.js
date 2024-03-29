const input = `Monkey 0:
Starting items: 56, 56, 92, 65, 71, 61, 79
Operation: new = old * 7
Test: divisible by 3
  If true: throw to monkey 3
  If false: throw to monkey 7

Monkey 1:
Starting items: 61, 85
Operation: new = old + 5
Test: divisible by 11
  If true: throw to monkey 6
  If false: throw to monkey 4

Monkey 2:
Starting items: 54, 96, 82, 78, 69
Operation: new = old * old
Test: divisible by 7
  If true: throw to monkey 0
  If false: throw to monkey 7

Monkey 3:
Starting items: 57, 59, 65, 95
Operation: new = old + 4
Test: divisible by 2
  If true: throw to monkey 5
  If false: throw to monkey 1

Monkey 4:
Starting items: 62, 67, 80
Operation: new = old * 17
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 6

Monkey 5:
Starting items: 91
Operation: new = old + 7
Test: divisible by 5
  If true: throw to monkey 1
  If false: throw to monkey 4

Monkey 6:
Starting items: 79, 83, 64, 52, 77, 56, 63, 92
Operation: new = old + 6
Test: divisible by 17
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 7:
Starting items: 50, 97, 76, 96, 80, 56
Operation: new = old + 3
Test: divisible by 13
  If true: throw to monkey 3
  If false: throw to monkey 5`
module.exports = input.split('\n');
