import React, { Component } from 'react';
import { View } from 'react-native';
//=== navigation ===
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//== splash ===
import SplashScreen from '../containers/SplashScreen';
import LanguageScreen from '../containers/LanguageScreen';
// === Main Screens ===
import AuthorInfoScreen from '../containers/AuthorInfoScreen';
import BookDetailScreen from '../containers/BookDetailScreen';
import DownloadScreen from '../containers/DownloadScreen';
import HowJounreyScreen from '../containers/HowJounreyScreen';
import MyAccountScreen from '../containers/MyAccountScreen';
import MyBookmarksScreen from '../containers/MyBookmarksScreen';
import BookmarkScreen from '../containers/BookmarkScreen';
import PreferredBooksScreen from '../containers/PreferredBooksScreen';
import CategoriesScreen from '../containers/CategoriesScreen';
import MyWishlistScreen from '../containers/MyWishlistScreen';
import MyRewardsScreen from '../containers/MyRewardsScreen';
import RewardsHistoryScreen from '../containers/RewardsHistoryScreen';
import ReviewScreen from '../containers/ReviewScreen';
import PaymentScreen from '../containers/PaymentScreen';
import MyFriendList from '../containers/MyFriendList';
//== add new story ====
import WriteNewStoryScreen from '../containers/WriteNewStoryScreen';
import WriterAccountScreen from '../containers/WriterAccountScreen';
import WriterMyBookScreen from '../containers/WriterMyBookScreen';
import NewStoryScreen from '../containers/NewStoryScreen';
//=== support ===
import NotificationScreen from '../containers/NotificationScreen';
import SuportCenterScreen from '../containers/SuportCenterScreen';
import PhoneSupportScreen from '../containers/PhoneSupportScreen';
import EmailSupportScreen from '../containers/EmailSupportScreen';
//=== auth screens ===
import LoginScreen from '../containers/authScreens/LoginScreen';
import SignupScreen from '../containers/authScreens/SignupScreen';
import ForgetPasswordScreen from '../containers/authScreens/ForgetPasswordScreen';
//==== ====
import ReaderMainScreen from '../containers/ReaderMainHomeScreen';//Tab Bar Screen
import WriterMainScreen from '../containers/WriterMainHomeScreen';//Tab Bar Screen
import FanList from '../containers/FanListScreen';
import ReadBook from '../containers/ReadBook';
import DocumentWriting from '../containers/DocumentWritingScreen';
import VerifyScreen from '../containers/authScreens/VerifyScreen';
import MyBookInReview from '../containers/MyBooksInReview';
import WriterRewardScreen from '../containers/WriterRewardScreen';

//== stack ===
const Stack = createStackNavigator();

class Navigations extends Component {
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
						gestureEnabled: false,
						lazy: true
					}}>
					
					<Stack.Screen
						name="Splash"
						component={SplashScreen}
					/>
					<Stack.Screen
						name="ReaderMain"
						component={ReaderMainScreen}
					/>
					<Stack.Screen
						name="WriterMain"
						component={WriterMainScreen}
					/>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
					/>
					<Stack.Screen
						name="Signup"
						component={SignupScreen}
					/>
					<Stack.Screen
						name="ForgetPassword"
						component={ForgetPasswordScreen}
					/>
					<Stack.Screen
						name="Language"
						component={LanguageScreen}
					/>
					<Stack.Screen
						name="MyFriendList"
						component={MyFriendList}
					/>
					<Stack.Screen
						name="FanList"
						component={FanList}
					/>
					<Stack.Screen
						name="Notification"
						component={NotificationScreen}
					/>
					<Stack.Screen
						name="SuportCenter"
						component={SuportCenterScreen}
					/>
					<Stack.Screen
						name="Download"
						component={DownloadScreen}
					/>
					<Stack.Screen
						name="MyAccount"
						component={MyAccountScreen}
					/>
					<Stack.Screen
						name="ReadBook"
						component={ReadBook}
					/>
					<Stack.Screen
						name="WriterAccount"
						component={WriterAccountScreen}
					/>
					<Stack.Screen
						name="WriterMyBook"
						component={WriterMyBookScreen}
					/>
					<Stack.Screen
						name="MyBookmarks"
						component={MyBookmarksScreen}
					/>
					<Stack.Screen
						name="Bookmark"
						component={BookmarkScreen}
					/>
					<Stack.Screen
						name="AuthorInfo"
						component={AuthorInfoScreen}
					/>
					<Stack.Screen
						name="BookDetails"
						component={BookDetailScreen}
					/>
					<Stack.Screen
						name="PreferredBooks"
						component={PreferredBooksScreen}
					/>
					<Stack.Screen
						name="Review"
						component={ReviewScreen}
					/>
					<Stack.Screen
						name="Category"
						component={CategoriesScreen}
					/>

					<Stack.Screen
						name="MyWish"
						component={MyWishlistScreen}
					/>
					<Stack.Screen
						name="MyRewards"
						component={MyRewardsScreen}
					/>
					<Stack.Screen
						name="RewardsHistory"
						component={RewardsHistoryScreen}
					/>
					<Stack.Screen
						name="Payment"
						component={PaymentScreen}
					/>
					<Stack.Screen
						name="WriteNewStory"
						component={WriteNewStoryScreen}
					/>
					<Stack.Screen
						name="NewStory"
						component={NewStoryScreen}
					/>
					<Stack.Screen
						name="PhoneSupport"
						component={PhoneSupportScreen}
					/>
					<Stack.Screen
						name="EmailSupport"
						component={EmailSupportScreen}
					/>
					<Stack.Screen
						name="HowJounrey"
						component={HowJounreyScreen}
					/>
					<Stack.Screen 
						name="Verify"
						component={VerifyScreen}
					/>

					<Stack.Screen
						name="DocumentWriting"
						component={DocumentWriting}
					></Stack.Screen>

					<Stack.Screen
						name="WriterReward"
						component={WriterRewardScreen}
					></Stack.Screen>
					
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

//===  make components available outside ===
export default Navigations;