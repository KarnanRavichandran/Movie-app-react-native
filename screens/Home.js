import React,{useRef} from 'react';
import { View, Text, TouchableOpacity, Image,Animated, ImageBackground,StatusBar, FlatList, TouchableWithoutFeedback, ScrollView, SafeAreaView } from 'react-native';

// Assuming you have these constants defined
import { SIZES, COLORS, FONTS, images, icons, dummyData } from '../constants';
import { ProgressBar,Profiles } from '../components';



const Home = ({ navigation }) => {

  const newSeasonScrollx = useRef(new Animated.Value(0)).current;
  function renderHeader() {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.base
      }}>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 50, height: 50 }}>
          <Image source={images.karnan} style={{ width: 40, height: 50, borderRadius: 20 }} />
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 50, height: 50 }}>
          <Image source={icons.airplay} style={{ width: 20, height: 20, tintColor: COLORS.primary }} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderNewSeasonSection() {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={{
          marginTop: SIZES.radius
        }}
        data={dummyData.newSeason}
      keyExtractor={(item) => item.id.toString()}
     onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { x: newSeasonScrollx } } }],
    { useNativeDriver: false }
  )}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback onPress={() => {
              navigation.navigate("MovieDetail", {
                selectedMovie: item
              });
            }}>
              <View style={{ width: SIZES.width, alignItems: "center", justifyContent: "center" }}>
                <ImageBackground
                  source={item.thumbnail}
                  resizeMode="cover"
                  style={{ width: SIZES.width * 0.85, height: SIZES.width * 0.85, justifyContent: "flex-end" }}
                  imageStyle={{ borderRadius: 40 }}
                >
                  <View style={{ flexDirection: "row", height: 60, width: "100%", marginBottom: SIZES.radius, paddingHorizontal: SIZES.radius }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                      <View style={{ alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.transparentBlack }}>
                        <Image source={icons.play} resizeMode='contain' style={{ width: 15, height: 15 , tintColor: COLORS.white }} />
                        <Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h3 }}>PLAY NOW</Text>
                      </View>
                      {item.stillWatching && item.stillWatching.length > 0 && (
                        <View style={{ justifyContent: 'center' }}>
                          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Still Watching</Text>
                          <Profiles profiles={item.stillWatching} />
                        </View>
                      )}

                    </View>
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(newSeasonScrollx, SIZES.width);
  
    return (
      <View style={{ marginTop: SIZES.padding, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {dummyData.newSeason.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp', // Fix typo here
          });
  
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: 'clamp', // Fix typo here
          });
  
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: 'clamp', // Fix typo here
          });
  
          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                borderRadius: SIZES.radius,
                marginHorizontal: 3,
                width: dotWidth,
                height: 6,
                backgroundColor: dotColor,
              }}
            ></Animated.View>
          );
        })}
      </View>
    );
  }
  
  function renderContinueWatchingSeason() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <StatusBar hidden={true} />
        <View style={{ flexDirection: "row", paddingHorizontal: SIZES.padding, alignItems: "center" }}>
          <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
            Continue Watching
          </Text>
          <Image source={icons.right_arrow} style={{ width: 20, height: 20, tintColor: COLORS.primary }} />
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding
          }}
          data={dummyData.continueWatching}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback onPress={() => navigation.navigate('MovieDetail', {
                selectedMovie: item
              })}>
                <View style={{
                  marginLeft: index === 0 ? SIZES.padding : 20,
                  marginRight: index === dummyData.continueWatching.length - 1 ? SIZES.padding : 0
                }}>
                  <Image source={item.thumbnail} resizeMode='cover' style={{ width: SIZES.width / 3, height: SIZES.width/3, borderRadius: 20 }} />
                  <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h4 }}>{item.name}</Text>
                  <ProgressBar containerStyle={{marginTop:SIZES.radius,}} barStyle={{height:3}} barPercentage={item.overallProgress} />
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  }
  



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {renderHeader()}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {renderNewSeasonSection()}
        {renderDots()}
        {renderContinueWatchingSeason()}
        {/* Add any other content inside the ScrollView if needed */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;