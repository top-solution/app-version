const path = require('path')
const { readFileSync, writeFileSync } = require('fs')
const { exec } = require('child_process');

let package = null;
try {
  package = JSON.parse(readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'))
} catch (error) {
  console.error(error)
  process.exit(1)
}

if (!package || !package.hasOwnProperty('name') || !package.hasOwnProperty('version')) {
  console.error('Package JSON parsing error')
  process.exit(1)
}

const { name, version } = package

if (!process.argv[2]) {
  console.error('No source path supplied')
  process.exit(2)
}

const sourcePath = process.argv[2]
const source = readFileSync(sourcePath, 'utf-8')
const magicRegex = /(\s*(const|var|let)\s*info\s*=\s*{\s*\n\s*name\s*:\s*')(.*)('\s*,\n\s*version\s*:\s*')(.*)('\n\s*}\s*\s*)/mi

if (!source.match(magicRegex)) {
  console.error('Can\'t find any pattern to replace')
  process.exit(3)
}

const replaced = source.replace(magicRegex, `$1${name}$4${version}$6`)

writeFileSync(sourcePath, replaced, 'utf-8')

console.log('Version replaced succesfully')

console.log(`git add package.json package-lock.json ${sourcePath}`)
exec(`git add packag*.json yarn*lock ${sourcePath}`, (err, stdout, stderr) => {
  if (err) {
    console.error(err)
    process.exit(5)
  }

  // the *entire* stdout and stderr (buffered)
  console.log(stdout);
  console.log(stderr);


  console.log(`git commit -m "Released version ${version}"`)
  exec(`git commit -m "Released version ${version}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      process.exit(5)
    }

    // the *entire* stdout and stderr (buffered)
    console.log(stdout);
    console.log(stderr);


    console.log(`git tag "v${version}"`)
    exec(`git tag "v${version}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        process.exit(5)
      }

      // the *entire* stdout and stderr (buffered)
      console.log(stdout);
      console.log(stderr);
    })
  })
})
