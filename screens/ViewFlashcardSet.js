//ViewFlashcardSet.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const ViewFlashcardSet = () => {
  const route = useRoute();
  const { setId } = route.params;
  const [flashcardSet, setFlashcardSet] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipAnimation, setFlipAnimation] = useState(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);

  // Load the flashcard set
  useEffect(() => {
    const loadFlashcardSet = async () => {
      const setData = await AsyncStorage.getItem(setId);
      if (setData) {
        setFlashcardSet(JSON.parse(setData));
      }
    };

    loadFlashcardSet();
  }, [setId]);

  const resetCardFlip = () => {
    setIsFlipped(false);
    flipAnimation.setValue(0);
  };

  // Flip animation
  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };
  const goToNextCard = () => {
    if (currentIndex < flashcardSet.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCardFlip(); 
    }
  };

  // Go to the previous card
  const goToPreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetCardFlip(); 
    }
  };
  const frontAnimatedStyle = {
    transform: [
      { rotateY: flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
      })}
    ]
  };

  const backAnimatedStyle = {
    transform: [
      { rotateY: flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
      })}
    ]
  };

  if (!flashcardSet) {
    return <Text>Loading...</Text>;
  }

  const card = flashcardSet.cards[currentIndex];

  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Text style={styles.cardText}>{card.front}</Text>
        </Animated.View>
        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
          <Text style={styles.cardText}>{card.back}</Text>
        </Animated.View>
      </View>

      <TouchableOpacity style={styles.button} onPress={flipCard}>
        <Text>Flip Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToPreviousCard}>
        <Text>Previous Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToNextCard}>
        <Text>Next Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    card: {
      width: 300,
      height: 200,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      backfaceVisibility: 'hidden',
      
    },
    cardBack: {
      top: 0,
      transform: [{ rotateY: '180deg' }],
    },
    cardText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    button: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#ddd',
      borderRadius: 5,
    },
  });
  

export default ViewFlashcardSet;
