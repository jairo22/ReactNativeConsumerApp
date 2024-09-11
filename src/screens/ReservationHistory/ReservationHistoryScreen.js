import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import { View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { useTheme, useTranslations, EmptyStateView } from '../../core/dopebase'
import dynamicStyles from './styles'
import ReservationItem from '../../components/ReservationItem/ReservationItem'
import { firebase } from '../../core/api/firebase/config'
import Hamburger from '../../components/Hamburger/Hamburger'
import { useConfig } from '../../config'

const ReservationHistoryScreen = props => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { navigation, route } = props
  const config = useConfig()
  const currentUser = useSelector(state => state.auth.user)
  const [reservations, setReservations] = useState(
    route.params?.reservations ?? null,
  )
  const reservationRef = useRef(
    firebase.firestore().collection(config.tables.reservationsTableName),
  )
  const unsubscribeReservations = useRef(null)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: localized('Reservation History'),
    })
    if (config.isMultiVendorEnabled) {
      navigation.setOptions({
        headerLeft: () => (
          <Hamburger
            onPress={() => {
              navigation.openDrawer()
            }}
          />
        ),
      })
    }
  }, [])

  useEffect(() => {
    unsubscribeReservations.current = reservationRef.current
      .orderBy('createdAt', 'desc')
      .where('authorID', '==', currentUser.id)
      .onSnapshot(onReservationUpdate)
    return () => {
      unsubscribeReservations.current && unsubscribeReservations.current()
    }
  }, [])

  const onReservationUpdate = querySnapshot => {
    const data = []
    querySnapshot?.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data(),
      })
    })
    setReservations(data)
  }

  const emptyStateConfig = {
    title: localized('No Reservations Yet'),
    description: localized(
      "You currently don't have any reservations. Your reservations will be displayed here.",
    ),
  }

  if (reservations && reservations.length === 0) {
    return (
      <View style={styles.emptyViewContainer}>
        <EmptyStateView emptyStateConfig={emptyStateConfig} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ReservationItem constructorObject={item} />}
        style={{ width: '95%' }}
      />
    </View>
  )
}

export default ReservationHistoryScreen
