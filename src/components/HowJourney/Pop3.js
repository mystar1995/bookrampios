import React from 'react';
import { 
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard
 } from 'react-native';
import styles from './styles';
import {AirbnbRating} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default function Pop3(props) {
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
          About this author(Optional)?
        </Text>
      </View>
      {/* //=== input containers === */}
      <LinearGradient 
        start={{x: 1.0, y: 1.0}} end={{x: 1.0, y: 0.1}}
        style={styles.gradientStyle}
        colors={[
          colors.borderColor,
          colors.borderColor,
          colors.borderColor,
          colors.inputGradient
        ]}>
        <View style={styles.inputField}>
          <TextInput
            underlineColorAndroid={'transparent'}
            placeholder={'About the author'}
            placeholderTextColor={colors.placeholderColor}
            autoCorrect={false}
            autoCapitalize={'none'}
            blurOnSubmit={true}
            multiline={true}
            textAlignVertical="top"
            returnKeyType={'done'}
            value={props.value}
            onSubmitEditing={()=>{Keyboard.dismiss()}}
            onChangeText={props.onTextChange}
            style={styles.inputStyle}/> 
        </View>
      </LinearGradient>
    </View>
  );
}
