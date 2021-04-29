//Input json file
const languages = require('./languages.json');
const parseLanguages = (languages, tagId, tags) => {
let newTags = tags
Object.keys(languages).map(abbreviation => {
    languageNames = languages[abbreviation].name
    languageNames = languageNames.split(';')
    for (language of languageNames){
        newTags = newTags.concat({id: tagId, name: language})
        tagId += 1
    }
})
console.log(JSON.stringify(newTags, null, '\t'))
return tagId

}

const tags = []
const tagId = 500

parseLanguages(languages,tagId,tags)

//command to run
//node script-file.js > log-fill node parseJson.js -> gen.json