import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import GradientButton from '../../Component/Button/GradientButton';
import ReservationHeader from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import OverlayLoader from '../../Component/Loader/OverlayLoader.js';
import AuthModal from '../../Component/Modal/AuthModal';
import CardList from '../../Component/Modal/CardListModal';
import PromoModal from '../../Component/Modal/PromoModal';
import SplitModal from '../../Component/Modal/SplitModal';
import SurveyModal from '../../Component/Modal/SurveyModal';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import {moderateScale} from '../../PixelRatio';
import {default as Event, default as EventService} from '../../Service/Event';
import Navigation from '../../Service/Navigation';

const Checkout2 = props => {
  const {currentSelection, selectedItem, eventData} = props.route.params;
  const organizerData = eventData?.organizerData;

  const {userData, guestLogin} = useSelector(state => state.User);
  console.log('eventData=>>>', eventData);
  const [isEnabled, setIsEnabled] = useState(false);
  const [splitBillStatus, setsplitBillStatus] = useState(false);
  const [promo, setpromo] = useState(false);
  const [split, setsplit] = useState(false);
  const [cancel, setcancel] = useState(false);
  const [modal, setmodal] = useState(false);
  const [subtotal, setsubtotal] = useState('0');
  const [tax, settax] = useState('0');
  const [tips, settips] = useState('0');
  const [total, settotal] = useState('0');
  const [totalWithDiscount, settotalWithDiscount] = useState('0');
  const [due, setdue] = useState('0');
  const [promoDiscount, setpromoDiscount] = useState('0');
  const [promoC, setpromoC] = useState('');
  const [cardData, setcardData] = useState({});
  const [disabled, setdisabled] = useState(false);
  const [cardModal, setcardModal] = useState(false);
  const [continueBooking, setcontinueBooking] = useState(false);

  useEffect(() => {
    if (currentSelection == 'ticket') {
      const subTotal = selectedItem.reduce((accumulator, object) => {
        return accumulator + object.t_price;
      }, 0);
      setsubtotal(Number(subTotal).toFixed(2));
      if (eventData?.tax) {
        settax(Number((subTotal * eventData?.tax) / 100).toFixed(2));
      }
      if (eventData?.tips) {
        settips(Number((subTotal * eventData?.tips) / 100).toFixed(2));
      }
      let totalAmt = subTotal;
      if (eventData?.tax) {
        totalAmt =
          (subTotal * eventData?.tax) / 100 +
          (subTotal * eventData?.tips) / 100 +
          subTotal;
        settotal(Number(totalAmt).toFixed(2));
        settotalWithDiscount(totalAmt);
      } else {
        settotal(Number(totalAmt).toFixed(2));
        settotalWithDiscount(totalAmt);
      }
      if (eventData?.deposit && eventData.depositMin <= subTotal) {
        setdue(Number((totalAmt * eventData?.deposit) / 100).toFixed(2));
      }
    }
    if (currentSelection == 'reservation') {
      const subTotal = selectedItem.reduce((accumulator, object) => {
        return accumulator + object.price;
      }, 0);
      setsubtotal(subTotal.toFixed(2));
      if (eventData?.tax) {
        settax(Number((subTotal * eventData?.tax) / 100).toFixed(2));
      }
      if (eventData?.tips) {
        settips(Number((subTotal * eventData?.tips) / 100).toFixed(2));
      }
      let totalAmt = subTotal;
      if (eventData?.tax) {
        totalAmt =
          (subTotal * eventData?.tax) / 100 +
          (subTotal * eventData?.tips) / 100 +
          subTotal;
        settotal(Number(totalAmt).toFixed(2));
        settotalWithDiscount(totalAmt);
      } else {
        settotal(Number(totalAmt).toFixed(2));
        settotalWithDiscount(totalAmt);
      }
      if (eventData?.deposit && eventData.depositMin <= subTotal) {
        setdue(Number((totalAmt * eventData?.deposit) / 100).toFixed(2));
      }
    }
  }, [selectedItem]);

  useEffect(() => {
    getPayMethod();
  }, []);

  const getPayMethod = async () => {
    const result = await Event.getPaymentMethod();
    console.log('getPayMethod', result.data.filter(i => i.default === true)[0]);
    if (result && result.status) {
      const defaultCard = result.data.filter(i => i.default === true);
      if (defaultCard.length > 0) {
        setcardData(defaultCard[0]);
      }
    }
  };

  const PromoSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setpromo(true);
  };

  const SplitSwitch = () => {
    setsplitBillStatus(previousState => !previousState);
    setsplit(true);
  };

  // const renderTotalAmt = () => {
  //   let totalAmt;
  //   if (eventData?.tax) {
  //     totalAmt =
  //       (subtotal * eventData?.tax) / 100 +
  //       (subtotal * eventData?.tips) / 100 +
  //       subtotal;
  //   } else {
  //     totalAmt = subtotal;
  //   }
  //   // settotal(totalAmt);
  //   return totalAmt;
  // };

  const applyPromoCode = async promoCode => {
    if (!promoCode) {
      SimpleToast.show('Enter a Promo Code!');
      return;
    }
    let data = {
      eventId: eventData?._id,
      code: promoCode,
      price: Number(total),
    };
    let result = await EventService.applyPromoCode(data);
    console.log('promo result ', result);
    if (result && result.status) {
      setpromoDiscount(result?.data?.discount);
      settotal(total - result?.data?.discount);
      setpromoC(promoCode);
    } else {
      SimpleToast.show('Invalid Promo Code!');
    }
  };

  const purchase = () => {
    if (guestLogin) {
      SimpleToast.show('You need to login to view profile!');
      return;
    } else if (currentSelection == 'reservation' && splitBillStatus) {
      setcontinueBooking(true);
      setmodal(true);
    } else {
      setcontinueBooking(true);
      if (Object.keys(cardData).length > 0) {
        setmodal(true);
      } else {
        setcardModal(true);
      }

      // setmodal(true);
    }
  };

  const bookEvent = async () => {
    setdisabled(true);
    setmodal(false);
    let doPayment = true;
    let data = {
      eventId: eventData?._id,
      organizerId: eventData?.organizerId,
      bookingType: currentSelection,
      tickets: selectedItem,
      userId: userData?._id,
      tax: tax,
      tips: tips,
      subtotal: subtotal,
      total: total,
      due: due,
      taxPercentage: eventData?.tax === undefined ? '0' : eventData?.tax,
      tipsPercentage: eventData?.tips === undefined ? '0' : eventData?.tips,
      depositPercentage:
        eventData?.deposit === undefined ? '0' : eventData?.deposit,
      propmoCode: promoC,
      promocodeDiscount: Number(promoDiscount),
      split: splitBillStatus,
      bookingStatus: 'pending',
      // bookingStatus:
      //   currentSelection == 'reservation' && !splitBillStatus
      //     ? 'complete'
      //     : currentSelection == 'reservation' && splitBillStatus
      //     ? 'pending'
      //     : 'complete',
    };
    if (currentSelection == 'reservation' && splitBillStatus) {
      doPayment = false;
    }
    console.log('eventBooking data params', JSON.stringify(data));
    const result = await EventService.eventBooking(data);
    console.log('event booking', result);
    if (result && result.status) {
      if (doPayment) {
        SimpleToast.show("Making the payment, please don't leave the screen!!");
        continuePayment(result.data._id);
      } else {
        SimpleToast.show('Event booking successfully!');
        Navigation.navigate('MyEventAbout', {
          booking: true,
          data: {},
          ticket: true,
          eId: result.data._id,
        });
      }
    } else if (result && result.message == 'Event all Table already booking ') {
      SimpleToast.show('Sorry, This table is sold out!');
      setdisabled(false);
      Navigation.navigate('Home');
    } else {
      setdisabled(false);
      SimpleToast.show(result?.message);
    }
  };

  const continuePayment = async bookingId => {
    const data = {
      source: cardData?.cardId,
      BookingId: bookingId,
      amount: total,
    };
    console.log('payment payload=>>', data);
    const result = await Event.payNow(data);
    console.log('payment done result', result);
    if (result && result?.data?.status === 'succeeded') {
      updateEventBooking(bookingId, result?.data?.id);
    } else {
      SimpleToast.show('Payment Failed!!');
      setdisabled(false);
    }
  };

  const updateEventBooking = async (bookingId, payId) => {
    let data = {
      bookingStatus: 'complete',
      organizerId: eventData?.organizerId,
      eventId: eventData?._id,
      tickets: selectedItem,
      bookingType: currentSelection,
      paymentId: payId,
    };
    console.log('update event payload', data);

    const result = await EventService.updateEvent(bookingId, data);
    if (result && result.status) {
      SimpleToast.show('Event booked successfully!');
      setdisabled(false);
      Navigation.navigate('MyEventAbout', {
        booking: true,
        data: {},
        ticket: true,
        eId: bookingId,
      });
    } else {
      setdisabled(false);
      SimpleToast.show(result?.message);
    }
  };

  return (
    <CustomImageBackground>
      <ReservationHeader
        title="Checkout"
        icon={false}
        back={() => Navigation.back()}
      />
      <OverlayLoader show={disabled} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: 70}}>
          <View style={styles.list}>
            {cardData && Object.keys(cardData).length > 0 ? (
              <View style={styles.subList}>
                <Text style={styles.semiboldTxt}>Payment Method</Text>
                <Text
                  style={{...styles.regularTxt, marginLeft: 10}}
                  adjustsFontSizeToFit>
                  xxx{' '}
                  {cardData?.cardNumber.substr(cardData?.cardNumber.length - 4)}{' '}
                  | {cardData?.type}
                </Text>
              </View>
            ) : null}
            <Pressable
              style={styles.subList}
              onPress={() => {
                setcontinueBooking(false);
                setcardModal(true);
              }}
              // onPress={() => Navigation.navigate('PaymentInfo')}
            >
              <Text style={styles.semiboldTxt}>Select New Payment Method</Text>
              <Icon
                name="keyboard-arrow-right"
                type="MaterialIcons"
                style={{color: COLORS.white}}
              />
            </Pressable>
          </View>

          <View style={[styles.list, {paddingVertical: moderateScale(20)}]}>
            <View style={styles.subList}>
              <Text style={styles.extraboldTxt}>
                Total Reservation ( {selectedItem.length} )
              </Text>
            </View>
            {currentSelection === 'ticket' &&
              selectedItem.map((it, key) => (
                <View style={styles.subList} key={key}>
                  <Text style={styles.regularTxt}>
                    {it.ticketName} x{it.count}
                  </Text>
                  <Text style={styles.regularTxt}>
                    ${Number(it.totalprice).toFixed(2)}
                  </Text>
                </View>
              ))}
            {currentSelection === 'reservation' &&
              selectedItem.map((it, key) => (
                <>
                  <View style={styles.subList} key={key}>
                    <Text style={styles.regularTxt}>{it.TableType}</Text>
                    <Text style={styles.regularTxt}>
                      ${Number(it.price).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.subList}>
                    <Text
                      style={[
                        styles.regularTxt,
                        {fontSize: moderateScale(11), opacity: 0.7},
                      ]}>
                      Tables Available: {it.avlTable}
                    </Text>
                  </View>
                </>
              ))}
          </View>
          {currentSelection == 'reservation' ? (
            <View style={styles.gaplist}>
              <View style={styles.subList}>
                <Text style={styles.boldTxt}>Split the bill</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={splitBillStatus ? COLORS.theme : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={SplitSwitch}
                  value={splitBillStatus}
                />
              </View>
            </View>
          ) : null}

          {/* <View style={styles.gaplist}>
            <View style={styles.subList}>
              <Text style={styles.boldTxt}>Promo Code</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? COLORS.theme : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={PromoSwitch}
                value={isEnabled}
              />
            </View>
            <View style={styles.subList}>
              <Text
                style={[
                  styles.regularTxt,
                  {fontSize: moderateScale(11), opacity: 0.7},
                ]}>
                Promotion Discount ( 0% )
              </Text>
              <Text
                style={[
                  styles.regularTxt,
                  {fontSize: moderateScale(11), opacity: 0.7},
                ]}>
                $0
              </Text>
            </View>
          </View> */}

          <View style={styles.gaplist}>
            <View style={styles.subList}>
              <Text style={styles.regularTxt}>Subtotal</Text>
              <Text style={styles.regularTxt}>${subtotal}</Text>
            </View>
            {eventData?.tax ? (
              <>
                <View style={styles.subList}>
                  <Text style={styles.regularTxt}>Tax: {eventData?.tax}%</Text>
                  <Text style={styles.regularTxt}>${tax}</Text>
                </View>
                <View style={styles.subList}>
                  <Text style={styles.regularTxt}>Tip: {eventData?.tips}%</Text>
                  <Text style={styles.regularTxt}>${tips}</Text>
                </View>
              </>
            ) : null}
          </View>

          <View style={styles.gaplist}>
            <View style={styles.subList}>
              <Text style={styles.semiboldTxt}>Your Total</Text>
              <Text style={styles.extraboldTxt}>
                ${Number(total).toFixed(2)}
              </Text>
            </View>
          </View>
          {eventData?.tax ? (
            <>
              <View style={styles.gaplist}>
                <View style={styles.subList}>
                  <Text style={styles.semiboldTxt}>Deposit</Text>
                  <Text style={styles.semiboldTxt}>{eventData?.deposit}%</Text>
                </View>
              </View>
              <View style={styles.gaplist}>
                <View style={styles.subList}>
                  <Text style={styles.semiboldTxt}>Due Now</Text>
                  <Text style={styles.semiboldTxt}>${due}</Text>
                </View>
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: '85%',
        }}>
        <GradientButton
          title="Purchase"
          onPress={purchase}
          disabled={disabled}
          // onPress={() => Navigation.navigate('MyTicketAbout',{showLive:false,pending:false})}
        />
      </View>
      <Modal
        visible={promo}
        transparent={true}
        onRequestClose={() => setpromo(false)}>
        <PromoModal
          close={() => {
            setpromo(false);
            setIsEnabled(false);
          }}
          applyPromoCode={promoCode => applyPromoCode(promoCode)}
        />
      </Modal>
      <Modal
        visible={split}
        transparent={true}
        onRequestClose={() => setsplit(false)}>
        <SplitModal
          close={val => {
            setsplit(false);
            setsplitBillStatus(val);
          }}
        />
      </Modal>
      {/* <Modal 
      visible={cancel}
      transparent={true}
      onRequestClose={()=>setcancel(false)}>
         <CancelModal
            close={()=>setcancel(false)}
         />
      </Modal> */}
      <Modal
        visible={modal}
        transparent={true}
        onRequestClose={() => setmodal(false)}>
        <AuthModal
          close={val => {
            setmodal(false);
            val == true ? Navigation.navigate('MyCheckoutTicket') : null;
          }}
          buttonTitle="Confirm"
          verified={() => bookEvent()}
          userData={userData}
        />
      </Modal>
      <Modal
        visible={cardModal}
        transparent={true}
        onRequestClose={() => setcardModal(false)}>
        <CardList
          closeModal={() => setcardModal(false)}
          continuePay={data => {
            setcardData(data);
            setcardModal(false);
            if (continueBooking) {
              setmodal(true);
            }
          }}
        />
      </Modal>
    </CustomImageBackground>
  );
};

export default Checkout2;

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(25),
    borderBottomWidth: 0.7,
    borderColor: COLORS.textInput,
  },
  gaplist: {
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(15),
    borderBottomWidth: 0.7,
    borderColor: COLORS.textInput,
    alignSelf: 'center',
  },
  subList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  boldTxt: {
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    fontSize: moderateScale(13),
  },
  semiboldTxt: {
    color: COLORS.white,
    fontFamily: FONTS.SemiBold,
    fontSize: moderateScale(13),
  },
  extraboldTxt: {
    color: COLORS.white,
    fontFamily: FONTS.Bold,
    fontSize: moderateScale(17),
  },
  regularTxt: {
    color: COLORS.white,
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(12),
  },
});
