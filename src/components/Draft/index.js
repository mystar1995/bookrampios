import React, { Component } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  Dimensions,
  FlatList,
} from 'react-native';
//=== styles from  parent ===
import styles from '../../containers/WriterDraftScreen/styles';
import {connect} from 'react-redux';
import config from '../../config/config';
import Moment from 'moment';
import * as actiontype from '../../constant/action-type';

class Draft extends Component {
  constructor(props){
    super(props);
    this.state={
      day: 4,
      time: '04:00 PM',
      like: 1,
      share: 0,
    };
  }

  edit = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_DRAFT_CONTENT,token:auth.token,contentid:id,next:this.nextaction});
  }
  
  nextaction = (contentfile) => {
    if(contentfile)
    {
      this.props.navigation.navigate('NewStory');
    }
    else
    {
      this.props.navigation.navigate('WriteNewStory');
    }   
  }

  delete = (contentid) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.DELETE_CONTENT,token:auth.token,contentid:contentid})
  }

	render() { 
    let {
      day,
      time,
      like,
      share
    } = this.state; 

    let {home} = this.props;
    //console.log(content.draft.data[0])
		return (
			<View>
				{/* === submission === */}
				<FlatList
					data={home.draft?home.draft:[]}
					showsHorizontalScrollIndicator={false}
					extraData={this.props}
					renderItem={({item,index}) =>{
            const _that = this;
            
            let createdtime = new Date(item.created_at.split(' ').join('T'));
            let day = Math.floor((Date.now() - createdtime) / 3600000/24);
            console.log(day);
					return(
						<View style={[styles.rowContainer,styles.paddingStyle]}>
							<View style={styles.boxStyle}>
								<Image
									style={styles.imageStyle2}
									source={item.cover_image?{uri:config.fileurl + item.cover_image}:require('../../assets/placeHolder/bookmagic.png')}
								/>
							</View>

							<View style={[styles.rowContainer,styles.rowStyle]}>
								{/* == */}
                <View>
                  {/* === bookName === */}
                  <View style={styles.bookTxtView}>
                    <Text numberOfLines={1} style={styles.bookText}>
                      {item.title}
                    </Text>
                  </View>
                  {/* === reason === */}
                  <View>
                    <Text numberOfLines={1} style={styles.bookText}>
                      {item.description}
                    </Text>
                  </View>
                  {/* === update === */}
                  <View style={[styles.rowContainer,styles.marginStyle]}>
                    <View>
                      <Text style={styles.updateText}>
                        Last update {day} days ago at 
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.timeText}>
                        {Moment(createdtime).format('hh:mm:ss')} 
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.rowContainer,styles.alignCenter]}>
                    {/* === Edit === */}
                    <TouchableOpacity 
                      onPress={()=>{this.edit(item.id)}}
                      activeOpacity={0.8}
                      style={[styles.rowContainer,styles.buttonStyle]}>
                      <View style={styles.iconStyle2}>
                        <Image
                          style={styles.imageStyle}
                          source={require('../../assets/icons/editable.png')}
                        />
                      </View>
                      <View>
                        <Text style={styles.buttonText}>
                          EDIT
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {/* //=== share */}
                    <TouchableOpacity 
                      onPress={()=>{this.delete(item.id)}}
                      activeOpacity={0.8}
                      style={[styles.rowContainer,styles.buttonStyle2]}>
                      <View style={styles.iconStyle2}>
                        <Image
                          style={styles.imageStyle}
                          source={require('../../assets/icons/delete.png')}
                        />
                      </View>
                      <View>
                        <Text style={styles.buttonText}>
                          DELETE
                        </Text>
                      </View>
                    </TouchableOpacity>

                  </View>
                </View>
							</View>
						</View>
					)}}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		);
	}
}

const mapstatetoprops = (state) => ({
  home:state.home,
  auth:state.auth
})

export default connect(mapstatetoprops)(Draft);
