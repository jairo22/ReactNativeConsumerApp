import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import { Image } from 'expo-image'
import { useTheme, useTranslations } from '../core/dopebase'
import { IMDrawerMenu } from '../core/ui/drawer/IMDrawerMenu/IMDrawerMenu'
import {
  LoadScreen,
  LoginScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  ResetPasswordScreen,
  WalkthroughScreen,
  WelcomeScreen,
} from '../core/onboarding'
import { IMChatScreen } from '../core/chat'

import ShoppingCartButton from '../components/ShoppingCartButton/ShoppingCartButton'
import SingleItemDetail from '../screens/SingleItemDetail/SingleItemDetailScreen'
import SingleVendorScreen from '../screens/SingleVendor/SingleVendorScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import OrderListScreen from '../screens/OrderList/OrderListScreen'
import SearchScreen from '../screens/Search/SearchScreen'
import IMVendorsMap from '../core/vendor/ui/IMVendorsMap/IMVendorsMap'
import AdminOrderListScreen from '../core/vendor/admin/ui/AdminOrderList/AdminOrderListScreen'
import AdminVendorListScreen from '../core/vendor/admin/ui/AdminVendorList/AdminVendorListScreen'
import CheckoutScreen from '../core/cart/ui/IMCheckoutScreen'
import CardScreen from '../core/payments/ui/Card/IMCardScreen'
import IMVendorReview from '../core/review/ui/IMVendorReviewScreen/IMVendorReviewScreen'
import IMOrderTrackingScreen from '../core/delivery/IMOrderTrackingScreen/IMOrderTrackingScreen'
import IMAddAddressModal from '../core/payments/component/IMAddAddressModal/IMAddAddressModal'
import { IMCategoryVendorsScreen } from '../core/vendor/ui/IMVendors/IMCategoryVendors/IMCategoryVendorsScreen'
import CartScreen from '../core/cart/ui/Cart/IMCartScreen'
import CategoryListScreen from '../screens/CategoryList/CategoryListScreen'
import ReservationScreen from '../screens/Reservation/ReservationScreen'
import ReservationHistoryScreen from '../screens/ReservationHistory/ReservationHistoryScreen'
import MyProfileScreen from '../components/MyProfileScreen'
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
} from '../core/profile'

import { NavigationContainer } from '@react-navigation/native'
import { useConfig } from '../config'
import useNotificationOpenedApp from '../core/helpers/notificationOpenedApp'

const Main = createStackNavigator()
const MainNavigation = () => {
  useNotificationOpenedApp()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const config = useConfig()
  return (
    <Main.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: 'FallingSkyCond',
        },
        headerStyle: {
          backgroundColor: theme.colors[appearance].primaryBackground,
        },
        headerTintColor: theme.colors[appearance].primaryText,
        headerRight: () => (
          <View style={styles.headerRight}>
            {config.isMultiVendorEnabled && (
              <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                <Image
                  source={require('../assets/icons/map.png')}
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
      })}
      initialRouteName="Home"
      headerMode="float">
      <Main.Screen name="Home" component={HomeScreen} />
      <Main.Screen name="Cart" component={CartScreen} />
      <Main.Screen name="OrderList" component={OrderListScreen} />
      <Main.Screen name="Search" component={SearchScreen} />
      <Main.Screen name="SingleVendor" component={SingleVendorScreen} />
      <Main.Screen name="SingleItemDetail" component={SingleItemDetail} />
      <Main.Screen name="CategoryList" component={CategoryListScreen} />
      <Main.Screen name="Map" component={IMVendorsMap} />
      <Main.Screen name="Checkout" component={CheckoutScreen} />
      <Main.Screen name="Cards" component={CardScreen} />
      <Main.Screen name="Reviews" component={IMVendorReview} />
      <Main.Screen name="MyProfile" component={MyProfileScreen} />
      <Main.Screen
        options={{ headerRight: () => <View /> }}
        name={localized('Contact')}
        component={IMContactUsScreen}
      />
      <Main.Screen
        options={{ headerRight: () => <View /> }}
        name={localized('Settings')}
        component={IMUserSettingsScreen}
      />
      <Main.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <Main.Screen name="Vendor" component={IMCategoryVendorsScreen} />
      <Main.Screen
        name="OrderTrackingScreen"
        component={IMOrderTrackingScreen}
      />
      <Main.Screen name="AddAddress" component={IMAddAddressModal} />
      <Main.Screen name="PersonalChat" component={IMChatScreen} />
      <Main.Screen name="ReservationScreen" component={ReservationScreen} />
      <Main.Screen
        name="ReservationHistoryScreen"
        component={ReservationHistoryScreen}
      />
    </Main.Navigator>
  )
}

