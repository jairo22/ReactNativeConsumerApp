import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import {
  FlatList,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Image } from 'expo-image'
import { useDispatch } from 'react-redux'
import { useTheme, useTranslations } from '../../core/dopebase'
import dynamicStyles from './styles'
import Hamburger from '../../components/Hamburger/Hamburger'
import { overrideCart, setCartVendor } from '../../core/cart/redux/actions'
import IMVendorFilterModal from '../../components/FilterModal/FilterModal'
import { setVendors, setPopularProducts } from '../../core/vendor/redux'
import { useProducts } from '../../api'
import PopularProductsListView from './PopularProductsListView/PopularProductsListView'
import { useVendors, useCategories } from '../../core/vendor/api'
import IMVendorsScreen from '../../core/vendor/ui/IMVendors/IMVendorsScreen'
import { useConfig } from '../../config'
import ShoppingCartButton from '../../components/ShoppingCartButton/ShoppingCartButton'

const { width: viewportWidth } = Dimensions.get('window')

const HomeScreen = props => {
  const { navigation, route } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const config = useConfig()

  const dispatch = useDispatch()

  const [activeSlide, setActiveSlide] = useState(0)
  const [filters, setFilters] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  const slider1Ref = useRef(null)

  const { products } = useProducts(config)
  const { vendors } = useVendors()
  const { categories } = useCategories()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: localized('Homess'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          {config.isMultiVendorEnabled && (
            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
              <Image
                source={require('../../assets/icons/map.png')}
                style={styles.mapImage}
                tintColor={theme.colors[appearance].primaryForeground}
              />
            </TouchableOpacity>
          )}
          <ShoppingCartButton
            onPress={() => {
              navigation.navigate('Cart')
            }}
          />
        </View>
      ),
    })
  }, [])

  useEffect(() => {
    if (products) {
      dispatch(setPopularProducts(products))
    }
  }, [products])

  useEffect(() => {
    if (vendors) {
      dispatch(setVendors(vendors))
    }
  }, [vendors])

  const navToMap = (vendors, navigation) => {
    if (vendors.length > 0 || vendors !== undefined) {
      navigation.navigate('Map', { vendors })
    }
  }

  useEffect(() => {
    initCartFromPersistentStore()
  }, [])

  const onPressCategoryItem = item => {
    if (config.isMultiVendorEnabled) {
      props.navigation.navigate('Vendor', {
        category: item,
      })
    } else {
      props.navigation.navigate('SingleVendor', { category: item })
    }
  }

  const onPressDealItem = item => {
    if (config.isMultiVendorEnabled) {
      props.navigation.navigate('Vendor', {
        category: item,
      })
    } else {
      props.navigation.navigate('SingleVendor', { category: item })
    }
  }

  const initCartFromPersistentStore = () => {
    AsyncStorage.getItem('@MySuperCart:key')
      .then(res => {
        if (res != null) {
          const cart = JSON.parse(res)
          overrideCart(cart.cartItems)
          setCartVendor(cart.vendor)
        }
      })
      .catch(error => {
        console.log(`Promise is rejected with error: ${error}`)
      })
  }

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressCategoryItem(item)}>
      <View style={styles.categoryItemContainer}>
        <Image
          placeholderColor={theme.colors[appearance].grey9}
          style={styles.categoryItemPhoto}
          source={{ uri: item.photo }}
        />
        <Text style={styles.categoryItemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderDealItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressDealItem(item)}>
      <View style={styles.dealItemContainer}>
        <Image
          placeholderColor={theme.colors[appearance].grey9}
          style={styles.dealPhoto}
          source={{ uri: item.photo }}
        />
        <View style={styles.overlay} />
        <Text style={styles.dealName}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderCategorySeparator = () => {
    return (
      <View
        style={{
          width: 10,
          height: '100%',
        }}
      />
    )
  }

  const renderListHeader = () => {
    return (
      <>
        <IMVendorFilterModal
          isVisible={isVisible}
          filters={filters}
          close={() => setIsVisible(false)}
        />
        <Text style={styles.title}> {localized('Popular Categories')} </Text>
        <View style={styles.categories}>
          <FlatList
            horizontal
            initialNumToRender={4}
            data={categories}
            showsHorizontalScrollIndicator={false}
            renderItem={renderCategoryItem}
            keyExtractor={item => `${item.id}`}
          />
        </View>
        <Text style={styles.title}> {localized('Best Deals')} </Text>
        <View style={styles.deals}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                slider1Ref.current = c
              }}
              data={categories}
              renderItem={renderDealItem}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              // hasParallaxImages={true}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              // loopClonesPerSide={2}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={categories?.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={slider1Ref}
              tappableDots={!!slider1Ref}
            />
          </View>
        </View>

        <Text style={styles.title}> {localized('Most Popular')} </Text>
      </>
    )
  }

  if (!config.isMultiVendorEnabled) {
    return <PopularProductsListView renderListHeader={renderListHeader} />
  }

  return (
    <IMVendorsScreen
      containerStyle={styles.container}
      navigation={props.navigation}
      route={route}
      vendors={vendors}
      renderListHeader={renderListHeader}
    />
  )
}

export default HomeScreen
