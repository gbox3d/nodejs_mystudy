import _ from 'lodash'

const items = [
    {no: 3, name: "free", date: "180801"},
    {no: 2, name: "is", date: "180802"},
    {no: 4, name: "forever", date: "180804"},
    {no: 1, name: "web", date: "180804"}
  ]

console.log(_.sortBy(items,'no'))
console.log(_.sortBy(items,['date','name']))