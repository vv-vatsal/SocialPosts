import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementDislike,
  decrementLike,
  incrementLike,
  incrementDislike,
} from '../../redux/homeSlice';
import TouchableText from '../../components/touchableText/TouchableText';
import commentSVG from '../../../assets/svgs/comment';
import {SvgXml} from 'react-native-svg';
import {getCommnts} from '../../redux/homeApiFun';
import CommentCard from '../../components/commentCard/CommentCard';
import PrimaryBtn from '../../components/primaryBtn/PrimaryBtn';
import SecondaryContainer from '../../components/containers/SecondaryContainer';
import {useIsFocused} from '@react-navigation/native';

const DetailsScreen = ({route, navigation}) => {
  const id = route.params.id;
  const totalData = useSelector(state => state.home.postData.posts);
  const item = totalData.filter(post => post.id === id)[0];
  const [commentsData, setCommentsData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.getParent()?.setOptions({tabBarStyle: null});
    }
  }, [isFocused, navigation]);


  const dispatch = useDispatch();
  useEffect(() => {
    if (!item.comments) {
      dispatch(getCommnts(item.id));

      setCommentsData(item?.comments?.comments);
    } else {
      setCommentsData(item?.comments?.comments);
    }
    // dispatch(getCommnts(item.id));
  }, [dispatch, item.comments]);

  const firstThreeItems = commentsData ? commentsData.slice(0, 3) : [];

  const [reactions, setReactions] = useState({});
  const isLiked = item.reactions?.likedByUser === 'like' ? true : false;
  const isDisliked = item.reactions?.likedByUser === 'dislike' ? true : false;

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

  const imageUrl = `https://dummyjson.com/image/400x200/008080/ffffff?text=${encodeURIComponent(
    item.title || 'No Title',
  )}`;

  const handleViewAll = () => {
    navigation.navigate('CommentsScreen', {commentsData});
  };

  return (
    <SecondaryContainer style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <FastImage source={{uri: imageUrl}} style={styles.image} />
          <View style={styles.backContainer}>
            <IconButton
              icon={'arrow-left'}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>
        <ScrollView>
          <View style={styles.titleContainer}>
            <FastImage source={{uri: imageUrl}} style={styles.titleImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Icon source={'dots-vertical'} size={25} />
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
            <View style={styles.comment}>
              <SvgXml xml={commentSVG} width={20} height={20} />
              <Text style={styles.likeText}>
                {commentsData ? commentsData.length : 0}
              </Text>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
              <View style={styles.tagContainer}>
                {item.tags.map(tag => (
                  <TouchableText text={`#${tag}`} textStyle={styles.tagText} />
                ))}
              </View>
              <FlatList
                data={firstThreeItems}
                renderItem={CommentCard}
                style={styles.commentList}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <PrimaryBtn
          mode="outlined"
          children="View all comments"
          onPress={handleViewAll}
        />
      </View>
    </SecondaryContainer>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'red',
    flex: 1,
  },
  image: {
    width: '100%',
    height: responsiveHeight(27),
  },
  titleContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    gap: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleImage: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: 100,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
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
  comment: {flexDirection: 'row', alignItems: 'center', gap: 10},
  title: {
    fontSize: RFValue(20),
    fontWeight: '600',
  },
  secondContainer: {
    paddingHorizontal: 15,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  tagText: {color: '#495ECA'},
  commentList: {
    marginTop: 20,
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
});
