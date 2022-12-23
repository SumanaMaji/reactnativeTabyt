import moment from 'moment';
import {Icon, Left, ListItem, Right} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import BackCross from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import Loader from '../../Component/Loader';
import AuthModal from '../../Component/Modal/AuthModal';
import SurveyModal from '../../Component/Modal/SurveyModal';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import Event from '../../Service/Event';
import Navigation from '../../Service/Navigation';
import {BASE_DOMAIN} from '../../Utils/HttpClient';

const {width, height} = Dimensions.get('window');

const LIST = [
  {
    name: 'View Ticket',
    icon: 'person',
    type: 'Ionicons',
    path: 'MyEventTicketDetails',
  },
  {
    name: 'Event Details',
    icon: 'person',
    type: 'Ionicons',
    path: 'MyEventDetails',
  },
  {
    name: 'Split the Bill',
    icon: 'star-four-points-outline',
    type: 'MaterialCommunityIcons',
    path: 'SplitBillUser',
  },
  {
    name: 'Guest Lists',
    icon: 'star-four-points-outline',
    type: 'MaterialCommunityIcons',
    path: 'GuestLists',
  },
  {
    name: 'Menu',
    icon: 'star-four-points-outline',
    type: 'MaterialCommunityIcons',
    path: 'MenuBooking',
  },
  {
    name: 'Receipts',
    icon: 'heart-outline',
    type: 'Ionicons',
    path: 'Receipt',
  },
  {
    name: 'Cancel Reservation',
    icon: 'md-person-add',
    type: 'Ionicons',
    cancel: true,
  },
  {
    name: 'Reviews',
    icon: 'md-person-add',
    type: 'Ionicons',
    path: 'Reviews',
  },
  // {
  //   name: 'Get Help',
  //   icon: 'wallet',
  //   type: 'Ionicons',
  //   path: 'Help',
  // },
];

