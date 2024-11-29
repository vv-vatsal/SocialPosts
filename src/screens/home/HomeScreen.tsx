import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPost} from '../../redux/homeApiFun';
import FastImage from 'react-native-fast-image';
import Header from '../../components/header/Header';
import {Icon, IconButton} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import PrimaryContainer from '../../components/containers/PrimaryContainer';
import {
  decrementDislike,
  decrementLike,
  incrementDislike,
  incrementLike,
  resetPage,
} from '../../redux/homeSlice';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const HomeScreen = ({navigation}) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const data = useSelector(state => state.home.postData);
  const page = useSelector(state => state.home.page);
  const hasMore = useSelector(state => state.home.hasMore);

  const dispatch = useDispatch();

  const [reactions, setReactions] = useState({});

  const handleReactionPress = (postId, type) => {
    setReactions(prevState => {
      const currentReactions = prevState[postId] || {
        like: false,
        dislike: false,
      };

      if (type === 'like') {
        if (currentReactions.dislike) {
          dispatch(decrementDislike(postId));
        }
        return {
          ...prevState,
          [postId]: {
            like: !currentReactions.like,
            dislike: false,
          },
        };
      }

      if (type === 'dislike') {
        if (currentReactions.like) {
          dispatch(decrementLike(postId));
        }
        return {
          ...prevState,
          [postId]: {
            like: false,
            dislike: !currentReactions.dislike,
          },
        };
      }

      return prevState;
    });
  };

  const navigateToDetails = item => {
    navigation.navigate('DetailsScreen', item);
  };

  const renderPostCard = ({item}) => {
    const imageUrl = `https://dummyjson.com/image/400x200/008080/ffffff?text=${encodeURIComponent(
      item.title || 'No Title',
    )}`;

    const isLiked = item.reactions.likedByUser === 'like' ? true : false;
    const isDisliked = item.reactions.likedByUser === 'dislike' ? true : false;

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigateToDetails(item)}>
        <View style={styles.titleContainer}>
          <View style={styles.imageTitle}>
            <FastImage source={{uri: imageUrl}} style={styles.titleImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Icon source={'dots-vertical'} size={25} />
          </View>
        </View>
        <View style={styles.card}>
          <FastImage source={{uri: imageUrl}} style={styles.cardImage} />
          <View style={styles.views}>
            <Icon source={'eye'} size={20} />
            <Text>{item.views}</Text>
          </View>
          <View style={styles.likeContainer}>
            <View style={styles.like}>
              <IconButton
                icon={'thumb-up'}
                size={25}
                iconColor={isLiked ? '#495ECA' : 'gray'}
                onPress={() => {
                  handleReactionPress(item.id, 'like');
                  isLiked
                    ? dispatch(decrementLike(item.id))
                    : dispatch(incrementLike(item.id));
                }}
              />
              <Text style={styles.likeText}>{item.reactions.likes}</Text>
            </View>
            <View style={styles.like}>
              <IconButton
                icon={'thumb-down'}
                size={25}
                iconColor={isDisliked ? '#495ECA' : 'gray'}
                onPress={() => {
                  handleReactionPress(item.id, 'dislike');
                  isDisliked
                    ? dispatch(decrementDislike(item.id))
                    : dispatch(incrementDislike(item.id));
                }}
              />
              <Text style={styles.likeText}>{item.reactions.dislikes}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const loadMorePosts = () => {
    if (data.length === 0) {
      if (hasMore) {
        dispatch(getPost({page, limit: 50}));
      }
    }
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(resetPage());
    setIsRefreshing(false);
  };

  return (
    <PrimaryContainer style={styles.container}>
      <Header />
      <FlatList
        data={data.posts ? data.posts : []}
        renderItem={renderPostCard}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={
          <View style={styles.loading}>
            {hasMore ? (
              <ActivityIndicator size="large" color="#495ECA" />
            ) : null}
          </View>
        }
      />
    </PrimaryContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    gap: 10,
  },
  card: {},
  cardImage: {
    width: '100%',
    height: responsiveHeight(35),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  views: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#FFFFFF70',
    flexDirection: 'row',
    padding: 3,
    borderRadius: 4,
    right: 20,
    top: 20,
    gap: 3,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleImage: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: 100,
  },
  imageTitle: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  like: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memu: {marginHorizontal: -10},
  likeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  loading: {
    // flex: 1,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
