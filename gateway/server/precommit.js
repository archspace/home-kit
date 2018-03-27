const child_process = require('child_process')
const path = require('path')
const srcDir = process.env.srcDir
const gitPath = process.env.gitPath

let exitCode = 0

const toError = stdout => {
  const error = stdout.toString('utf8')
  if (error.length > 0) {
    console.log(error)
    exitCode = 1
  }
}

const getChangedFiles = () => {
  let changedFiles = null

  try {
    const gitDir = path.join(__dirname, gitPath, '.git'), workTree = path.join(__dirname, gitPath)
    const str = child_process.execSync('git --git-dir ' + gitDir + ' --work-tree ' + workTree + ' diff-index --name-only HEAD | grep \'.js$\'').toString('utf8')
    changedFiles = str.split(/(\r?\n)/g).filter(line => !(line === '\n' || line === '\r' || line.length < 1))
      .filter((path) => path.startsWith(srcDir))
      .map((path)=>{
        return path.replace(srcDir, '')
      })
  } catch (e) {
    toError(e.stdout)
  }

  return changedFiles
}

const lintFiles = files => {
  if (files) {
    files.forEach(file => {
      if (path.extname(file) !== '.js') {
        return
      }
      try {
        child_process.execSync(`${path.join(__dirname, 'node_modules/.bin/eslint')} --fix ${file}`).toString('utf8')
      } catch (e) {
        toError(e.stdout)
      }
    })
  }
}

const changedFiles = getChangedFiles()
lintFiles(changedFiles)

process.exit(exitCode)