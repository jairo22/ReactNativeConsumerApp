import React, { useLayoutEffect } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useSelector, useDispatch } from 'react-redux'
import {
  useTheme,
  useTranslations,
  Button,
  EmptyStateView,
} from '../../core/dopebase'
import dynamicStyles from './styles'
import Hamburger from '../../components/Hamburger/Hamburger'
import { overrideCart } from '../../core/cart/redux/actions'
import { useOrders } from '../../api'

const OrderListScreen = props => {
  const { navigation } = props

  const dispatch = useDispatch()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const currentUser = useSelector(state => state.auth.user)

  const { orders, loading } = useOrders(currentUser.id)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: localized('Orders'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
    })
  }, [])

  const onReorderPress = item => {
    dispatch(overrideCart(item.products))

    navigation.navigate('Cart')
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() =>
        props.navigation.navigate('OrderTrackingScreen', {
          item,
        })
      }>
      <View>
        {item != null &&
          item.products != null &&
          item.products[0] != null &&
          item.products[0].photo != null &&
          item.products[0].photo.length > 0 && (
            <Image
              placeholderColor={theme.colors[appearance].grey9}
              style={styles.photo}
              source={{ uri: item.products[0].photo }}
            />
          )}
        <View style={styles.overlay} />
        <Text style={styles.headerTitle}>
          {item?.createdAt ? new Date(item.createdAt).toDateString() : ''} -{' '}
          {item.status}
        </Text>
      </View>
      {item.products.map(food => {
        return (
          <View style={styles.rowContainer} key={food.id}>
            <Text style={styles.count}>{food.quantity}</Text>
            <Text style={styles.title}>{food.name}</Text>
            <Text style={styles.price}>${food.price}</Text>
          </View>
        )
      })}
      <View style={styles.actionContainer}>
        <Text style={styles.total}>
          Total: $
          {item.products
            .reduce((prev, next) => prev + next.price * next.quantity, 0)
            .toFixed(2)}
        </Text>
        <Button
          containerStyle={styles.actionButtonContainer}
          textStyle={styles.actionButtonText}
          onPress={() => onReorderPress(item)}
          text={localized('REORDER')}
        />
      </View>
    </TouchableOpacity>
  )

  const emptyStateConfig = {
    title: localized('No Orders'),
    description: localized(
      "You haven't placed any orders yet. Your orders will be displayed here.",
    ),
  }

  return (
    <>
      {orders?.length === 0 && !loading && (
        <View style={styles.emptyViewContainer}>
          <EmptyStateView emptyStateConfig={emptyStateConfig} />
        </View>
      )}
      <FlatList
        style={styles.flat}
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        initialNumToRender={5}
      />
    </>
  )
}

export default OrderListScreen
