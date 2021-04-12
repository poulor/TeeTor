import React, { Fragment, useState } from 'react';
import ReactTags from 'react-tag-autocomplete'


export const AutoTag = ({fileName}) => {
    // const fileroot = '../../../utils/';
    // const filedir = fileroot.concat(fileName);
    // const dataset = require(filedir)
    const dataset = require('../../../utils/subjects.json')

    const [suggestions, setSuggestions] = useState([dataset])
    const [tags, setTags] = useState([])
    const reactRef = React.createRef()

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