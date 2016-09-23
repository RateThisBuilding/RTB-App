import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

import { starRendering } from '../renderHelpers'
import Styles from '../styles'

export default class Comment extends Component{
  constructor(props){
    super(props)
    this.state = {
      comment : null
    }
  }

  componentWillMount(){
    this.setState({
      comment: this.props.comment
    })
  }

  render() {
    if (!this.state.comment){
      return (<View></View>)
    }else{
      const { comment } = this.state
      return (
        <View style={ Styles.commentContainer }>
          <Text style={{flex:1}}>{comment.user}</Text>
          <Text style={{flex:0.5}}>{starRendering(comment.rating)}</Text>
          <Text style={[{fontSize: 16, flex:1}, Styles.boldFont]}>{comment.subject}</Text>
          <Text numberOfLines={4} 
            style={{flex:2}}
            adjustsFontSizeToFit={true}>{comment.body}</Text>
          <Text style={{
            position: 'absolute',
            top: 5,
            right: 5,
            alignSelf: 'flex-end'
            }}
          >{comment.date}</Text>
        </View>
      )
    }
  }
}