const Drawer = createDrawerNavigator()
const DrawerStack = props => {
  const config = useConfig()
  const drawer = config.isMultiVendorEnabled ? (
    <IMDrawerMenu
      navigation={props.navigation}
      menuItems={config.drawerMenuConfig.vendorDrawerConfig.upperMenu}
      menuItemsSettings={config.drawerMenuConfig.vendorDrawerConfig.lowerMenu}
    />
  ) : (
    <IMDrawerMenu
      navigation={props.navigation}
      menuItems={config.drawerMenuConfig.customerDrawerConfig.upperMenu}
      menuItemsSettings={config.drawerMenuConfig.customerDrawerConfig.lowerMenu}
    />
  )
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 250 }}
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => drawer}>
      <Drawer.Screen name="Main" component={MainNavigation} />
    </Drawer.Navigator>
  )
}

const AdminMain = createStackNavigator()
const AdminMainNavigation = () => {
  const { theme, appearance } = useTheme()
  return (
    <AdminMain.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.colors[appearance].primaryBackground,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.colors[appearance].primaryText,
      })}
      initialRouteName="AdminVendorList"
      headerMode="float">
      <Main.Screen name="AdminVendorList" component={AdminVendorListScreen} />
      <Main.Screen name="AdminOrder" component={AdminOrderListScreen} />
      <Main.Screen name="Map" component={IMVendorsMap} />

      <AdminMain.Screen name="MyProfile" component={MyProfileScreen} />
      <AdminMain.Screen name="Contact" component={IMContactUsScreen} />
      <AdminMain.Screen name="Settings" component={IMUserSettingsScreen} />
      <AdminMain.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <AdminMain.Screen name="PersonalChat" component={IMChatScreen} />
    </AdminMain.Navigator>
  )
}

const AdminDrawer = createDrawerNavigator()
const AdminDrawerStack = props => {
  const config = useConfig()
  return (
    <AdminDrawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 250 }}
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={props.navigation}
          menuItems={config.drawerMenuConfig.adminDrawerConfig.upperMenu}
          menuItemsSettings={
            config.drawerMenuConfig.adminDrawerConfig.lowerMenu
          }
        />
      )}>
      <AdminDrawer.Screen name="Main" component={AdminMainNavigation} />
    </AdminDrawer.Navigator>
  )
}

const Login = createStackNavigator()
const LoginStack = () => {
  return (
    <Login.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome">
      <Login.Screen name="Login" component={LoginScreen} />
      <Login.Screen name="Signup" component={SignupScreen} />
      <Login.Screen name="Welcome" component={WelcomeScreen} />
      <Login.Screen name="Sms" component={SmsAuthenticationScreen} />
      <Login.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Login.Navigator>
  )
}

const RootStack = createStackNavigator()
const RootNavigator = () => {
  const currentUser = useSelector(state => state.auth.user)
  return (
    <RootStack.Navigator
      initialRouteName="LoadScreen"
      screenOptions={{ headerShown: false, animationEnabled: false }}
      headerMode="none">
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoadScreen"
        component={LoadScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />

      {currentUser?.role === 'admin' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={AdminDrawerStack}
        />
      ) : (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={DrawerStack}
        />
      )}
    </RootStack.Navigator>
  )
}

const linking = {
  prefixes: ['https://mychat.com', 'mychat://', 'http://localhost:19006'],
  config: {
    screens: {
      // PersonalChat: 'channelxxx=:channel',
    },
  },
}

const AppNavigator = () => {
  const { appearance, theme } = useTheme()

  return (
    <NavigationContainer
      linking={linking}
      theme={
        appearance === 'dark'
          ? theme.navContainerTheme.dark
          : theme.navContainerTheme.light
      }>
      <RootNavigator />
    </NavigationContainer>
  )
}

export { RootNavigator, AppNavigator }

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapImage: { width: 25, height: 25 },
})
