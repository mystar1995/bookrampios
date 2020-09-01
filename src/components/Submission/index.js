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

class Submission extends Component {
  constructor(props){
    super(props);
    this.state={
      day: 4,
      time: '04:00 PM',
      like: 1,
      share: 0,
    };
  }
	render() { 
    let {
      day,
      time,
      like,
      share
    } = this.state; 

    const {home} = this.props;
    
		return (
			<View>
				{/* === submission === */}
				<FlatList
					data={home.published?home.published:[]}
					showsHorizontalScrollIndicator={false}
					extraData={this.props}
					renderItem={({item,index}) =>{
            const _that = this;
            let createdtime = new Date(item.created_at.split(' ').join('T'));
            let day = Math.floor((Date.now() - createdtime) / 3600000/24);
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
                    <Text numberOfLines={1} style={styles.bookDesc}>
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
                        {time} 
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.rowContainer,styles.alignCenter]}>
                    {/* === like === */}
                    <View style={styles.iconStyle2}>
                      <Image
                        style={styles.imageStyle}
                        source={require('../../assets/icons/heart-circle.png')}
                      />
                    </View>
                    <View>
                      <Text style={styles.countText}>
                        {like}
                      </Text>
                    </View>
                    {/* //=== share */}
                    <View style={{...styles.iconStyle3,marginLeft: 20}}>
                      <Image
                        style={styles.imageStyle}
                        source={require('../../assets/icons/comment.png')}
                      />
                    </View>
                    <View>
                      <Text style={styles.countText}>
                        {like}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.iconStyle}
                  //onPress={()=>}
                >
                  <Image
                    style={styles.imageStyle}
                    source={item.status=='PUBLISHED'? 
                      require('../../assets/icons/verified.png')
                      : require('../../assets/icons/danger.png')
                    }
                  />
                </TouchableOpacity>
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
  home:state.home
})

export default connect(mapstatetoprops)(Submission);