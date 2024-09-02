import React from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const DATA = [
  { id: "1", name: "Contact 1", status: "Online" },
  { id: "2", name: "Contact 2", status: "Offline" },
  { id: "3", name: "Contact 3", status: "Busy" },
]

const Item = ({ name, status }: { name: string; status: string }) => (
  <View style={styles.item}>
    <View style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
    <TouchableOpacity style={styles.callButton}>
      <Ionicons name="call" size={24} color="white" />
    </TouchableOpacity>
  </View>
)

export default function Connections() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Connections</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="grey" />
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity>
          <Ionicons name="mic" size={24} color="grey" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item name={item.name} status={item.status} />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        {/* <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="home" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="person" size={24} color="grey" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="chatbox" size={24} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="settings" size={24} color="grey" />
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconButton: {
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "grey",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    color: "grey",
  },
  callButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  footerButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: "grey",
    padding: 16,
    borderRadius: 40,
  },
})
