import React, { useState, useEffect } from 'react';
import ReactTags from 'react-tag-autocomplete'
import './style/autoTag.css'

export const AutoTag = ({fileName, onChange, value, name}) => {

  /*
  useEffect runs whenever the parent rerenders and the value (which is given by the parent) has chaged.
  */
  useEffect(() => {
    initializeTags(value)
  }, [value]);

    const subjects = require('../../../utils/subjects.json')
    const languages = require('../../../utils/languages.json')
    var dataset = [];

    // determine what suggestions to get based on the filename
    switch(fileName) {
      case 'subjects':
        dataset = subjects;
        break;
      case 'languages':
        dataset = languages;
        break;
      default:
        dataset = [...languages, ...subjects]
    }
    
    //The suggestions. These will be all the items in the json since we want them all to potentially be suggested
    const [suggestions] = useState(dataset)

    //The current tags (square buttons) that the user will see initially.
    const [tags, setTags] = useState([])

    const reactRef = React.createRef()
    
    /*
      Every time a tag is deleted,
      parse the tags into strings
      */
    const onDelete = (i)  => {
        let newTags = tags.slice(0)
        newTags.splice(i, 1)
        setTags(newTags)
        parseValue(newTags, onChange)
      }
     
      /*
      Every time a tag is added,
      parse the tags into strings
      */
    const onAddition = (tag) => {
        let newTags = [].concat(tags, tag)
        setTags(newTags)
        parseValue(newTags, onChange)
      }

    /*
      Takes a string value, splits it, and tries to fetch a teg based off of each split word.
    */
    const initializeTags = (value) => {
      value = value.trim()
      const valuesList = value.split(',')
      const tagList = []
      for (const word of valuesList) {
        for (const tag of suggestions) {
          if (tag.name === word){
            tagList.push(tag)
          } 
        }
      }
      setTags(tagList) 
    }

    /*
      Opposite of initializeTags above. Takes tags and creates a string out of them. This string is the 'new value' which is given to the parent.'
    */
    const parseValue = (tags) => {
      const tagNames = []
      for (const tag of tags){
        tagNames.push(tag.name)
      }
      const newValue = tagNames.join(',')
      console.log(newValue)
      onChange(name, newValue)
    }

    return (
          <ReactTags
            ReactTags = {reactRef}
            tags={tags}
            suggestions={suggestions}
            onDelete={onDelete}
            onAddition={onAddition}
            placeholderText= "" />
        )
      
}