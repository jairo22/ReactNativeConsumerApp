import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { useTheme, useTranslations, EmptyStateView } from '../../core/dopebase'
import { firebase } from '../../core/api/firebase/config'
import Modal from 'react-native-modal'
import SingleItemDetail from '../SingleItemDetail/SingleItemDetailScreen'
import dynamicStyles from './styles'
import { storeCartToDisk } from '../../core/cart/redux/reducers'
import { useSelector } from 'react-redux'
import FoodListView from '../../components/FoodListView/FoodListView'
import { useConfig } from '../../config'

function SingleVendorScreen(props) {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const config = useConfig()

  const { navigation, route } = props
  const singleVendor = route.params.vendor
  const singleCategory = route.params.category // used only for single vendor config

  const emptyStateConfig = {
    title: localized('No Items'),
    description: localized(
      'There are currently no items under this vendor. Please wait until the vendor completes their profile.',
    ),
  }

  const [data, setData] = useState([])
  const [refreshing] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [vendor] = useState(singleVendor)
  const [category] = useState(singleCategory)

  const cartItems = useSelector(state => state.cart.cartItems)
  const cartVendor = useSelector(state => state.cart.vendor)

  // const ref = useRef(null);

  const ref = config.isMultiVendorEnabled
    ? useRef(
        firebase
          .firestore()
          .collection(config.tables.vendorProductsTableName)
          .where('vendorID', '==', vendor.id),
      )
    : useRef(
        firebase
          .firestore()
          .collection(config.tables.vendorProductsTableName)
          .where('categoryID', '==', category?.id),
      )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: vendor?.title || category?.title,
      headerRight: () => <View />,
    })

    if (config.isMultiVendorEnabled) {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ReservationScreen', {
                  vendor: vendor,
                })
              }>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/reservation.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Reviews', {
                  entityID: vendor.id,
                })
              }>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/review.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      })
    }
  }, [navigation])

  useEffect(() => {
    const unsubscribe = ref.current.onSnapshot(onCollectionUpdate)

    return () => {
      unsubscribe()
    }
  }, [ref])

  const onCollectionUpdate = querySnapshot => {
    const vendorProducts = []
    querySnapshot?.forEach(doc => {
      vendorProducts.push({
        id: doc.id,
        ...doc.data(),
      })
    })
    setData(vendorProducts)
    setLoading(false)
  }

  const onPress = item => {
    setSelectedItem(item)
    setIsVisible(true)
  }

  const renderItem = ({ item }) => (
    <FoodListView food={item} onPress={onPress} />
  )
  return (
    <View style={styles.container}>
      {data.length === 0 && !loading && (
        <View style={styles.emptyViewContainer}>
          <EmptyStateView emptyStateConfig={emptyStateConfig} />
        </View>
      )}
      <Modal
        style={styles.modalContainer}
        swipeDirection="down"
        onModalHide={async () => storeCartToDisk(cartItems, cartVendor)}
        onSwipeComplete={() => setIsVisible(false)}
        isVisible={isVisible}>
        <SingleItemDetail
          close={() => setIsVisible(false)}
          vendor={vendor}
          foodItem={selectedItem}
        />
      </Modal>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        initialNumToRender={5}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default SingleVendorScreen
