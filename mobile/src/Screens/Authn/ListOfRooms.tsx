import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {primaryColor, styles} from '../Styles/Styles';
import {fetchRooms} from '../../reducers/room/roomSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers/store';

const data = [
  {
    id: '1',
    name: 'Nitish Kumar',
    location: 'Delhi',
    rent: 1500,
    lookingFor: 'Male',
    match: 54,
    image: 'https://thumbs.dreamstime.com/b/hotel-rooms-8146308.jpg',
    distance: 5,
  },
  {
    id: '2',
    name: 'John Doe',
    location: 'Mumbai',
    rent: 1800,
    lookingFor: 'Female',
    match: 62,
    image:
      'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=',
    distance: 10,
  },
  {
    id: '3',
    name: 'Rajesh',
    location: 'Udaipur',
    rent: 1400,
    lookingFor: 'Female',
    match: 62,
    image:
      'https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg',
    distance: 10,
  },
  {
    id: '4',
    name: 'Sanjay Kumar',
    location: 'Mumbai',
    rent: 1300,
    lookingFor: 'Female',
    match: 62,
    image:
      'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=',
    distance: 10,
  },
  {
    id: '5',
    name: 'John Doe',
    location: 'Udaipur',
    rent: 1500,
    lookingFor: 'Female',
    match: 62,
    image: 'https://thumbs.dreamstime.com/b/hotel-rooms-8146308.jpg',
    distance: 10,
  },
  {
    id: '6',
    name: 'John Doe',
    location: 'Nearby',
    rent: 1600,
    lookingFor: 'Female',
    match: 62,
    image:
      'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=',
    distance: 10,
  },
  // Add more data here
];
const ListOfRooms = ({navigation}) => {
  const dispatch = useDispatch();
  const {data, screen} = useSelector((state: RootState) => state.room);

  const [openGender, setOpenGender] = useState(false);
  const [filterGender, setFilterGender] = useState('Both');
  const [openLocation, setOpenLocation] = useState(false);
  const [filterLocation, setFilterLocation] = useState('All Delhi');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchRooms());
  }, []);
  const handleFilterPress = () => {
    navigation.navigate('FilterScreen');
  };
  const applyFilters = () => {
    const filters: Partial<Room> = {};

    if (filterGender !== 'Both') {
      filters.gender = filterGender;
      console.log(filterGender);
    }

    if (filterLocation !== 'All Delhi') {
      filters.location = filterLocation;
    }

    if (searchQuery.trim() !== '') {
      filters.roomName = searchQuery;
    }

    dispatch(fetchRooms(10, 1, filters));
    return (
      <View style={styles.roomlistcontainer}>
        <View style={styles.searchBarContainer}>
          <Image source={require('../Images/ic_search.png')} style={styles.searchIcon} />
          <TextInput
            placeholder='Search by name or location...'
            placeholderTextColor='#666'
            style={styles.searchinput}
            value={searchQuery}
            onChangeText={setSearchQuery}
  
          />
          <TouchableOpacity onPress={handleFilterPress}>
          <Image source={require('../Images/ic_filter.png')} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
        {screen.isBusy ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={{flexDirection: 'row'}}>
        {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
        <View style={styles.info}>
          <Text style={[styles.name, {paddingBottom: 10}]}>{item.name}</Text>
          <View style={{flexDirection: 'row', gap: 5, paddingBottom: 10}}>
            <Image
              source={require('../Images/ic_location.png')}
              tintColor={primaryColor}
            />
            <Text style={styles.location}>{item.address}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 30}}>
            <Text style={[{paddingLeft: 5, fontSize: 16}]}>Rent</Text>
            <Text style={[{paddingLeft: 51, fontSize: 16}]}>Looking for</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 45, paddingBottom: 10}}>
            <Text style={[styles.rent, {marginRight: 20}]}> ₹{item.rent}</Text>
            <Text style={[styles.lookingFor]}> {item.gender}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 10}}>
            <Text style={styles.distance}>{item.distance} Km</Text>
            <Text style={{fontSize: 16, color: '#000'}}> from your search</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 20}}>
            <Text style={[styles.match, {paddingBottom: 10}]}>
              Match: {item.match}%
            </Text>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>SEE DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const genderItems = [
    {label: 'Both', value: 'Both'},
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];

  const locationItems = [
    {label: 'All Delhi', value: 'All Delhi'},
    {label: 'Mumbai', value: 'Mumbai'},
    {label: 'Nearby', value: 'Nellore'},
    {label: 'Panjam', value: 'Panjam'},
    {label: 'Nearby', value: 'Nearby'},
  ];

  return (
    <View style={styles.roomlistcontainer}>
      <View style={styles.searchBarContainer}>
        <Image source={require('../Images/ic_search.png')} style={styles.searchIcon} />
        <TextInput
          placeholder='Search by name or location...'
          placeholderTextColor='#666'
          style={styles.searchinput}
          value={searchQuery}
          onChangeText={setSearchQuery}

        />
        <TouchableOpacity onPress={handleFilterPress}>
        <Image source={require('../Images/ic_filter.png')} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      {screen.isBusy ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default ListOfRooms;
