import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import GradientButton from '../../Component/Button/GradientButton';
import PaymentCard from '../../Component/Checkout/PaymentCard';
import ReservationHeader from '../../Component/Header/BackCross';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
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

const MenuCheckout = props => {
  const {eventData, eId, bId, menuData} = props.route.params;
  const organizerData = eventData?.organizerData;

  const {userData, guestLogin} = useSelector(state => state.User);
  console.log('eventData=>>>', JSON.stringify(menuData?.category));
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
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
    let subTotal = 0;
    menuData?.category.map(i => {
      return i.catItem.map(object => {
        console.log('accumulator=>>', object);
        if (object.count > 0) {
          subTotal += object.totalPrice;
        }
      }, 0);
    })[0];
    console.log('subTotal=>>', subTotal);
    setsubtotal(Number(subTotal).toFixed(2));
    if (eventData?.tax) {
      settax(Number((subTotal * eventData?.tax) / 100).toFixed(2));
    }
    if (eventData?.tips) {
      settips(Number((subTotal * eventData?.tips) / 100).toFixed(2));
    }
    let totalAmt = subTotal;
    if (eventData?.tax) {
      totalAmt = Number(
        (subTotal * eventData?.tax) / 100 +
          (subTotal * eventData?.tips) / 100 +
          subTotal,
      );
      console.log('totalAmt=>>', subTotal);
      settotal(Number(totalAmt).toFixed(2));
      settotalWithDiscount(totalAmt);
    } else {
      settotal(Number(totalAmt).toFixed(2));
      settotalWithDiscount(totalAmt);
    }
    if (eventData?.depositPercentage) {
      setdue(
        Number((totalAmt * eventData?.depositPercentage) / 100).toFixed(2),
      );
    }
  }, [menuData?.category]);

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
    setIsEnabled2(previousState => !previousState);
    setsplit(true);
  };

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
    // if (guestLogin) {
    //   SimpleToast.show('You need to login to view profile!');
    //   return;
    // } else {
    //   // setmodal(true);
    //   setcardModal(true);
    // }

    if (guestLogin) {
      SimpleToast.show('You need to login to view profile!');
      return;
    } else {
      setcontinueBooking(true);
      if (Object.keys(cardData).length > 0) {
        setmodal(true);
      } else {
        setcardModal(true);
      }
    }
  };

  const bookEvent = async () => {
    setmodal(false);

    let data = {
      eventId: eId,
      organizerId: eventData?.organizerId,
      bookingType: 'menu',
      tickets: [menuData],
      userId: userData?._id,
      tax: tax,
      tips: tips,
      subtotal: subtotal,
      total: total,
      due: 0,
      taxPercentage: eventData?.tax === undefined ? '0' : eventData?.tax,
      tipsPercentage: eventData?.tips === undefined ? '0' : eventData?.tips,
      depositPercentage:
        eventData?.deposit === undefined ? '0' : eventData?.deposit,
      propmoCode: promoC,
      promocodeDiscount: Number(promoDiscount),
      split: false,
      bookingStatus: 'pending',
    };
    console.log('menu booking payload', JSON.stringify(data));
    // return;
    const result = await EventService.eventBooking(data);
    console.log('event menu booking result', result);
    if (result && result.status) {
      // SimpleToast.show('Menu booking successfully!');
      // Navigation.navigate('MyTickets');
      SimpleToast.show("Making the payment, please don't leave the screen!!");
      continuePayment(result.data._id);
    } else {
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
      eventId: eId,
      organizerId: eventData?.organizerId,
      bookingType: 'menu',
      tickets: [menuData],
      bookingStatus: 'complete',
      paymentId: payId,
    };
    console.log('update event payload', data);

    const result = await EventService.updateEvent(bookingId, data);
    if (result && result.status) {
      setdisabled(false);
      SimpleToast.show('Menu booking successfully!');
      Navigation.navigate('MyTickets');
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: 70}}>
          <PaymentCard
            cardData={cardData}
            newPaymentCallbBack={() => {
              setcontinueBooking(false);
              setcardModal(true);
            }}
          />
          <View style={[styles.list, {paddingVertical: moderateScale(20)}]}>
            {menuData?.category?.map((item, key) =>
              item?.catItem
                .filter(ii => ii.count > 0)
                .map((i, index) => (
                  <View
                    style={{...styles.subList, justifyContent: 'space-between'}}
                    key={index}>
                    <View style={{width: '35%'}}>
                      <Text style={styles.regularTxt}>{i.menuItem}</Text>
                    </View>
                    <Text style={styles.regularTxt}>
                      ${i.itemPrice} x {i.count}
                    </Text>
                    <Text style={styles.semiboldTxt}>
                      ${Number(i.totalPrice).toFixed(2)}
                    </Text>
                  </View>
                )),
            )}
            {/* {currentSelection === 'reservation' &&
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
                      Admission: {it.avlTable} members
                    </Text>
                  </View>
                </>
              ))} */}
          </View>
          {/* {currentSelection == 'reservation' ? (
            <View style={styles.gaplist}>
              <View style={styles.subList}>
                <Text style={styles.boldTxt}>Split the bill</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled2 ? COLORS.theme : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={SplitSwitch}
                  value={isEnabled2}
                />
              </View>
            </View>
          ) : null} */}

          <View style={styles.gaplist}>
            {eventData?.tax >= 0 ? (
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
            <View style={styles.subList}>
              <Text style={styles.regularTxt}>Subtotal</Text>
              <Text style={styles.regularTxt}>${subtotal}</Text>
            </View>
          </View>

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

          <View style={{...styles.gaplist, borderBottomWidth: 0}}>
            <View style={styles.subList}>
              <Text style={styles.semiboldTxt}>Your Total</Text>
              <Text style={styles.extraboldTxt}>
                ${Number(total).toFixed(2)}
              </Text>
            </View>
          </View>
          {/* {eventData?.tax ? (
            <>
              <View style={styles.gaplist}>
                <View style={styles.subList}>
                  <Text style={styles.semiboldTxt}>Deposit</Text>
                  <Text style={styles.semiboldTxt}>
                    {eventData?.depositPercentage}%
                  </Text>
                </View>
              </View>
              <View style={styles.gaplist}>
                <View style={styles.subList}>
                  <Text style={styles.semiboldTxt}>Due Now</Text>
                  <Text style={styles.semiboldTxt}>${due}</Text>
                </View>
              </View>
            </>
          ) : null} */}
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
          disabled={disabled}
          title="Purchase"
          onPress={purchase}
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
            setIsEnabled2(val);
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
            // val == true ? Navigation.navigate('MyCheckoutTicket') : null;
          }}
          buttonTitle="Confirm"
          verified={() => bookEvent()}
          userData={userData}
        />
      </Modal>
      <Modal
        visible={cancel}
        transparent={true}
        onRequestClose={() => setcancel(false)}>
        <SurveyModal close={() => setcancel(false)} />
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

export default MenuCheckout;

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
