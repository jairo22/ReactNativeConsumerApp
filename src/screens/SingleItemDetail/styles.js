import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return new StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      flex: 1,
      padding: 10,
      width: w(100),
      height: h(80),
      alignSelf: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    title: {
      fontWeight: 'bold',
      color: theme.colors[appearance].primaryText,
      fontSize: 25,
      marginVertical: 12,
    },
    photo: {
      width: '100%',
      height: 200,
      marginTop: 2,
    },
    detail: {
      height: 65,
      width: 65,
      marginBottom: 5,
    },
    detailPhotos: {
      height: 65,
      marginTop: 10,
    },
    description: {
      marginTop: 20,
      fontWeight: 'bold',
      color: theme.colors[appearance].primaryText,
    },
    buttonSetContainer: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSet: {
      flexDirection: 'row',
    },
    count: {
      padding: 10,
      marginTop: 6,
      fontSize: 18,
      color: theme.colors[appearance].primaryText,
      fontWeight: 'bold',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonContainer: {
      width: 44,
      borderRadius: 16,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 4,
      paddingBottom: 6,
    },
    buttonText: {
      color: theme.colors[appearance].primaryForeground,
      fontSize: 24,
    },
    price: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderWidth: 1,
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center',
      color: theme.colors[appearance].primaryText,
      borderColor: theme.colors[appearance].grey3,
      fontSize: 18,
    },
    actionContainer: {
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 50,
    },
    actionButtonContainer: {
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginLeft: 10,
      backgroundColor: theme.colors[appearance].primaryForeground,
    },
    actionButtonText: {
      fontWeight: 'bold',
      color: theme.colors[appearance].primaryBackground,
    },
  })
}
export default dynamicStyles
