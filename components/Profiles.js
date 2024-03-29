import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS } from '../constants'; // Import FONTS

const Profiles = ({ profiles }) => {
    if (profiles <= 3) {
        return (
            <View style={styles.container}>
                {profiles.map((item, index) => {
                    return (
                        <View key={`profile-${index}`} style={index === 0 ? null : { marginLeft: -15 }}>
                            <Image source={item.profile} resizeMode='cover' style={styles.profileImage} />
                        </View>
                    );
                })}
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                {profiles.map((item, index) => {
                    if (index <= 2) {
                        return (
                            <View key={`profile-${index}`} style={index === 0 ? null : { marginLeft: -15 }}>
                                <Image source={item.profile} resizeMode='cover' style={styles.profileImage} />
                            </View>
                        );
                    }
                    return null; // added to satisfy the linter
                })}
                <Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h3 }}>
                    +{profiles.length - 3}
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.black
    }
});

export default Profiles;
