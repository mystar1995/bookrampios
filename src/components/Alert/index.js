import React from 'react';
import Alert from 'react-native-awesome-alerts';
import colors from '../../utils/colors';
import responsivetext from '../../utils/fontResponsive';
import {Platform} from 'react-native';

export default function AlertComponent(props)
{
    let {alert,onconfirmpressed} = props;
    return (
        <Alert 
          show={alert.show}
          title={alert.title}
          message={alert.message}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          contentContainerStyle={{backgroundColor:colors.secondry,width:'80%',borderRadius:20}}
          titleStyle={{color:colors.primary,fontSize:responsivetext(20),fontWeight:'bold',alignSelf:'center'}}
          messageStyle={{color:colors.primary,fontSize:responsivetext(15),textAlign:'center'}}
          confirmButtonTextStyle={{fontSize:responsivetext(15),fontWeight:'bold',color:colors.primary,fontFamily:'Quicksand-Regular'}}
          confirmButtonStyle={{
            backgroundColor:colors.submitColor,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,height: 30,
            paddingVertical: 2,
            paddingHorizontal: 0,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width:80
          }}
          onConfirmPressed={onconfirmpressed}
        ></Alert>
    )
}