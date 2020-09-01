module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./src/assets/fonts/'], // stays the same
    dependencies: {
	    'react-native-paypal-wrapper': {
	      platforms: {
	        ios: null, // disable Android platform, other platforms will still autolink if provided
	      },
	    },
	  }
  }