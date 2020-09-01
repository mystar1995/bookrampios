import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    BackHandler,
    SafeAreaView,
    StatusBar,
    Platform,
    Keyboard,
    Dimensions,
    FlatList,
    TouchableHighlight
} from 'react-native';

import styles from './styles';
import colors from '../../utils/colors';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';
//== data == 
import { bookByteReaders } from './data';
import Swipeout from 'react-native-swipeout';
import {connect} from 'react-redux';
import config from '../../config/config';
import * as translate from '../../utils/translate';

class FanList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookByteReaders: bookByteReaders,
        };
    }

    render() {
        let {
            bookByteReaders,
        } = this.state
        let swipeoutBtns = [
            {
                text: 'delete',
                backgroundColor: colors.headerColor,
                color: colors.submitColor
            }
        ]

        let {fans,auth} = this.props;
        console.log(fans);
        return (
            // === side bar ===
            <ScalingDrawer
                tapToClose={true}
                minimizeFactor={0.5}
                swipeOffset={10}
                scalingFactor={0.8}
                ref={ref => this._drawer = ref}
                content={auth.role == 'reader'?<SideBar navigation={this.props.navigation} />:<WriterSideBar navigation={this.props.navigation}></WriterSideBar>}
            >
                {/* == Main Container == */}
                <View style={styles.screenContainer}>
                    <StatusBar
                        backgroundColor={colors.circleColor}
                        barStyle="light-content"
                        translucent={false}
                    />

                    {/* === header === */}
                    <ImageBackground
                        style={styles.headerContainer2}
                        source={require('../../assets/icons/main-bg.png')}>
                        <SafeAreaView />
                        <View
                            style={styles.headerContainer} >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.menuIcon}
                                onPress={() => { this._drawer.open() }}
                            >
                                <Image
                                    style={styles.imageStyle}
                                    source={require('../../assets/icons/toggle.png')}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerText}>
                                    {translate.getlang('FanList',auth.user.language)}
                            </Text>
                            </View>
                            <View />
                        </View>
                    </ImageBackground>
                    {/* === main content === */}
                    <View style={styles.mainContainer}>
                        {/* === header Book bytes view === */}
                        <View style={styles.headingView}>
                            <Text style={styles.nameText}>
                                {translate.getlang('Book bytes Readers',auth.user.language)}
                            </Text>
                        </View>
                         {/* === list of  Book bytes Readers === */}
                         <View style={styles.mainList}>
                            <FlatList
                                data={fans}
                                showsHorizontalScrollIndicator={false}
                                extraData={this.state}
                                renderItem={({ item, index }) => {
                                    const _that = this;
                                    return (
                                        <Swipeout style={{ backgroundColor: 'transparent' }} right={swipeoutBtns}
                                        >
                                            <View style={styles.listRowView}>
                                                {/* === Image  === */}
                                                <View style={[styles.reviewerImage]}>
                                                    {
                                                        item.profile_pic == '' ?
                                                            <Text style={[styles.imageStyle,styles.imageText]}>
                                                                {item.username[0].toUpperCase()}
                                                            </Text>
                                                            :
                                                            <Image
                                                                style={styles.imageStyle}
                                                                source={{uri:config.fileurl + item.profile_pic}}
                                                            />
                                                    }
                                                </View>
                                                <View style={styles.remaingView}>
                                                    {/* === Name  === */}
                                                    <View>
                                                        <Text style={styles.nameText}>
                                                            {item.username}
                                                        </Text>
                                                    </View>
                                                    {/* //=== No === */}
                                                    <View >
                                                        <Text style={styles.noText}>
                                                            {item.phone_number}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Swipeout>

                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        {/* === See all view === */}
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <TouchableHighlight
                                activeOpacity={0.8}
                            >
                                <View style = {{flexDirection: 'row'}}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.headingText2}>
                                            {translate.getlang('See All',auth.user.language)}
                                    </Text>
                                    </View>
                                    <Image
                                        style={{ height: 10, width: 10 ,marginLeft : 4, marginTop : 3}}
                                        source={require('../../assets/icons/down-arrow.png')}
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>

                </View>
            </ScalingDrawer>
        );
    }
}


const mapstatetoprops = (state) => ({
    fans:state.auth.fans,
    auth:state.auth
})

export default connect(mapstatetoprops)(FanList);