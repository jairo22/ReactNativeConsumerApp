import React, { useContext } from 'react'
import { Platform } from 'react-native'
import { useTheme, useTranslations } from '../core/dopebase'

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForPhoneNumber = /\d{9}$/

export const ConfigContext = React.createContext({})

export const ConfigProvider = ({ children }) => {
  const { theme } = useTheme()
  const { localized } = useTranslations()
  const config = {
    isMultiVendorEnabled: true,
    isSMSAuthEnabled: true,
    isGoogleAuthEnabled: true,
    isAppleAuthEnabled: true,
    isFacebookAuthEnabled: true,
    forgotPasswordEnabled: true,
    appIdentifier: `rn-restaurant-${Platform.OS}`,
    facebookIdentifier: '1288726485109267',
    isDelayedLoginEnabled: false,
    googleAPIKey: 'AIzaSyABq2WJNGXFZC2u-_9Z9SjWovSdmTe29ko', // This is used for fetching Google Maps data, such as geocoding data, reverse geocoding, directions, maps, etc.
    currencyCode: 'usd',
    tables: {
      vendorsTableName: 'vendors',
      vendorOrdersTableName: 'restaurant_orders',
      vendorDeliveriesTableName: 'restaurant_deliveries',
      vendorReviewsTableName: 'vendor_reviews',
      vendorProductsTableName: 'vendor_products',
      reservationsTableName: 'reservations',
      vendorCategoriesTableName: 'vendor_categories',
    },
    onboardingConfig: {
      welcomeTitle: localized('Bienvenido a Yasta'),
      welcomeCaption: localized(
        'Orderna comida casera cerca de ti y rastrea tu pedido en tiempo real',
      ),
      walkthroughScreens: [
        {
          icon: require('../assets/icons/restaurant-menu.png'),
          title: localized('Bienvenido a Yasta'),
          description: localized(
            'Log in and order delicious food from restaurants around you.',
          ),
        },
        {
          icon: require('../assets/icons/delivery-icon.png'),
          title: localized('Order Food'),
          description: localized(
            "Hungry? Order food in just a few clicks and we'll take care of you..",
          ),
        },
        {
          icon: require('../assets/icons/calendar-grid-icon.png'),
          title: localized('Reorder and Save'),
          description: localized(
            'Reorder in one click. Bookmark your favorite restaurants.',
          ),
        },
        {
          icon: require('../assets/icons/binoculars.png'),
          title: localized('Track Delivery'),
          description: localized(
            'Track your food order in real-time with an interactive map.',
          ),
        },
        {
          icon: require('../assets/icons/apple.png'),
          title: localized('Seamless Payments'),
          description: localized(
            'Pay with your credit cards, Apple Pay or Android Pay, with one click.',
          ),
        },
      ],
    },
    drawerMenuConfig: {
      adminDrawerConfig: {
        upperMenu: [
          {
            title: localized('VENDORS'),
            icon: theme.icons.shop,
            navigationPath: 'AdminVendorList',
          },
          {
            title: localized('ORDERS'),
            icon: theme.icons.delivery,
            navigationPath: 'AdminOrder',
          },
          {
            title: localized('DELIVERY'),
            icon: theme.icons.delivery,
            navigationPath: 'Map',
          },
        ],
        lowerMenu: [
          {
            title: localized('LOG OUT'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
      vendorDrawerConfig: {
        upperMenu: [
          {
            title: localized('HOME'),
            icon: theme.icons.shop,
            navigationPath: 'Home',
          },
          {
            title: localized('CUISINES'),
            icon: theme.icons.menu,
            navigationPath: 'CategoryList',
          },
          {
            title: localized('SEARCH'),
            icon: theme.icons.search,
            navigationPath: 'Search',
          },
          {
            title: localized('CART'),
            icon: theme.icons.cart,
            navigationPath: 'Cart',
          },
          {
            title: localized('RESERVATIONS'),
            icon: theme.icons.reserve,
            navigationPath: 'ReservationHistoryScreen',
          },
          {
            title: localized('PROFILE'),
            icon: theme.icons.profile,
            navigationPath: 'MyProfile',
          },
          {
            title: localized('ORDERS'),
            icon: theme.icons.delivery,
            navigationPath: 'OrderList',
          },
        ],
        lowerMenu: [
          {
            title: localized('LOG OUT'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
      customerDrawerConfig: {
        upperMenu: [
          {
            title: localized('HOME'),
            icon: theme.icons.shop,
            navigationPath: 'Home',
          },
          {
            title: localized('CUISINES'),
            icon: theme.icons.menu,
            navigationPath: 'CategoryList',
          },
          {
            title: localized('SEARCH'),
            icon: theme.icons.search,
            navigationPath: 'Search',
          },
          {
            title: localized('CART'),
            icon: theme.icons.cart,
            navigationPath: 'Cart',
          },
          {
            title: localized('PROFILE'),
            icon: theme.icons.profile,
            navigationPath: 'MyProfile',
          },
          {
            title: localized('ORDERS'),
            icon: theme.icons.delivery,
            navigationPath: 'OrderList',
          },
        ],
        lowerMenu: [
          {
            title: localized('LOG OUT'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
      vendorDrawer: {
        upperMenu: [
          {
            title: localized('MANAGE ORDERS'),
            icon: theme.icons.shop,
            navigationPath: 'Home',
          },
          {
            title: localized('MANAGE PRODUCTS'),
            icon: theme.icons.foods,
            navigationPath: 'Products',
          },
        ],
        lowerMenu: [
          {
            title: localized('LOGOUT'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
      driverDrawerConfig: {
        upperMenu: [
          {
            title: localized('HOME'),
            icon: theme.icons.shop,
            navigationPath: 'Home',
          },
          {
            title: localized('ORDERS'),
            icon: theme.icons.delivery,
            navigationPath: 'DriverOrderList',
          },
          {
            title: localized('PROFILE'),
            icon: theme.icons.profile,
            navigationPath: 'MyProfile',
          },
        ],
        lowerMenu: [
          {
            title: localized('LOGOUT'),
            icon: theme.icons.shutdown,
            action: 'logout',
          },
        ],
      },
    },
    tosLink: 'https://www.instamobile.io/eula-instachatty/',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: localized('First Name'),
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: localized('Last Name'),
      },
    ],
    signupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: localized('First Name'),
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: localized('Last Name'),
      },
      {
        displayName: localized('E-mail Address'),
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: localized('E-mail Address'),
        autoCapitalize: 'none',
      },
      {
        displayName: localized('Password'),
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: localized('Password'),
        autoCapitalize: 'none',
      },
    ],
    editProfileFields: {
      sections: [
        {
          title: localized('PUBLIC PROFILE'),
          fields: [
            {
              displayName: localized('First Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'firstName',
              placeholder: 'Your first name',
            },
            {
              displayName: localized('Last Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'lastName',
              placeholder: 'Your last name',
            },
          ],
        },
        {
          title: localized('PRIVATE DETAILS'),
          fields: [
            {
              displayName: localized('E-mail Address'),
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
            {
              displayName: localized('Phone Number'),
              type: 'text',
              editable: true,
              regex: regexForPhoneNumber,
              key: 'phone',
              placeholder: 'Your phone number',
            },
          ],
        },
      ],
    },
    userSettingsFields: {
      sections: [
        {
          title: localized('SECURITY'),
          fields: [
            {
              displayName: localized('Allow Push Notifications'),
              type: 'switch',
              editable: true,
              key: 'push_notifications_enabled',
              value: true,
            },
            {
              ...(Platform.OS === 'ios'
                ? {
                    displayName: localized('Enable Face ID / Touch ID'),
                    type: 'switch',
                    editable: true,
                    key: 'face_id_enabled',
                    value: false,
                  }
                : {}),
            },
          ],
        },
        {
          title: localized('PUSH NOTIFICATIONS'),
          fields: [
            {
              displayName: localized('Order updates'),
              type: 'switch',
              editable: true,
              key: 'order_updates',
              value: false,
            },
            {
              displayName: localized('New arrivals'),
              type: 'switch',
              editable: false,
              key: 'new_arrivals',
              value: false,
            },
            {
              displayName: localized('Promotions'),
              type: 'switch',
              editable: false,
              key: 'promotions',
              value: false,
            },
          ],
        },
        {
          title: localized('ACCOUNT'),
          fields: [
            {
              displayName: localized('Save'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsFields: {
      sections: [
        {
          title: localized('CONTACT'),
          fields: [
            {
              displayName: localized('Address'),
              type: 'text',
              editable: false,
              key: 'contacus',
              value: '142 Steiner Street, San Francisco, CA, 94115',
            },
            {
              displayName: localized('E-mail us'),
              value: 'florian@instamobile.io',
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Call Us'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsPhoneNumber: '+16504859694',
    APIs: {
      firebase: 'firebase',
    },
    API_TO_USE: 'firebase', // "firebase", "wooCommerce", "shopify",
    serverSideEnv: {
      API: {
        baseURL: 'https://agile-retreat-80253.herokuapp.com/', //your copied heroku link
        timeout: 15000,
      },
    },
    stripeConfig: {
      PUBLISHABLE_KEY:
        'pk_test_51Ifl3jFrWOr9lMSK0AAR0DBI5veAeYhrpezBF0WrHB6GHTstLxBlu3SFQRaw2aAVlk0mMtgdpFtursJzFzcrxYXE002EjvLVn8', // "pk_test_..." in test mode and ""pk_live_..."" in live mode
      MERCHANT_ID: 'merchant.com.{{YOUR_APP_NAME}}',
      ANDROID_PAYMENT_MODE: 'test', // test || production
    },
    GOOGLE_SIGNIN_CONFIG: {
      SCOPES: ['https://www.googleapis.com/auth/drive.photos.readonly'],
      WEB_CLIENT_ID:
        '706061484183-l0l58dds4kg329fh1trbiha1ci5rqm5n.apps.googleusercontent.com', // from google-services.json file
      OFFLINE_ACCESS: true,
    },
    FIREBASE_COLLECTIONS: {
      USERS: 'users',
      PAYMENT_METHODS: 'payment_methods',
      STRIPE_CUSTOMERS: 'stripe_customers',
      CATEGORIES: 'vendor_categories',
      CHARGES: 'charges',
      ORDERS: 'restaurant_orders',
      SOURCES: 'sources',
      PRODUCTS: 'vendor_products',
      SHIPPING_METHODS: 'shipping_methods',
    },
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)
