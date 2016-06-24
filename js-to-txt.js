// This program converts all the .js files in the current directory to
// .txt files so that you can send them over Facebook chat.
// If you want to convert the .txt files back to .js files, add the 
// --txt-to-js argument.

var fs = require('fs')
var readline = require('readline')
var programFilename = process.argv[1].match(/[\/\\]([^\/\\]+)$/)[1]
var extensionRegex = /(\.[^\.]+)$/
var toJS = process.argv.indexOf('--txt-to-js') >= 0
var [fromExtension, toExtension] = toJS ? ['.txt', '.js'] : ['.js', '.txt']

var isFileType = type => filename => {
  var match
  var extension = (match = filename.match(extensionRegex)) && match[1]
  return extension === type && filename !== programFilename
}

var filenames = fs.readdirSync('.').filter(isFileType(fromExtension))

if (filenames.length > 0) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(`Files: ${filenames.join('\n       ')}\nConverting these files from ${fromExtension} to ${toExtension}. Is that okay? (y/n) `, answer => {
    if (answer.trim()[0].toLowerCase() === 'y') {
      console.log(`Converting ${fromExtension} files to ${toExtension} files...`)
      filenames.forEach(filename => 
        fs.renameSync(filename, filename.replace(extensionRegex, toExtension)))
      console.log('Done converting files!')
    } else {
      console.log('Not converting any files.')
    }
    rl.close()
  })
} else {
  console.log(`No ${fromExtension} files to convert in your current directory.\n` +
    (toExtension === '.txt' ? 
      'If you want to convert .txt files to .js files, use the --txt-to-js argument.' :
      'If you want to convert .js files to .txt files, omit the --txt-to-js argument.'))
}
