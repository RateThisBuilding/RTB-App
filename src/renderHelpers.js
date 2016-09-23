import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Styles, { COLORS } from './styles'

export function starRendering(rating = 0){
  const starsJSX = [];
  // const stars = Math.floor(parseInt(rating)/10)/2;
  const fullStars = Math.floor(parseInt(rating));
  for (let i = 0; i < fullStars; i++) {
    starsJSX.push(<FontAwesome key={i} size={10} color={COLORS.BLACK} name={'star'} />);
  }
  if (5 - fullStars == 0.5){
    starsJSX.push(<FontAwesome key={starsJSX.length} size={10} color={COLORS.BLACK} name={'star-half-o'} />)
  }
  for (let i = starsJSX.length; i < 5; i++ ){
    starsJSX.push(<FontAwesome key={i} size={10} color={COLORS.BLACK} name={'star-o'} />)
  }
  return starsJSX;
}
