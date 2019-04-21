//cwd current working directory 当前工作目录

console.log(process.cwd())
console.log(__dirname)
//change directory 改变当前目录
process.chdir("..");
console.log(process.cwd())
console.log(__dirname)