import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import EventCard from "../components/EventCard";

import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";

export default function Content() {
  const data = useData();
  const authState = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authState.isAuthenticated) {
      data.fetch();
    }
  }, [authState.isAuthenticated]);

  useEffect(() => {
    if (data.events) {
      setEvents(data.events);
    }
    setLoading(data.loading);
  }, [data.events, data.loading]);

  return loading ? (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      {events?.slice(0, 10)?.map((event) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  separator: {
    height: 10,
  },
  eventCard: {
    marginHorizontal: 10,
  },
});
