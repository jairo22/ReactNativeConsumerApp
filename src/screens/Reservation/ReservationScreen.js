import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import { ScrollView, Alert, Text, TextInput, View } from 'react-native'
import { Image } from 'expo-image'
import { useSelector } from 'react-redux'
import { useTheme, useTranslations, Button } from '../../core/dopebase'
import dynamicStyles from './styles'
import Hamburger from '../../components/Hamburger/Hamburger'
import { firebase } from '../../core/api/firebase/config'
import { getUnixTimeStamp } from '../../core/helpers/timeFormat'
import { useConfig } from '../../config'

const regexForPhoneNumber = /\d{9}$/

const ReservationScreen = props => {
  const { navigation, route } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const config = useConfig()

  const restaurantRef = useRef(null)
  const reservationRef = firebase
    .firestore()
    .collection(config.tables.reservationsTableName)
  const unsubscribeRestaurants = useRef(null)
  const unsubscribeReservations = useRef(null)

  const currentUser = useSelector(state => state.auth.user)

  const [vendor, setVendor] = useState(route.params?.vendor ?? {})
  const [reservations, setReservations] = useState({})
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [details, setDetails] = useState('')

  useLayoutEffect(() => {
    if (!config.isMultiVendorEnabled) {
      navigation.setOptions({
        headerLeft: () => (
          <Hamburger
            onPress={() => {
              navigation.openDrawer()
            }}
          />
        ),
        title: localized('Reservation'),
      })
    }
    navigation.setOptions({
      title: localized('Reservation'),
    })
  }, [])

  useEffect(() => {
    return () => {
      if (!config.isMultiVendorEnabled) {
        restaurantRef.current = firebase
          .firestore()
          .collection(config.tables.VENDORS)
          .limit(1)
      }
    }
  }, [])

  useEffect(() => {
    setFirstName(currentUser.firstName)
    setLastName(currentUser.lastName)
    setPhone(currentUser.phone)
    if (!config.isMultiVendorEnabled) {
      unsubscribeRestaurants.current = restaurantRef.onSnapshot(
        onVendorsCollectionUpdate,
      )
    }
    unsubscribeReservations.current = reservationRef
      .orderBy('createdAt', 'desc')
      .where('authorID', '==', currentUser.id)
      .onSnapshot(onReservationUpdate, error => {
        console.log(error)
      })
  }, [currentUser?.id])

  useEffect(() => {
    return () => {
      if (!config.isMultiVendorEnabled) {
        unsubscribeRestaurants?.current && unsubscribeRestaurants.current()
      }
      unsubscribeReservations?.current && unsubscribeReservations.current()
    }
  }, [])

  const onReservationUpdate = querySnapshot => {
    const reservations = []
    querySnapshot?.forEach(doc => {
      reservations.push({
        id: doc.id,
        ...doc.data(),
      })
    })
    setReservations(reservations)
  }

  const onVendorsCollectionUpdate = querySnapshot => {
    const vendors = []
    querySnapshot?.forEach(doc => {
      vendors.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    if (vendors?.length > 0) {
      setVendor(vendors[0])
    }
  }

  const onReserve = () => {
    const regexResult = regexForPhoneNumber.test(phone)

    if (firstName && lastName && phone && details && regexResult) {
      reservationRef
        .add({
          authorID: currentUser.id,
          firstname: firstName,
          lastname: lastName,
          phone: phone,
          detail: details,
          createdAt: getUnixTimeStamp(),
          vendorID: vendor.id,
        })
        .then(_response => {
          setFirstName(currentUser?.firstName)
          setLastName(currentUser?.lastName)
          setPhone(currentUser?.phone)
          setDetails(details)
          Alert.alert(
            '',
            localized('Your reservation was successful.'),
            [{ text: localized('OK') }],
            {
              cancelable: false,
            },
          )
          navigation.navigate('ReservationHistoryScreen')
        })
        .catch(function (error) {
          alert(error)
        })
    } else if (!regexResult && firstName && lastName && phone && details) {
      Alert.alert(
        '',
        localized(
          'Your phone number is invalid. Please use a valid phone number.',
        ),
        [{ text: localized('OK') }],
        {
          cancelable: false,
        },
      )
    } else {
      Alert.alert(
        '',
        localized('Please fill out all the required fields.'),
        [{ text: localized('OK') }],
        {
          cancelable: false,
        },
      )
    }
  }

  const onViewPastReservation = () => {
    navigation.navigate('ReservationHistoryScreen')
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          placeholderColor={theme.colors[appearance].grey9}
          style={styles.photo}
          source={{ uri: vendor.photo }}
        />
        <View style={styles.overlay} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}> {vendor.title} </Text>
        <Text style={styles.description}> {vendor.address} </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={text => setFirstName(text)}
            value={firstName}
            placeholderTextColor={theme.colors[appearance].grey9}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={text => setLastName(text)}
            value={lastName}
            placeholderTextColor={theme.colors[appearance].grey9}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
            onChangeText={text => setPhone(text)}
            value={phone}
            placeholderTextColor={theme.colors[appearance].grey9}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Reservation Details"
            onChangeText={text => setDetails(text)}
            value={details}
            placeholderTextColor={theme.colors[appearance].grey9}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
          onPress={() => onReserve()}
          text={localized('Make Reservation')}
        />
        <Button
          containerStyle={[
            styles.secondaryButtonContainer,
            { display: !reservations.length ? 'none' : 'flex' },
          ]}
          textStyle={styles.secondaryButtonText}
          onPress={onViewPastReservation}
          text={localized('View Past Reservations')}
        />
        <View
          style={[styles.buttonContainer, { backgroundColor: 'transparent' }]}
        />
      </View>
    </ScrollView>
  )
}

export default ReservationScreen
