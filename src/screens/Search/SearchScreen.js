import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { FlatList, Keyboard, View } from 'react-native'
import { useTheme } from '../../core/dopebase'
import Hamburger from '../../components/Hamburger/Hamburger'
import Modal from 'react-native-modal'
import SingleItemDetail from '../SingleItemDetail/SingleItemDetailScreen'
import dynamicStyles from './styles'
import SearchBar from '../../core/ui/SearchBar/SearchBar'
import { useSelector } from 'react-redux'
import { storeCartToDisk } from '../../core/cart/redux/reducers'
import FoodListView from '../../components/FoodListView/FoodListView'
import { useSearchProducts } from '../../api'

function SearchScreen(props) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { navigation } = props
  const searchRef = useRef(null)

  const vendors = useSelector(state => state.vendor.vendors)
  const cartVendor = useSelector(state => state.cart.vendor)
  const cartItems = useSelector(state => state.cart.cartItems)

  const [selectedItem, setSelectedItem] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [vendor, setVendor] = useState(null)
  const [searchedText, setSearchedText] = useState(null)

  const { products } = useSearchProducts(searchedText)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
      headerTitleContainerStyle: {
        justifyContent: 'flex-start',
      },
      headerTitle: () => (
        <SearchBar
          searchRef={searchRef}
          onSearch={text => onSearch(text)}
          onChangeText={text => onSearch(text)}
          placeholder="Search for cuisines"
          searchContainerStyle={styles.searchContainer}
          onSearchBarCancel={text => {
            searchRef.current.clearText()
            onSearch(text)
            Keyboard.dismiss()
          }}
        />
      ),
    })
  }, [])

  const onSearch = text => {
    setSearchedText(text)
  }

  const onPress = product => {
    let currentVendor = vendors.filter(
      vendorItem => vendorItem.id === product?.vendorID,
    )
    setSelectedItem(product)
    setVendor(currentVendor[0])
    setIsVisible(true)
  }

  const renderItem = ({ item }) => {
    return <FoodListView food={item} onPress={onPress} />
  }

  return (
    <View style={styles.container}>
      <Modal
        style={styles.modalContainer}
        swipeDirection="down"
        onSwipeComplete={() => setIsVisible(false)}
        onModalHide={async () => storeCartToDisk(cartItems, cartVendor)}
        isVisible={isVisible}>
        <SingleItemDetail
          close={() => setIsVisible(false)}
          vendor={vendor}
          foodItem={selectedItem}
        />
      </Modal>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  )
}

export default SearchScreen
