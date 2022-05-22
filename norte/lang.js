const fs=require("fs")
const shell=require("child_process")
const rl=require("readline")

const file=fs.readFileSync(process.argv[2],"utf8")
var lfs=file.split(/[\n ]+/g)
var stack=[]

for (let i=0;i<lfs.length;i++) {
  if (lfs[i]!='') {
    lfs[i]=lfs[i].replace(/\r/g,"")
  } else {
    lfs.pop()
  }
}

var vars=[]


for (let x=0;x<lfs.length;x++) {
  if (lfs[x]=="LogLine") {
    console.log(lfs[x-1].replace(/#S#/g," "))
  } else if (lfs[x]=="StackPush") {
    stack.push(lfs[x-1])
  } else if (lfs[x]=="StackRead") {
    lfs[x]=stack[Number(lfs[x-1])]
    lfs[x-1]=lfs[x]
  } else if (lfs[x]=="StackSize") {
    lfs[x]=stack.length
  } else if (lfs[x]=="StackPop") {
    lfs[x]=stack.pop()
  } else if (lfs[x]=="ChangeValueOfVariable") {
    for (let t=0;t<vars.length;t++) {
      var b = vars[t].split(/ /g)
      if (v[0]==lfs[x-1]) {
        v[1]=lfs[x-2]
        vars[t]=v[0]+" "+v[1]
      }
    }
  } else if (lfs[x]=="Random") {
    lfs[x]=Math.random()
  } else if (lfs[x]=="tostrRadix") {
    lfs[x]=lfs[x-2].toString(Number(lfs[x-1]))
    lfs[x-1]=lfs[x]
    lfs[x-2]=lfs[x]
  } else if (lfs[x]=="Slice") {
    lfs[x]=lfs[x-2].slice(Number(lfs[x-1]))
    lfs[x-1]=lfs[x]
    lfs[x-2]=lfs[x]
  } else if (lfs[x]=="GoTo") {
    x=Number(lfs[x+1])
  } else if (lfs[x]=="IfTrueGoTo") {
    if (lfs[x-1]==">") {
      if (Number(lfs[x-3])>Number(lfs[x-2])==true) {
        x=Number(lfs[x+1])
      }
    } else if (lfs[x-1]=="!=") {
      if (lfs[x-3]!=lfs[x-2]==true) {
        x=Number(lfs[x+1])
      }
    } else if (lfs[x - 1] == "==") {
      if (lfs[x - 3] == lfs[x - 2] == true) {
        x = Number(lfs[x + 1])
      }
    } else if (lfs[x - 1] == "<") {
      if (Number(lfs[x - 3]) < Number(lfs[x - 2])==true) {
        x = Number(lfs[x + 1])
      }
    }
  } else if (lfs[x]=="IfFalseGoTo") {
    if (lfs[x-1]==">") {
      if (Number(lfs[x-3])>Number(lfs[x-2])==false) {
        x=Number(lfs[x+1])
      }
    } else if (lfs[x-1]=="!=") {
      if (lfs[x-3]!=lfs[x-2]==false) {
        x=Number(lfs[x+1])
      }
    } else if (lfs[x-1]=="==") {
      if (lfs[x-3]==lfs[x-2]==false) {
        x=Number(lfs[x+1])
      }
    } else if (lfs[x-1]=="<") {
      if (Number(lfs[x-3]) < Number(lfs[x-2])==false) {
        x=Number(lfs[x+1])
      }
    }
  } else if (lfs[x]=="Exit") {
    process.exit()
  } else if (lfs[x]=="ARGV") {
    lfs[x]=process.argv[Number(lfs[x-1])]
    lfs[x-1]=lfs[x]
  } else if (lfs[x]=="Platform") {
    lfs[x]=process.platform
  } else if (lfs[x]=="EnvShellLevel") {
    lfs[x]=process.env.SHLVL
  } else if (lfs[x]=="Sleep") {
    shell.execSync(`ruby norte/sleep.rb ${Number(lfs[x+1])}`);
  } else if (lfs[x]=="+") {
    lfs[x]=Number(lfs[x-2])+Number(lfs[x-1])
    lfs[x-1]=lfs[x]
    lfs[x-2]=lfs[x]
  } else if (lfs[x]=="-") {
    lfs[x]=Number(lfs[x-2])-Number(lfs[x-1])
    lfs[x-1]=lfs[x]
    lfs[x-2]=lfs[x]
  } else if (lfs[x] == "*") {
    lfs[x] = Number(lfs[x - 2]) * Number(lfs[x - 1])
    lfs[x - 1] = lfs[x]
    lfs[x - 2] = lfs[x]
  } else if (lfs[x] == "/") {
    lfs[x] = Number(lfs[x - 2]) / Number(lfs[x - 1])
    lfs[x - 1] = lfs[x]
    lfs[x - 2] = lfs[x]
  } else if (lfs[x]=="tostr") {
    lfs[x]=lfs[x-1].toString()
  } else if (lfs[x]=="=") {
    vars.push(lfs[x-1].replace(/,/g, "")+" "+lfs[x-2])
  } else if (lfs[x]=="valueof") {
    for (let n=0;n<vars.length;n++) {
      var v = vars[n].split(/ /g)
      if (v[0]==lfs[x-1]) {
        lfs[x]=v[1]
      }
    }
  }
}