const MyEventAbout = props => {
  const {data, ticket, eId, booking} = props.route.params;
  const {userData} = useSelector(state => state.User);
  // console.log('event data=>>', JSON.stringify(data));
  const [authModal, setauthModal] = useState(false);
  const [cancelModal, setcancelModal] = useState(false);
  const [eventDetails, seteventDetails] = useState(data);
  const [isFetching, setisFetching] = useState(true);
  const [menuData, setmenuData] = useState({});

  useEffect(() => {
    getSingleEventBookingData();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (booking) {
        Navigation.navigate('MyTickets');
      } else {
        Navigation.back();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const getSingleEventBookingData = async () => {
    const result = await Event.getSingleBookingEvent(eId);
    console.log('getSingleEventData', JSON.stringify(result.data));
    if (result && result.status) {
      getSingleEventData(result.data[0]?.eventsData?._id);
      // console.log('result.data', result.data);
      seteventDetails(result.data[0]);
    } else {
      setisFetching(false);
    }
  };

  const getSingleEventData = async eventId => {
    const result = await Event.getSingleEvent(eventId);
    console.log('getSingleEventData result.data', result.data);
    if (result && result.status) {
      setmenuData(result.data?.menulistsData);
    }
    setisFetching(false);
  };

  const goTo = it => {
    if (it.cancel) {
      setauthModal(true);
      return;
    }
    // if (
    //   it.path == 'MyEventDetails' ||
    //   it.path == 'SplitBillUser' ||
    //   it.path == 'Reviews'
    // ) {
    //   Navigation.navigate(it.path, {
    //     eventData: data,
    //     eId: data?.eventsData?._id,
    //     bId: data?._id,
    //   });
    // }
    if (it.path == 'MenuBooking') {
      Navigation.navigate(it.path, {
        eventData: eventDetails,
        eId: eventDetails?.eventsData?._id,
        bId: eventDetails?._id,
        menuData: menuData,
      });
      return;
    }
    if (it.path) {
      Navigation.navigate(it.path, {
        eventData: eventDetails,
        eId: eventDetails?.eventsData?._id,
        bId: eventDetails?._id,
      });
    }
  };

  const handleBackClick = () => {
    if (booking) {
      Navigation.navigate('MyTickets');
    } else {
      Navigation.back();
    }
  };

  const checkLiveStatus = data => {
    // if (item.bookingStatus == "complete") {
    //   return null
    // }
    // console.log('item=>>', eventDetails);
    var dateFrom = moment(eventDetails?.eventsData?.startDate).format('L');
    var dateTo = moment(eventDetails?.eventsData?.endDate).format('L');
    var dateCheck = moment(new Date()).format('L');

    var d1 = dateFrom.split('/');
    var d2 = dateTo.split('/');
    var c = dateCheck.split('/');

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
    // alert(to);
    // console.log(check > from && check < to);
    // if (check < from && data == 'pending') {
    //   return true;
    // } else if (check > to && data == 'complete') {
    //   return true;
    // } else if (data == 'cancel' && check < to) {
    //   return true;
    // } else if (data == 'review' && check > to) {
    //   alert('show review');
    //   return true;
    // } else {
    //   return false;
    // }

    switch (data) {
      case 'pending':
        if (dateCheck < dateFrom) {
          return true;
        }
        break;
      case 'cancel':
        if (dateCheck < dateTo) {
          return true;
        }
        break;
      case 'review':
        if (dateCheck > dateTo) {
          return true;
        }
        break;
      default:
        return false;
        break;
    }
  };

  return (
    <CustomImageBackground>
      <BackCross
        title={ticket ? 'My Tickets' : 'My Event'}
        icon={false}
        getCallBack={booking}
        onBackPress={() => handleBackClick()}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <View style={{alignSelf: 'center', flex: 1}}>
          <ScrollView>
            <Image
              style={{width: width, height: height / 3, marginTop: 20}}
              source={{
                uri: BASE_DOMAIN + eventDetails?.eventsData?.image,
              }}
            />
            <View style={{paddingTop: 20, marginHorizontal: moderateScale(30)}}>
              {LIST.map((it, key) => {
                if (
                  it?.path == 'SplitBillUser' &&
                  (!eventDetails?.split ||
                    eventDetails?.bookingStatus === 'cancel')
                ) {
                  return;
                }
                if (
                  it?.cancel &&
                  (!checkLiveStatus('cancel') ||
                    eventDetails?.bookingStatus === 'cancel')
                ) {
                  return;
                }
                if (
                  eventDetails?.bookingStatus == 'pending' &&
                  (it.path == 'GuestLists' ||
                    it.path == 'MyEventTicketDetails' ||
                    it.path == 'Receipt' ||
                    it.name == 'Menu')
                ) {
                  return;
                }
                if (it?.path == 'Reviews' && !checkLiveStatus('review')) {
                  return;
                }
                return (
                  <ListItem
                    key={key}
                    onPress={() => goTo(it)}
                    style={styles.list}>
                    <Left style={{width: '50%', alignItems: 'center'}}>
                      <Text style={styles.title}>{it.name}</Text>
                    </Left>
                    <Right>
                      <Icon
                        name="keyboard-arrow-right"
                        type="MaterialIcons"
                        style={{color: COLORS.white}}
                      />
                    </Right>
                  </ListItem>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
      <Modal
        visible={authModal}
        transparent={true}
        onRequestClose={() => setauthModal(false)}>
        <AuthModal
          close={val => {
            setauthModal(false);
          }}
          buttonTitle="Confirm"
          verified={() => {
            setauthModal(false);
            setcancelModal(true);
          }}
          userData={userData}
          showText="Note. All Purchases on the Tabyt Platform are non-refundable. Would you like to proceed with this Cancelation"
        />
      </Modal>
      <Modal
        visible={cancelModal}
        transparent={true}
        onRequestClose={() => setcancelModal(false)}>
        <SurveyModal
          bookingId={eventDetails?._id}
          close={val => {
            setcancelModal(false);
          }}
        />
      </Modal>
    </CustomImageBackground>
  );
};

export default MyEventAbout;

const styles = StyleSheet.create({
  shadowTxt: {
    color: COLORS.textInput,
    //   opacity:1,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
  },
  boldTxt: {
    color: COLORS.white,
    opacity: 1,
    fontFamily: FONTS.SemiBold,
    fontSize: moderateScale(12),
  },
  list: {
    borderBottomWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 0,
    marginBottom: 0,
    paddingBottom: 10,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13.5),
    marginLeft: 13,
  },
});
