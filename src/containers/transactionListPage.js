import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {s} from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar, Colors} from 'react-native-paper';
import Modal from 'react-native-modal';
import {transactionListActions} from '../Redux/actions/transactionListActions';
import RadioForm from 'react-native-simple-radio-button';
import {dateFormat, moneyFormat} from '../util';

const TransactionListsPage = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [data1, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  var radio_props = [
    {label: 'URUTKAN', value: 0},
    {label: 'NAMA A-Z', value: 1},
    {label: 'NAMA Z-A', value: 2},
    {label: 'Tanggal Terbaru', value: 3},
    {label: 'Tanggal Terlama', value: 4},
  ];

  let [radioValue, setRadioValue] = useState(radio_props[0]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setSearchText('');
      setLoader(true);
      setRadioValue(radio_props[0]);

      let res = await transactionListActions(); // FUNCTION DAPETIN DATA LIST

      setData(res);
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };

  const renderItem = ({item, props}) => {
    return <Item item={item} props={props} />;
  };

  const onUpdateText = text => {
    setSearchText(text);
  };

  const displayData = () => {
    console.log('search display data', searchText);
    let arr = [];
    if (searchText !== '' && data1.length !== 0) {
      console.log('search display data on', searchText);
      for (let x = 0; x < data1.length; x++) {
        if (
          data1[x].beneficiary_name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          data1[x].sender_bank
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          data1[x].beneficiary_bank
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          data1[x].amount.toString().includes(searchText)
        ) {
          arr.push(data1[x]);
        }
      }
      return arr;
    } else {
      console.log('search display data off', searchText);
      return data1;
    }
  };

  function capitalizeFirstLetter(string) {
    if (string.length > 4) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return string.toUpperCase();
    }
  }

  const Item = ({item, props}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('detail', {data: item})} // navigation.navigate('NAMA-SCREEN ada di file navigation.js, cari Stack.Screen -> name '); untuk navigasi pindah screen
      style={[s.View2]}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <View
          style={[
            s.View6,
            {
              backgroundColor:
                item.status === 'SUCCESS' ? '#4eb887' : '#f26c39',
            },
          ]}
        />
        <View style={{justifyContent: 'center', padding: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={s.Text2}>
              {capitalizeFirstLetter(item.beneficiary_bank)}
            </Text>
            <IconOcticons name="arrow-right" size={20} color="black" />
            <Text style={s.Text2}>
              {' '}
              {capitalizeFirstLetter(item.sender_bank)}
              {}
            </Text>
          </View>
          <Text style={s.Text3}>{item.beneficiary_name}</Text>
          <View style={{flexDirection: 'row', paddingVertical: 5}}>
            <Text style={s.Text3}>{moneyFormat(item.amount)}</Text>
            <IconOcticons name="primitive-dot" size={20} color="black" />
            <Text style={s.Text3}>{dateFormat(item.created_at)}</Text>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={item.status === 'SUCCESS' ? s.Text4 : s.Text5}>
            {item.status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  function onChangeRadio(value) {
    setRadioValue(radio_props[value]);
    setIsVisible(!isVisible);
    if (value == 1) {
      sorting(data1, 'asc');
    } else if (value == 2) {
      sorting(data1, 'desc');
    } else if (value == 3) {
      sortByDate(data1, 'oldest');
    } else if (value == 4) {
      sortByDate(data1, 'latest');
    } else {
    }
  }

  function sorting(data, ket) {
    if (ket == 'asc') {
      data.sort(function (a, b) {
        if (a.beneficiary_name < b.beneficiary_name) {
          return -1;
        }
        if (a.beneficiary_name > b.beneficiary_name) {
          return 1;
        }
        return 0;
      });
    } else {
      data.sort(function (a, b) {
        if (a.beneficiary_name > b.beneficiary_name) {
          return -1;
        }
        if (a.beneficiary_name < b.beneficiary_name) {
          return 1;
        }
        return 0;
      });
    }
    setData(data);
    return 0;
  }

  function sortByDate(data, ket) {
    if (ket === 'latest') {
      data.sort(function (a, b) {
        var dateA = a.created_at.replace(/-/gi, '/');
        var dateB = b.created_at.replace(/-/gi, '/');
        if (new Date(dateA).getTime() < new Date(dateB).getTime()) {
          return -1;
        }
        if (new Date(dateA).getTime() > new Date(dateB).getTime()) {
          return 1;
        }
        return 0;
      });
    } else {
      data.sort(function (a, b) {
        var dateA = a.created_at.replace(/-/gi, '/');
        var dateB = b.created_at.replace(/-/gi, '/');
        if (new Date(dateA).getTime() > new Date(dateB).getTime()) {
          return -1;
        }
        if (new Date(dateA).getTime() < new Date(dateB).getTime()) {
          return 1;
        }
        return 0;
      });
    }
    setData(data);
    return 0;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'transparent'}}>
        <ProgressBar indeterminate visible={loader} color={Colors.red800} />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}>
          <View style={s.View5}>
            <View style={{padding: 10, marginBottom: 20}}>
              <RadioForm
                radio_props={radio_props}
                initial={radioValue.value}
                formHorizontal={false}
                labelHorizontal={true}
                labelStyle={{marginBottom: 15}}
                buttonColor={'#f26c39'}
                buttonSize={10}
                animation={true}
                buttonStyle={{marginBottom: 50}}
                onPress={value => onChangeRadio(value)}
              />
            </View>
          </View>
        </Modal>
      </View>
      <View style={s.View4}>
        <View style={{flex: 1}}>
          <Icon name={'magnifying-glass'} size={20} color={'grey'} />
        </View>
        <View style={{flex: 9}}>
          <TextInput
            placeholder={'Cari nama, bank, atau nominal'}
            autoCapitalize="none"
            style={{fontSize: 12}}
            onChangeText={onUpdateText}
          />
        </View>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => setIsVisible(!isVisible)}>
          <Text
            style={{
              color: '#f26c39',
              fontSize: 15,
              fontWeight: 'bold',
              marginRight: 5,
            }}>
            {radioValue.label || 'URUTKAN'}
          </Text>
          <Icon name={'chevron-thin-down'} size={15} color={'#f26c39'} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayData()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={<View style={{marginTop: 10}} />}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>
              Data Tidak Tersedia
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default TransactionListsPage;
