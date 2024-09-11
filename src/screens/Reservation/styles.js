import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return new StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      flex: 1,
    },
    photo: {
      width: '100%',
      height: 200,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    info: {
      padding: 20,
      alignItems: 'center',
    },
    content: {
      paddingLeft: 50,
      paddingRight: 50,
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      color: theme.colors[appearance].primaryText,
      fontSize: 25,
    },
    description: {
      marginTop: 10,
      color: theme.colors[appearance].primaryText,
    },
    buttonContainer: {
      marginTop: 20,
      borderRadius: 5,
      width: '100%',
      backgroundColor: theme.colors[appearance].primaryForeground,
      padding: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
    secondaryButtonContainer: {
      marginTop: 10,
      borderRadius: 5,
      width: '100%',
      backgroundColor: theme.colors[appearance].primaryBackground,
      padding: 10,
    },
    secondaryButtonText: {
      color: theme.colors[appearance].primaryForeground,
      fontSize: 14,
    },
    textInputContainer: {
      width: '100%',
      marginTop: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors[appearance].grey3,
      borderRadius: 5,
    },
    textInput: {
      height: 42,
      paddingLeft: 10,
      paddingRight: 10,
      color: theme.colors[appearance].primaryText,
    },
    icon: {
      tintColor: theme.colors[appearance].primaryForeground,
      width: 32,
      height: 32,
      marginRight: 5,
    },
  })
}

export default dynamicStyles
