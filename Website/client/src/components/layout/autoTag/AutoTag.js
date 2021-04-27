import React, { useState, useEffect } from 'react';
import ReactTags from 'react-tag-autocomplete'
import './style/autoTag.css'

export const AutoTag = ({fileName, onChange, value, name}) => {
  useEffect(() => {
    initializeTags(value)
  }, [value]);
    const subjects = require('../../../utils/subjects.json')
    const languages = require('../../../utils/languages.json')
    var dataset = [];
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
    
    
    const [suggestions] = useState(dataset)
    const [tags, setTags] = useState([])

    const reactRef = React.createRef()
    const onDelete = (i)  => {
        let newTags = tags.slice(0)
        newTags.splice(i, 1)
        setTags(newTags)
        parseValue(newTags, onChange)
      }
     
    const onAddition = (tag) => {
        let newTags = [].concat(tags, tag)
        setTags(newTags)
        parseValue(newTags, onChange)
      }

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