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

import { others, bookByteReaders } from './data';
import Swipeout from 'react-native-swipeout';

import styles from './styles';
import colors from '../../utils/colors';
const ScreenWidth = Math.round(Dimensions.get('window').width);
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';

class MyFriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            others: others,
            bookByteReaders: bookByteReaders,

        };
    }

    render() {
        let {
            others,
            bookByteReaders,
        } = this.state

        let {auth} = this.props;

        let swipeoutBtns = [
            {
                text: 'delete',
                backgroundColor: colors.headerColor,
                color: colors.submitColor
            }
        ]
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
                                    My Friend list
                                </Text>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.plusIcon}
                                onPress={()=>{this.setState({isModalOpen: true})}}
                            >
                                <Image
                                    style={styles.imageStyle}
                                    source={require('../../assets/icons/plusCircle.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    {/* === main content === */}
                    <View style={styles.mainContainer}>
                        {/* === header Book bytes view === */}
                        <View style={[styles.headingView , {paddingBottom : 16}]}>
                            <Text style={styles.nameText}>
                                Book bytes Readers
                        </Text>
                            <TouchableHighlight
                                activeOpacity={0.8}
                            >
                                <View style={styles.textContainer}>
                                    <Text style={styles.headingText2}>
                                        Add New
                                </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        {/* === list of  Book bytes Readers === */}
                        <View style={styles.mainList}>
                            <FlatList
                                data={bookByteReaders}
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
                                                        item.imageUrl == null ?
                                                            <Text style={[styles.imageStyle,styles.imageText]}>
                                                                {item.name[0].toUpperCase()}
                                                            </Text>
                                                            :
                                                            <Image
                                                                style={styles.imageStyle}
                                                                source={item.imageUrl}
                                                            />
                                                    }
                                                </View>
                                                <View style={styles.remaingView}>
                                                    {/* === Name  === */}
                                                    <View>
                                                        <Text style={styles.nameText}>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    {/* //=== No === */}
                                                    <View >
                                                        <Text style={styles.noText}>
                                                            {item.pk}
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
                                            See All
                                    </Text>
                                    </View>
                                    <Image
                                        style={{ height: 10, width: 10 ,marginLeft : 4, marginTop : 3}}
                                        source={require('../../assets/icons/down-arrow.png')}
                                    />
                                </View>

                            </TouchableHighlight>
                        </View>
                        {/* === header others view === */}
                        <View style={styles.headingView}>
                            <Text style={styles.nameText}>
                                Others
                        </Text>
                        </View>

                        {/* === list of Others === */}
                        <View style={styles.secondList}>
                            <FlatList
                                data={others}
                                showsHorizontalScrollIndicator={false}
                                extraData={this.state}
                                renderItem={({ item, index }) => {
                                    const _that = this;
                                    return (
                                        <View style={styles.listRowView}>
                                            {/* === Image  === */}
                                            <View style={styles.reviewerImage}>
                                                <Image
                                                    style={styles.imageStyle}
                                                    source={item.imageUrl}
                                                />
                                            </View>
                                            <View style={styles.remaingView}>
                                                {/* === Email  === */}
                                                <View>
                                                    <Text style={styles.nameText}>
                                                        {item.email}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>

                    </View>
                    <Modal 
                        isVisible={this.state.isModalOpen}
                        onBackdropPress={()=>this.setState({
                        isModalOpen: false,
                        })}
                        backdropColor={colors.circleColor}
                        backdropOpacity={0.7}
                    >
                        {/* ===  Write a new book === */}
                        <View style={styles.viewContainer}>
                        <TouchableOpacity
                            onPress={()=>{
                            this.setState({
                                isModalOpen: false,
                            })
                            this.props.navigation.navigate('WriteNewStory')
                            }}
                            activeOpacity={0.8} 
                            style={styles.modalButton}>
                            <Text style={styles.modalText}>
                            Write a new book
                            </Text>
                        </TouchableOpacity>
                        {/* //==== Upload a book === */}
                        <TouchableOpacity
                            onPress={()=>{
                            this.setState({
                                isModalOpen: false,
                            })
                            this.props.navigation.navigate('NewStory')
                            }}
                            activeOpacity={0.8} 
                            style={{...styles.modalButton,borderBottomWidth: 0,}}>
                            <Text style={styles.modalText}>
                            Upload a book
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </Modal>
                </View>

            </ScalingDrawer>

        );
    }
}

export default MyFriendList;
