import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import BackCross from '../../Component/Header/BackCross';
import {COLORS} from '../../Constant/Colors';
import {FONTS} from '../../Constant/Font';
import StarRating from 'react-native-star-rating';
import {moderateScale} from '../../PixelRatio';
import GradientButton from '../../Component/Button/GradientButton';
import NormalButton from '../../Component/Button/NormalButton';
import Auth from '../../Service/Auth';
import Loader from '../../Component/Loader';
import {BASE_DOMAIN} from '../../Utils/HttpClient';
import OrganizerEvents from './OrganizerEvents';
import OrganizerReview from './OrganizerReview';
import {useSelector} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';

const ViewOrganizer = props => {
  const {oId} = props.route.params;
  const {userData} = useSelector(state => state.User);
  const [activeTab, setactiveTab] = useState(1);
  const [organizerData, setorganizerData] = useState({});
  const [isFetching, setisFetching] = useState(true);
  const [avgReview, setavgReview] = useState(0);
  const [reviewLength, setreviewLength] = useState(0);
  const [follower, setfollower] = useState(0);
  const [followStatus, setfollowStatus] = useState('Follow');
  const [followButton, setfollowButton] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await Auth.viewOrganizerProfile(
      oId + '?user=' + userData._id,
    );
    console.log('result =0 css', JSON.stringify(result));
    if (result && result.status) {
      setorganizerData(result.data);
      setfollower(result.data?.follower.filter(i => i.accpect == true).length);
      setreviewLength(result?.data?.eventreviews?.length);
      const totalReview = result?.data?.eventreviews?.reduce(
        (accumulator, object) => {
          return Number(accumulator) + Number(object.rating);
        },
        0,
      );
      if (result?.data?.eventreviews?.length) {
        setavgReview(
          Number(totalReview / result?.data?.eventreviews?.length).toFixed(1),
        );
      }
      if (result?.data?.follower) {
        const checkFollowStatus = result?.data?.follower.filter(
          i => i.receiver == userData._id || i.sender == userData._id,
        );
        console.log('checkFollowStatus=>>', checkFollowStatus);
        if (checkFollowStatus.length > 0) {
          const followCheck = checkFollowStatus.filter(i => i.accpect == true);
          if (followCheck && followCheck.length > 0) {
            setfollowStatus('Following');
          } else {
            setfollowStatus('Following Requested');
            setfollowButton(true);
          }
        } else {
          setfollowButton(false);
        }
      } else {
        setfollowButton(false);
      }
    }
    setisFetching(false);
  };

  const handleFollow = async () => {
    const result = await Auth.followOrganizer({
      receiver: organizerData._id,
    });
    console.log('handleFollow=>>', result);
    if (result && result.status) {
      SimpleToast.show('Follow requested successfully!');
      setfollowStatus('Following Requested');
      setfollowButton(true);
    }
  };

  return (
    <CustomImageBackground>
      <BackCross moreIcon={true} />
      {isFetching ? (
        <Loader />
      ) : (
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Image
              style={{
                width: 70,
                height: 70,
                resizeMode: 'cover',
                borderRadius: 35,
                backgroundColor: COLORS.lightgray,
              }}
              source={{
                uri: BASE_DOMAIN + organizerData?.image,
              }}
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
                {organizerData?.events.length}
              </Text>
              <Text style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
                Events
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
                {follower}
              </Text>
              <Text style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
                Followers
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
                {reviewLength}
              </Text>
              <Text style={{color: COLORS.white, fontFamily: FONTS.Medium}}>
                Reviews
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 30,
              marginVertical: 10,
            }}>
            <View>
              <Text style={{color: COLORS.white, fontFamily: FONTS.Bold}}>
                {organizerData?.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  //   marginLeft: 10,
                }}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={avgReview}
                  starSize={10}
                  starStyle={{color: COLORS.orange}}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.Regular,
                    fontSize: moderateScale(10),
                    marginLeft: 5,
                  }}>
                  {avgReview}
                </Text>
              </View>
            </View>
            {/* <NormalButton
              disabled={followButton}
              onPress={handleFollow}
              title={followStatus}
              style={{maxWidth: '70%', height: 40, paddingHorizontal: 10}}
              titleStyle={{fontFamily: FONTS.Medium}}
            /> */}
            <TouchableOpacity
              onPress={handleFollow}
              disabled={followButton}
              style={{
                backgroundColor: COLORS.theme,
                height: 40,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
              }}>
              <Text style={{fontFamily: FONTS.Medium, color: COLORS.white}}>
                {followStatus}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{marginHorizontal: 30, color: COLORS.white}}>
            {organizerData?.organizerInformation}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View
              style={{
                flex: 1,
                borderBottomWidth: 2,
                borderColor: COLORS.theme,
              }}
            />
            <TouchableOpacity
              onPress={() => setactiveTab(1)}
              style={{
                borderBottomWidth: 2,
                borderColor: activeTab == 1 ? COLORS.white : COLORS.theme,
                paddingHorizontal: 15,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.Medium,
                  textTransform: 'uppercase',
                  opacity: activeTab == 1 ? 1 : 0.7,
                }}>
                Events
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setactiveTab(2)}
              style={{
                borderBottomWidth: 2,
                borderColor: activeTab == 2 ? COLORS.white : COLORS.theme,
                paddingHorizontal: 15,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.Medium,
                  textTransform: 'uppercase',
                  opacity: activeTab == 2 ? 1 : 0.7,
                }}>
                Reviews
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                borderBottomWidth: 2,
                borderColor: COLORS.theme,
              }}
            />
          </View>
          <ScrollView>
            {activeTab == 1 ? (
              <OrganizerEvents data={organizerData?.events} />
            ) : (
              <OrganizerReview
                allReview={organizerData?.eventreviews}
                avgReview={avgReview}
              />
            )}
          </ScrollView>
        </View>
      )}
    </CustomImageBackground>
  );
};

export default ViewOrganizer;
