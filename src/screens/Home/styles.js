import { StyleSheet, Dimensions } from 'react-native'
const { width: viewportWidth } = Dimensions.get('window')

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return new StyleSheet.create({
    container: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      flex: 1,
    },
    categories: {
      height: 106,
      marginTop: -5,
      marginBottom: 10,
    },
    categoryItemContainer: {
      margin: 10,
      alignItems: 'center',
    },
    categoryItemPhoto: {
      height: 70,
      width: 70,
      borderRadius: 35,
    },
    categoryItemTitle: {
      marginTop: 5,
      fontWeight: 'bold',
      color: theme.colors[appearance].primaryText,
    },
    deals: {
      minHeight: 250,
      marginBottom: 10,
    },
    carousel: {},
    dealItemContainer: {
      flex: 1,
      justifyContent: 'center',
      width: viewportWidth,
      height: 250,
    },
    dealPhoto: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: 250,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    dealName: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
      opacity: 0.7,
    },
    paginationContainer: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      // backgroundColor: 'green',
      paddingVertical: 8,
      marginTop: 200,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 0,
    },

    foods: {},
    vendorItemContainer: {
      flex: 1,
      marginHorizontal: 8,
      marginBottom: 8,
      elevation: 1,
      padding: 10,
      shadowColor: theme.colors[appearance].grey6,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 1,
      borderColor: '#000',
      borderRadius: 5,
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    mapImage: { width: 25, height: 25 },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 5,
    },
    foodPhoto: {
      width: '100%',
      height: 200,
    },
    foodInfo: {
      marginTop: 10,
      flexDirection: 'row',
    },
    foodName: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'left',
      color: theme.colors[appearance].primaryText,
      fontSize: 15,
      marginVertical: 4,
    },
    foodPrice: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'right',
      color: theme.colors[appearance].primaryText,
    },
    title: {
      marginTop: 20,
      marginLeft: 5,
      fontWeight: 'bold',
      color: theme.colors[appearance].primaryText,
      fontSize: 20,
      marginBottom: 15,
    },
    photo: {
      height: 300,
    },
    detail: {
      height: 60,
      width: 100,
      marginRight: 10,
    },

    description: {
      color: theme.colors[appearance].secondaryText,
      fontSize: 13,
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonSetContainer: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSet: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 25,
      borderColor: theme.colors[appearance].grey3,
    },
    count: {
      padding: 10,
      marginTop: 2,
      color: theme.colors[appearance].primaryText,
      fontWeight: 'bold',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonContainer: {
      padding: 10,
      width: 50,
    },
    buttonText: {
      color: theme.colors[appearance].primaryText,
    },
    // mostPopular: {
    //   backgroundColor: theme.colors[appearance].grey0,
    // },
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
    },
    actionContainer: {
      flexDirection: 'row',
      marginTop: 10,
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
      color: theme.colors[appearance].primaryBackground,
    },
  })
}

export default dynamicStyles
