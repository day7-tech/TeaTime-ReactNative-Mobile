import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Success from "../../../components/Success/Success";
import UserCard from "../../../components/UserCard/UserCard";
import Typography from "../../../components/Typography/Typography";
import { ROUTE_TAB_NAVIGATOR } from "../../../navigators/RouteNames";

/**
 * Component that renders the screen for successful recognition sending.
 * @param {object} route - The route object passed from the navigator.
 * @param {object} navigation - The navigation object provided by the navigator.
 * @returns {JSX.Element} - The SendRecognitionSuccess component.
 */
const SendRecognitionSuccess = ({ route, navigation }) => {
  const { post } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(ROUTE_TAB_NAVIGATOR); // Navigate to the top of the stack
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Success
      subtitle="Recognition sent to"
      content={
        <View style={styles.container}>
          <View style={styles.centre}>
            {post ? (
              <UserCard name={post.uploader.name} image={post.uploader.image} />
            ) : null}
          </View>
          <View style={styles.centre}>
            <Typography style={styles.whimsical}>
              each recognition is special
            </Typography>
            <Typography style={styles.paragraph}>
              Thank you for appreciating their efforts 43% of care workers go
              under appreciated for their efforts.
            </Typography>
          </View>
        </View>
      }
    />
  );
};

export default SendRecognitionSuccess;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centre: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  whimsical: {
    fontWeight: 600,
    fontSize: 17,
    lineHeight: 22,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 11,
    textAlign: "center",
    maxWidth: "60%",
    marginBottom: 20,
    lineHeight: 13,
  },
});
