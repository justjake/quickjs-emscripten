Original code is located at `master` branch

# Installation
## Ubuntu
- `sudo apt-get install -y build-essential gcc-multilib`
- `cd {/YOUR/PATH/TO/}QuickJS`
- `make`

# Getting Started
## compile js to binary
create a hello\_world1.js javascript file
```javascript
console.log('hello world')
```
goto command line and type
```bash
> ./qjsc -o hello_world1 ./hello_world1.js
> ./hello_world
> hello world
```

## compile js with module to binary
create a hello\_world2.js javascript file
```javascript
import * as std from 'std'
console.log(std.getenv('hello'))
```
goto command line and type
```bash
> ./qjsc -o hello_world2 ./hello_world2.js
> SyntaxError: unsupported keyword: import
> ./qjsc -m -o hello_world2 ./hello_world2.js
> hello="hello world 2" ./hello_world2
> hello world 2
```

# known issues
- doesn't support Blob
- doesn't support WebWorker

# fun facts
- compiled executable of `qjsc` does not has speed advantage compared with interpreting script with `qjs`

test it yourself
 ```
 # run benchmark with interpretor
 ./qjs tests/microbench
 
 # run benchmark with compiler
 ./qjsc -o microbench tests/microbench
 ./microbench
 ```
