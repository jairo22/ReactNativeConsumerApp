import { StyleSheet } from 'react-native'
import { heightPercentageToDP as h } from 'react-native-responsive-screen'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return new StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    emptyViewContainer: {
      paddingTop: 150,
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
      height: h(100),
    },
    header: {
      borderBottomColor: '#D8D8D8',
      borderBottomWidth: 0.5,
      backgroundColor: 'white',
    },
  })
}

export default dynamicStyles
