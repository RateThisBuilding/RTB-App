import Geocoder from 'react-native-geocoder'
import _ from 'underscore'

export function searchWithoutAddress(category, location, page, callback){
  fetch(`http://ratethisbuilding.com/api/buildings-search/${category}/*/${location}?page=${page-1}`)
  .then(response => response.json())
  .then(responseJSON => {
    if(responseJSON.data.length === 0){
      callback([], {allLoaded: true})
    }else{
      callback(_.groupBy(responseJSON.data, building => building.location))
    }
  })
}
export function search(category, address, location, page, callback){
  Geocoder.geocodeAddress(address).then(res => {
    const coords = res[0].position
    fetch(`http://ratethisbuilding.com/api/buildings-search/${category}/${coords.lat},${coords.lng}/${location}?page=${page-1}`)
    .then(response => response.json())
    .then(responseJSON => {
      if(responseJSON.data.length === 0){
        callback([], {allLoaded: true})
      }else{
        callback(_.groupBy(responseJSON.data, building => building.location))
      }
    })
  })
  .catch((err)=>{console.error(err);});
}

export function standard(page,callback){
  fetch(`http://ratethisbuilding.com/api/buildings?page=${page - 1}`)
  .then((response)=> response.json())
  .then((responseJSON)=> {
    if(responseJSON.data.length === 0){
      callback([], {allLoaded: true})
    }else{
      callback(_.groupBy(responseJSON.data, building => building.location))
    }
  })
  .catch((err)=>{console.error(err);});
}
