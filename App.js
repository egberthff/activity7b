import React, { useState } from 'react';
import { Pressable, Button, ScrollView, Text, View, StyleSheet, Dimensions, StatusBar, TextInput, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Vview from './src/viewingStudents';
import { Picker } from "@react-native-picker/picker";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [Username, setUsername] = useState(null);
  const [Password, setPassword] = useState(null);
  const [Firstname, setFirstname] = useState(null);
  const [Lastname, setLastname] = useState(null);
  const [Course, setCourse] = useState(null);

  const handleAddStudent = async () => {
    const student = {
      ID: Math.floor(Math.random() * 10000),
      Data: {
        Username,
        Password,
        Firstname,
        Lastname,
        Course,
      },
    };

    try {
      if (
        Username !== null && Password !== null && Firstname !== null && Lastname !== null && Course !== null
      ) {
        const existingStudents = await AsyncStorage.getItem('students');
        let students = JSON.parse(existingStudents) || [];

        students.push(student);
        await AsyncStorage.setItem('students', JSON.stringify(students));
        setUsername(null);
        setPassword(null);
        setFirstname(null);
        setLastname(null);
        setCourse(null);
        ToastAndroid.show('Student added successfully!', ToastAndroid.LONG, ToastAndroid.CENTER);
      } else {
        ToastAndroid.show('All fields must have a value', ToastAndroid.LONG, ToastAndroid.CENTER)
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show('An error occurred while adding the student.', ToastAndroid.LONG, ToastAndroid.CENTER);
    }

  };

  return (

    <View style={styles.container}>
      <Text style={styles.headerText}>Register Student</Text>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView>
        <View style={{ ...styles.formContainer, margin: -10 }}>
          <View style={styles.fieldDivider}>
            <TextInput
              style={styles.input}
              onChangeText={setFirstname}
              value={Firstname}
              placeholder='Firstname'
            />
            <TextInput
              style={styles.input}
              onChangeText={setLastname}
              value={Lastname}
              placeholder='Lastname'
            />
            <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'white', backgroundColor: 'white', overflow: 'hidden', width: 325, marginLeft: 13, height: 45, justifyContent: 'center', marginTop: 10, alignItems: 'center' }}>
              <Picker
                selectedValue={Course}
                style={{ height: 50, width: screenWidth * 0.78, backgroundColor: 'white', marginLeft: screenWidth * 0.03, marginTop: 10 }}
                mode={'dropdown'}
                onValueChange={(itemValue) => setCourse(itemValue)}>
                <Picker.Item label="Select Course" />
                <Picker.Item label="BSIT" value="BSIT" />
                <Picker.Item label="BSCS" value="BSCS" />
                <Picker.Item label="BSED" value="BSED" />
                <Picker.Item label="BSMT" value="BSMT" />
                <Picker.Item label="BSCRIM" value="BSCRIM" />
              </Picker>
            </View>
          </View>
          <View style={[styles.fieldDivider, { marginTop: 50 }]}>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={Username}
              placeholder='Username'
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={Password}
              placeholder='Password'
            />
          </View>
          <View style={styles.fieldDivider}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'lightgreen' : 'green',
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  width: screenWidth * 0.43,
                  alignSelf: 'center'
                },
              ]}
              onPress={handleAddStudent}>

              <Text style={{ color: 'black', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Add Students</Text>
            </Pressable>
          </View>
          <View style={styles.fieldDivider}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'lightblue' : 'blue',
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  width: screenWidth * 0.43,
                  alignSelf: 'center'
                },
              ]}
              onPress={() => navigation.navigate('Students List')}>

              <Text style={{ color: 'black', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>View Students</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ViewData() {
  return <Vview />;
}

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="Registration Form" component={HomeScreen} />
      <Stack.Screen name="Students List" component={ViewData} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: screenHeight,
  },
  formContainer: {
    flexDirection: 'column',
    width: screenWidth * 0.9,
    height: screenHeight * 0.8,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'gray',
    marginTop: 20,
    borderRadius: 10
  },
  fieldDivider: {
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 10,
    marginBottom: -10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: screenHeight * 0.05
  },
});
