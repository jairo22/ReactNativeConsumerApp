import { StyleSheet } from 'react-native'
import { heightPercentageToDP as h } from 'react-native-responsive-screen'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return new StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      flex: 1,
    },
    searchContainer: {
      width: 200,
    },
    modalContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: h(2),
    },
    mapImage: { width: 25, height: 25 },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}

export default dynamicStyles
