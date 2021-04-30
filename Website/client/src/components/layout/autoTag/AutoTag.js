import React, { useState } from 'react';
import ReactTags from 'react-tag-autocomplete'
import './style/autoTag.css'

export const AutoTag = ({fileName}) => {
    // const fileroot = '../../../utils/';
    // const filedir = fileroot.concat(fileName);
    // const dataset = require(filedir)
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
    console.log(suggestions)
    const onDelete = (i)  => {
        let newTags = tags.slice(0)
        newTags.splice(i, 1)
        setTags(newTags)
      }
     
    const onAddition = (tag) => {
        let newTags = [].concat(tags, tag)
        setTags(newTags)
      }
     
    return (
          <ReactTags
            ReactTags = {reactRef}
            tags={tags}
            suggestions={suggestions}
            onDelete={onDelete}
            onAddition={onAddition} />
        )
      
}