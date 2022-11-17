import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import EventList from '../../Component/Event/EventList';
import HomeHeader from '../../Component/Header/HomeHeader';
import CustomImageBackground from '../../Component/ImageBackground/CustomImageBackground';
import Loader from '../../Component/Loader';
import HomeCityModal from '../../Component/Modal/HomeCityModal';
import HomeSearch from '../../Component/Search/HomeSearch';
import {moderateScale} from '../../PixelRatio';
import Event from '../../Service/Event';

export default function Home() {
  const [allEvent, setallEvent] = useState([]);
  const [allEventBackup, setallEventBackup] = useState([]);
  const [isFetching, setisFetching] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [cityStateModal, setcityStateModal] = React.useState(false);
  const [selectedStateCity, setselectedStateCity] = React.useState({});
  const [defaultCityState, setdefaultCityState] =
    React.useState('New York City, NY');

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const result = await Event.getAllEvent();
    console.log('event data', JSON.stringify(result));
    if (result && result.status) {
      setallEvent(result.data.filter(i => i.city == 122795 && i.state == 1452));
      setallEventBackup(result.data);
      setisFetching(false);
    }
    setRefreshing(false);
  };

  const searchEvent = data => {
    let result = allEventBackup.filter(it => {
      return it.name.toLowerCase().match(data.toLowerCase());
    });
    setallEvent(result);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getEvents();
    setselectedStateCity({});
  }, []);

  const filterEvent = item => {
    const data = allEventBackup.filter(
      i => i.city == item._id.city && i.state == item._id.state,
    );
    setallEvent(data);
  };

  return (
    <CustomImageBackground>
      <HomeHeader
        //  {item?.cityData?.name}, {item?.stateData?.name}
        title={
          Object.keys(selectedStateCity).length > 0
            ? selectedStateCity.cityData?.name +
              ', ' +
              selectedStateCity.cityData?.state_code
            : defaultCityState
        }
        icon={true}
        arrowPress={() => setcityStateModal(!cityStateModal)}
      />
      {isFetching ? (
        <Loader />
      ) : (
        // <ScrollView
        //   style={{marginHorizontal: moderateScale(30)}}
        //   showsVerticalScrollIndicator={false}>
        //   <HomeSearch searchData={val => searchEvent(val)} />
        //   {allEvent.map((item, key) => (
        //     <EventList key={key} item={item} />
        //   ))}
        // </ScrollView>
        <FlatList
          // data={allEvent}
          data={_.orderBy(allEvent, ['startDate'], ['asc'])}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginHorizontal: moderateScale(30)}}
          ListHeaderComponent={
            <HomeSearch searchData={val => searchEvent(val)} />
          }
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => <EventList item={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      <HomeCityModal
        visible={cityStateModal}
        title="City, State"
        Close={() => setcityStateModal(false)}
        onClick={data => {
          filterEvent(data);
          setselectedStateCity(data);
          setcityStateModal(false);
        }}
      />
    </CustomImageBackground>
  );
}

const styles = StyleSheet.create({});
