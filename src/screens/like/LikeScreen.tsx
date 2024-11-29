import {StyleSheet, View, FlatList} from 'react-native';
import {Divider, IconButton, Text} from 'react-native-paper';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import PrimaryContainer from '../../components/containers/PrimaryContainer';
import {RFValue} from 'react-native-responsive-fontsize';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {incrementDislike} from '../../redux/homeSlice';

const LikeScreen = () => {
  const dispatch = useDispatch();
  const allData = useSelector(state => state.home.postData.posts);

  const data = Array.isArray(allData)
    ? allData.filter(
        post => post.reactions && post.reactions.likedByUser === 'like',
      )
    : [];

  const likeCard = item => {
    const post = item.item;
    const imageUrl = `https://dummyjson.com/image/400x200/008080/ffffff?text=${encodeURIComponent(
      post.title || 'No Title',
    )}`;
    return (
      <Swipeable
        renderLeftActions={() => (
          <View style={styles.swipedContainer}>
            <IconButton
              icon={'thumb-down'}
              onPress={() => {
                dispatch(incrementDislike(post.id));
              }}
            />
          </View>
        )}>
        <View style={styles.imageContainer}>
          <FastImage source={{uri: imageUrl}} style={styles.imageStyle} />
          <View style={styles.data}>
            <Text>User Id : {post.userId}</Text>
            <Text>{post.title}</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView>
      <PrimaryContainer style={styles.container}>
        <Text style={styles.headerText}>Liked Post</Text>
        <Divider style={styles.divider} />
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={likeCard}
            showsVerticalScrollIndicator={false}
            style={styles.list}
          />
        ) : (
          <View style={styles.noPost}>
            <Text>You haven't liked any posts yet!</Text>
          </View>
        )}
      </PrimaryContainer>
    </GestureHandlerRootView>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 20,
    overflow: 'hidden',
    gap: 10,
  },
  imageStyle: {
    height: RFValue(90),
    width: RFValue(90),
  },
  data: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  swipedContainer: {
    width: responsiveWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPost: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: RFValue(20),
    fontWeight: '900',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  divider: {
    marginBottom: 10,
  },
  list: {
    marginBottom: 40,
  },
});
