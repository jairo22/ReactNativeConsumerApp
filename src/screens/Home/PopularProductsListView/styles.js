import { StyleSheet } from 'react-native'
import { heightPercentageToDP as h } from 'react-native-responsive-screen'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return new StyleSheet.create({
    container: {
      backgroundColor: colorSet.primaryBackground,
      flex: 1,
    },
    productItemContainer: {
      flex: 1,
      margin: 10,
      marginBottom: 20,
    },
    productPhoto: {
      width: '100%',
      height: 200,
    },
    productInfo: {
      marginTop: 10,
      flexDirection: 'row',
    },
    productName: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'left',
      color: colorSet.primaryText,
    },
    productPrice: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'right',
      color: colorSet.primaryText,
    },
    modalContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: h(2),
    },
  })
}

export default dynamicStyles
