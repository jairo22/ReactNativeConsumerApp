import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { Image } from 'expo-image'
import { useTheme, useTranslations, Button } from '../../core/dopebase'
import dynamicStyles from './styles'
import {
  addToCart,
  updateCart,
  setCartVendor,
} from '../../core/cart/redux/actions'
import { storeCartToDisk } from '../../core/cart/redux/reducers'

const SingleItemDetail = props => {
  const { foodItem, vendor, close } = props

  const [quantity, setQuantity] = useState(1)
  const [itemAlreadyInCart, setItemAlreadyInCart] = useState({})
  const [indexAlreadyInCart, setIndexAlreadyInCart] = useState(-1)
  const [photo, setPhoto] = useState(foodItem.photo)

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems)

  useEffect(() => {
    checkAlreadyAdded()
  }, [])

  const onIncrease = () => {
    setQuantity(quantity + 1)
  }

  const onDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const onAddToCart = () => {
    if (indexAlreadyInCart !== -1) {
      let tempCart = itemAlreadyInCart
      tempCart.quantity = quantity + tempCart.quantity
      dispatch(updateCart(tempCart, indexAlreadyInCart))
      dispatch(setCartVendor(vendor))
      dispatch(storeCartToDisk(cartItems, vendor))
      close && close()
      return
    }
    const item = { ...foodItem, quantity: quantity }
    const len = cartItems.length
    if (
      cartItems.length !== 0 &&
      cartItems[len - 1].vendorID !== item.vendorID
    ) {
      // eslint-disable-next-line no-alert
      alert(
        localized(
          "You're trying to add an item from a different vendor. Please remove all the other items in the cart first.",
        ),
      )
      return
    }
    console.log(item)
    dispatch(addToCart(item))
    dispatch(setCartVendor(vendor))
    storeCartToDisk(cartItems, vendor)
    close && close()
  }

  const onPressItem = item => {
    setPhoto(item)
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressItem(item)}>
      <Image
        style={styles.detail}
        placeholderColor={theme.colors[appearance].grey9}
        source={{ uri: item }}
      />
    </TouchableOpacity>
  )

  const checkAlreadyAdded = () => {
    const existingIndex = cartItems.findIndex(
      singleCartItem => singleCartItem.id === foodItem.id,
    )
    if (existingIndex !== -1) {
      setItemAlreadyInCart(cartItems[existingIndex])
      setIndexAlreadyInCart(existingIndex)
    } else {
      setIndexAlreadyInCart(existingIndex)
    }
  }

  const renderSeparator = () => {
    return (
      <View
        style={{
          width: 10,
          height: '100%',
        }}
      />
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> {foodItem.name} </Text>
      <Image
        source={{
          uri: photo,
        }}
        style={styles.photo}
      />
      <View style={styles.detailPhotos}>
        <FlatList
          style={styles.flat}
          horizontal
          ItemSeparatorComponent={renderSeparator}
          data={foodItem.photos}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item}`}
        />
      </View>
      <Text style={styles.description}> {foodItem.description} </Text>
      <View style={styles.buttonSetContainer}>
        <View style={styles.buttonSet}>
          <Button
            containerStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            onPress={onDecrease}
            text={'-'}
            secondary
          />
          <Text style={styles.count}>{quantity}</Text>
          <Button
            containerStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            onPress={onIncrease}
            text={'+'}
            secondary
          />
        </View>
      </View>
      <View style={styles.actionContainer}>
        <Text style={styles.price}>
          ${(foodItem.price * quantity).toFixed(2)}
        </Text>

        <Button
          containerStyle={styles.actionButtonContainer}
          textStyle={styles.actionButtonText}
          onPress={onAddToCart}
          text={localized('Add to Cart')}
        />
      </View>
    </ScrollView>
  )
}

export default SingleItemDetail
