import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import CommentCard from '../../components/commentCard/CommentCard';
import {useIsFocused} from '@react-navigation/native';

const CommentsScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.getParent()?.setOptions({tabBarStyle: null});
    }
  }, [isFocused, navigation]);

  const data = route.params.commentsData;
  const renderCommentCard = ({item}) => {
    return <CommentCard item={{...item, like: true}} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderCommentCard}
        style={styles.commentList}
      />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {padding: 10},
  commentList: {
    marginTop: 15,
  },
});
