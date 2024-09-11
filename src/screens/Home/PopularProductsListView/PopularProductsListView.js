import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import Modal from 'react-native-modal'
import { FlatList } from 'react-native-gesture-handler'
import { Image } from 'expo-image'
import { useTheme } from '../../../core/dopebase'
import dynamicStyles from './styles'
import SingleItemDetailScreen from '../../SingleItemDetail/SingleItemDetailScreen'

function PopularProductsListView({ renderListHeader }) {
  const popularProducts = useSelector(state => state.vendor.popularProducts)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const onPress = product => {
    setSelectedProduct(product)
  }

  const renderProduct = product => {
    return (
      <TouchableOpacity onPress={() => onPress(product)}>
        <View style={styles.productItemContainer}>
          <Image
            placeholderColor={theme.colors[appearance].grey9}
            style={styles.productPhoto}
            source={{ uri: product.photo }}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({ item }) => renderProduct(item)}
        data={popularProducts}
        keyExtractor={item => `${item.id}`}
        initialNumToRender={2}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
      />
      <Modal
        style={styles.modalContainer}
        swipeDirection="down"
        onSwipeComplete={() => setSelectedProduct(null)}
        isVisible={selectedProduct !== null}>
        <SingleItemDetailScreen
          foodItem={selectedProduct}
          close={() => setSelectedProduct(null)}
        />
      </Modal>
    </View>
  )
}

export default PopularProductsListView
