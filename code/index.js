const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout

})

readline.question('what is your name???\r\n', name=>{
  console.log(`hi ${name}`)
  readline.close()
})

//除了自身的readline进行交互式，还可以用第三方库，inquirer 插件，进行交互，不仅可以文案的交互，还可以有单选框等等。。。。