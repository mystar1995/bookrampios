import React from 'react';
import { 
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
 } from 'react-native';
import styles from './styles';
import {AirbnbRating} from 'react-native-elements';

export default function Pop1(props) {
  return (
    <View style={styles.popContainer}>
      {/* === Rating  === */}
      <View style={styles.ratingContainer}>
        <AirbnbRating
          defaultRating={props.rating}
          selectedColor={colors.yellowColorfd}
          size={30}
          fractions={true}
          onFinishRating={(rating)=>{props.handleRating(rating)}}
          showRating={false}
          starStyle={styles.starStyles}
        />
      </View>
      {/* //=== heading text === */}
      <View style={styles.textView}>
        <Text style={styles.headingText}>
          How do you like the book?
        </Text>
      </View>
      {/* === list  === */}
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.optionText}>
            Enteraining
          </Text>
        </View>
        <View style={styles.rowContainer2}>
          {/* //===like === */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>props.handleLike({
              entertain: 1
            })} 
            style={styles.feedbackIcon}>
            {props.entertain===1?
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumb-a.png')}
              />
            :
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumblikeIn.png')}
              />
            }
          </TouchableOpacity>
          {/* //===dislike === */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>props.handleLike({
              entertain: 0
            })} 
            style={{...styles.feedbackIcon,marginLeft: 10}}>
            {props.entertain===0?
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumbdislikeIn-a.png')}
              />
            :
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumbdislikeIn.png')}
              />
            }
          </TouchableOpacity>
        </View>
      </View>
      {/* === list2  === */}
      <View style={{...styles.rowContainer,marginTop: 0}}>
        <View>
          <Text style={styles.optionText}>
            Gripping
          </Text>
        </View>
        <View style={styles.rowContainer2}>
          {/* //===like === */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>props.handleLike({
              gripping: 1
            })} 
            style={styles.feedbackIcon}>
            {props.gripping===1?
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumb-a.png')}
              />
            :
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumblikeIn.png')}
              />
            }
          </TouchableOpacity>
          {/* //===dislike === */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>props.handleLike({
              gripping: 0
            })} 
            style={{...styles.feedbackIcon,marginLeft: 10}}>
            {props.gripping===0?
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumbdislikeIn-a.png')}
              />
            :
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumbdislikeIn.png')}
              />
            }
          </TouchableOpacity>
        </View>
      </View>
      {/* === list 3 === */}
      <View style={{...styles.rowContainer,marginTop: 0}}>
        <View>
          <Text style={styles.optionText}>
            Insightful
          </Text>
        </View>
        <View style={styles.rowContainer2}>
          {/* //===like === */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>props.handleLike({
              insightful: 1
            })} 
            style={styles.feedbackIcon}>
            {props.insightful===1?
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumb-a.png')}
              />
            :
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumblikeIn.png')}
              />
            }
          </TouchableOpacity>
          {/* //===dislike === */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>props.handleLike({
              insightful: 0
            })} 
            style={{...styles.feedbackIcon,marginLeft: 10}}>
            {props.insightful===0?
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumbdislikeIn-a.png')}
              />
            :
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumbdislikeIn.png')}
              />
            }
          </TouchableOpacity>
        </View>
      </View>
      {/* === list 4 === */}
      <View style={{...styles.rowContainer,marginTop: 0}}>
        <View>
          <Text style={styles.optionText}>
            Time - Pass
          </Text>
        </View>
        <View style={styles.rowContainer2}>
          {/* //===like === */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>props.handleLike({
              timepass: 1
            })} 
            style={styles.feedbackIcon}>
            {props.timepass===1?
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumb-a.png')}
              />
            :
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumblikeIn.png')}
              />
            }
          </TouchableOpacity>
          {/* //===dislike === */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>props.handleLike({
              timepass: 0
            })} 
            style={{...styles.feedbackIcon,marginLeft: 10}}>
            {props.timepass===0?
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumbdislikeIn-a.png')}
              />
            :
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/thumbdislikeIn.png')}
              />
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
