import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import React from 'react';
import FastImage from 'react-native-fast-image';
import PrimaryContainer from '../containers/PrimaryContainer';
import {RFValue} from 'react-native-responsive-fontsize';

const CommentCard = item => {
  const comment = item.item;
  const commentsImageUrl = `https://dummyjson.com/image/400x200/008080/ffffff?text=${encodeURIComponent(
    comment.user.fullName || 'No Title',
  )}`;
  return (
    <PrimaryContainer style={styles.commentCard}>
      <View>
        <FastImage source={{uri: commentsImageUrl}} style={styles.titleImage} />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.commentTitle}>{comment.user.fullName}</Text>
        <Text>{comment.body}</Text>
        {comment.like ? (
          <View style={styles.likeCOntainer}>
            <Icon source={'thumb-up'} size={15} color="#495ECA" />
            <Text>{comment.likes}</Text>
          </View>
        ) : (
          <Text>2 min ago</Text>
        )}
      </View>
    </PrimaryContainer>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  commentCard: {
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 10,
    borderRadius: 5,
  },
  commentTitle: {fontWeight: '800', fontSize: RFValue(15)},
  titleImage: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: 100,
  },
  mainContainer: {gap: 5},
  likeCOntainer: {
    flexDirection: 'row',
    gap: 5,
  },
});
