import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Modal,
  Switch,
  StyleSheet,
  Pressable,
} from 'react-native';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import ReservationHeader from '../../Component/Header/BackCross';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import GlobalStyles from '../../Component/GlobalStyle';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Icon} from 'native-base';
import GradientButton from '../../Component/Button/GradientButton';
import PromoModal from '../../Component/Modal/PromoModal';
import SplitModal from '../../Component/Modal/SplitModal';
import CancelModal from '../../Component/Modal/CancelModal';
import SurveyModal from '../../Component/Modal/SurveyModal';
import Navigation from '../../Service/Navigation';
import AuthModal from '../../Component/Modal/AuthModal';
import {useSelector} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import EventService from '../../Service/Event';
import CardList from '../../Component/Modal/CardListModal';
import Event from '../../Service/Event';
import Auth from '../../Service/Auth';

const CheckoutSplitBill = props => {
  const {currentSelection, selectedItem, eventData, splitUser} =
    props.route.params;
  const organizerData = eventData?.organizerData;

  const {userData} = useSelector(state => state.User);
  console.log('splitUser=>>>', JSON.stringify(eventData));
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(true);
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

  useEffect(() => {
    if (currentSelection == 'ticket') {
      let subTotal = selectedItem.reduce((accumulator, object) => {
        return accumulator + object.t_price;
      }, 0);
      subTotal = subTotal / Number(splitUser.length + 1);
      console.log('subTotal=>>', subTotal);
      setsubtotal(subTotal);
      if (organizerData?.tax) {
        settax((subTotal * organizerData?.tax) / 100);
      }
      if (organizerData?.tips) {
        settips((subTotal * organizerData?.tips) / 100);
      }
      let totalAmt = subTotal / Number(splitUser.length + 1);
      if (organizerData?.tax) {
        totalAmt =
          (subTotal * organizerData?.tax) / 100 +
          (subTotal * organizerData?.tips) / 100 +
          subTotal;
        settotal(totalAmt);
        settotalWithDiscount(totalAmt);
      } else {
        settotal(totalAmt);
        settotalWithDiscount(totalAmt);
      }
      if (organizerData?.deposit) {
        setdue(((totalAmt * organizerData?.deposit) / 100).toFixed(2));
      }
    }
    if (currentSelection == 'reservation') {
      let subTotal = selectedItem.reduce((accumulator, object) => {
        return accumulator + object.price;
      }, 0);
      subTotal = subTotal / Number(splitUser.length + 1);
      setsubtotal(subTotal);
      if (organizerData?.tax) {
        settax((subTotal * organizerData?.tax) / 100);
      }
      if (organizerData?.tips) {
        settips((subTotal * organizerData?.tips) / 100);
      }
      let totalAmt = subTotal;
      if (organizerData?.tax) {
        totalAmt =
          (subTotal * organizerData?.tax) / 100 +
          (subTotal * organizerData?.tips) / 100 +
          subTotal;
        settotal(totalAmt);
        settotalWithDiscount(totalAmt);
      } else {
        settotal(totalAmt);
        settotalWithDiscount(totalAmt);
      }
      if (organizerData?.deposit) {
        setdue(((totalAmt * organizerData?.deposit) / 100).toFixed(2));
      }
    }
  }, [selectedItem]);

  const PromoSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setpromo(true);
  };

  const SplitSwitch = () => {
    setIsEnabled2(previousState => !previousState);
    setsplit(true);
  };

  // const renderTotalAmt = () => {
  //   let totalAmt;
  //   if (organizerData?.tax) {
  //     totalAmt =
  //       (subtotal * organizerData?.tax) / 100 +
  //       (subtotal * organizerData?.tips) / 100 +
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

  const bookEvent = async splitPaymentData => {
    let users = [];
    splitUser.forEach(element => {
      let dd = {
        userId: element._id,
      };
      users.push(dd);
    });
    // console.log('eventData->', eventData);
    setmodal(false);
    let data = {
      splitUsers: users,
      bookingStatus: 'complete',
      organizerId: eventData?.organizerId,
      eventId: eventData?.eventId,
      tickets: eventData?.tickets,
      bookingType: eventData?.bookingType,
      splitPaymentData,
    };
    console.log('datadatadata', data);

    const result = await EventService.updateEvent(eventData?._id, data);
    console.log('event booking', result);
    if (result && result.status) {
      SimpleToast.show('Event booking successfully!');
      Navigation.navigate('MyEventList');
    } else {
      SimpleToast.show(result?.message);
    }
  };

  const paySplitBillAmt = async () => {
    setmodal(false);
    setdisabled(true);
    SimpleToast.show("Making the payment, please don't leave the screen!!");

    const userProfileData = await Auth.getAccount();

    // console.log('userProfileData=>>>', userProfileData);

    let splitUserCardDetils = [];
    splitUserCardDetils = splitUser.map(element => ({
      source: element.userData[0]?.paymentmethods[0]?.cardId,
      stripeCUS: element.userData[0]?.stripeCUS,
      email: element.userData[0]?.email,
    }));

    splitUserCardDetils = [
      ...splitUserCardDetils,
      {
        source: cardData?.cardId,
        stripeCUS: userProfileData?.stripeCUS,
        email: userData?.email,
      },
    ];

    // console.log('setdisabled(false);>>', splitUserCardDetils);

    const data = {
      spliteList: splitUserCardDetils,
      BookingId: eventData?._id,
      amount: Number(total).toFixed(2),
    };
    console.log('data=>>', data);

    const result = await Event.paySplitNow(data);
    console.log('paySplitNow', result);
    setdisabled(false);
    if (result && result.status) {
      bookEvent(result.data);
    } else {
      SimpleToast.show('Payment failed!!!');
      setdisabled(false);
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
          <View style={styles.list}>
            <View style={styles.subList}>
              <Text style={styles.semiboldTxt}>Payment Method</Text>
              <Text style={styles.regularTxt}>xxx 7879 | Visa</Text>
            </View>
            <Pressable
              style={styles.subList}
              onPress={() => Navigation.navigate('PaymentInfo')}>
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
                <>
                  <View style={styles.subList} key={key}>
                    <Text style={styles.regularTxt}>{it.ticketName}</Text>
                    <Text style={styles.regularTxt}>
                      ${Number(it.t_price).toFixed(2)}
                    </Text>
                  </View>
                </>
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
                      Admission: {it.avlTable} members
                    </Text>
                  </View>
                </>
              ))}
          </View>
          {currentSelection == 'reservation' ? (
            <>
              <View style={styles.gaplist}>
                <View style={styles.subList}>
                  <Text style={styles.boldTxt}>Split the bill</Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled2 ? COLORS.theme : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={SplitSwitch}
                    value={isEnabled2}
                    disabled={true}
                  />
                </View>
              </View>
              {splitUser.map((itt, key) => (
                <View style={styles.gaplist} key={key}>
                  <View style={styles.subList}>
                    <Text style={styles.semiboldTxt}>
                      {key + 2}.{' '}
                      {itt?.fullname == undefined
                        ? itt?.firstname
                        : itt?.fullname}
                    </Text>
                    <Text style={styles.semiboldTxt}>
                      ${Number(subtotal).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          ) : null}

          <View style={styles.gaplist}>
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
          </View>

          <View style={styles.gaplist}>
            <View style={styles.subList}>
              <Text style={styles.regularTxt}>Subtotal</Text>
              <Text style={styles.regularTxt}>
                ${Number(subtotal).toFixed(2)}
              </Text>
            </View>
            {organizerData?.tax ? (
              <>
                <View style={styles.subList}>
                  <Text style={styles.regularTxt}>
                    Tax: {organizerData?.tax}%
                  </Text>
                  <Text style={styles.regularTxt}>
                    ${Number(tax).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.subList}>
                  <Text style={styles.regularTxt}>
                    Tip: {organizerData?.tips}%
                  </Text>
                  <Text style={styles.regularTxt}>
                    ${Number(tips).toFixed(2)}
                  </Text>
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
          {organizerData?.tax ? (
            <>
              <View style={styles.gaplist}>
                <View style={styles.subList}>
                  <Text style={styles.semiboldTxt}>Deposit</Text>
                  <Text style={styles.semiboldTxt}>
                    {organizerData?.deposit}%
                  </Text>
                </View>
              </View>
              <View style={styles.gaplist}>
                <View style={styles.subList}>
                  <Text style={styles.semiboldTxt}>Due Now</Text>
                  <Text style={styles.semiboldTxt}>
                    ${Number(due).toFixed(2)}
                  </Text>
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
          onPress={() => setcardModal(true)}
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
            val == true ? Navigation.navigate('MyCheckoutTicket') : null;
          }}
          buttonTitle="Confirm"
          verified={() => paySplitBillAmt()}
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
            setmodal(true);
          }}
        />
      </Modal>
    </CustomImageBackground>
  );
};

export default CheckoutSplitBill;

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
