import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Text, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { DataTable } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const StudentsTable = () => {
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('students');
        if (value !== null) {
          setStudents(JSON.parse(value));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRowPress = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setShowModal(false);
  };

  return (
    <View style={[styles.container]}>
      <Text style={styles.headerText}>View Students</Text>
      <View style={styles.fromContainer}>
        <View>
          <DataTable style={[{ backgroundColor: 'white' }, styles.tableBorder]}>
            <DataTable.Header style={[styles.tableBorder, { backgroundColor: '#4e85bf' }]}>
              <DataTable.Title style={[{ justifyContent: 'center' }]}>
                <Text style={styles.tableTitle}>Data List</Text>
              </DataTable.Title>
            </DataTable.Header>
            <DataTable.Header style={[styles.tableBorder, { backgroundColor: '#DCDCDC' }]}>
              <DataTable.Title><Text style={styles.tableCollumnTitile}>#</Text></DataTable.Title>
              <DataTable.Title><Text style={styles.tableCollumnTitile}>Name</Text></DataTable.Title>
              <DataTable.Title><Text style={styles.tableCollumnTitile}>Course</Text></DataTable.Title>
              <DataTable.Title><Text style={styles.tableCollumnTitile}>Username</Text></DataTable.Title>
            </DataTable.Header >

            <ScrollView>
              {students.map((student, index) => (
                <DataTable.Row key={index} style={styles.tableBorder}
                  onPress={() => handleRowPress(student)}>
                  <DataTable.Cell>{student.ID}</DataTable.Cell>
                  <DataTable.Cell>{student.Data.Lastname}, {student.Data.Firstname}</DataTable.Cell>
                  <DataTable.Cell>{student.Data.Course}</DataTable.Cell>
                  <DataTable.Cell>{student.Data.Username}</DataTable.Cell>
                </DataTable.Row>

              ))}
            </ScrollView>

          </DataTable>
          {showModal && (
            <Modal
              isVisible={showModal}
              transparent={true}
              onBackdropPress={closeModal}
              animationIn="fadeInUp"
              animationOut="fadeOutDown"
              onModalHide={() => setSelectedStudent(null)}
            >
              {selectedStudent !== null && (
                <View style={styles.popupContainer}>
                  <Text style={styles.popupTitle}>Student Details</Text>

                  <View style={styles.popupContent}>
                    <Text>ID: {selectedStudent.ID}</Text>
                  </View>
                  <View style={styles.popupContent}>
                    <Text>Username: {selectedStudent.Data.Username}</Text>
                  </View>
                  <View style={styles.popupContent}>
                    <Text>Firstname: {selectedStudent.Data.Firstname}</Text>
                  </View>
                  <View style={styles.popupContent}>
                    <Text>Lastname: {selectedStudent.Data.Lastname}</Text>
                  </View>
                  <View style={styles.popupContent}>
                    <Text>Course: {selectedStudent.Data.Course}</Text>
                  </View>
                  <Button title='Close' style={styles.closeButton} onPress={closeModal} />
                </View>
              )}
            </Modal>
          )}

          <View style={{ marginTop: 30 }}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#8e8e8e' : '#4e85bf',
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  width: screenWidth * 0.43,
                  alignSelf: 'center'
                },
              ]}
              onPress={() => navigation.goBack()}>
              <Text style={{ color: 'black', fontWeight: '600', fontSize: 20, textAlign: 'center' }}>Add Students</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <StatusBar barStyle={'dark-content'} />
    </View>
  );
};

export default StudentsTable;

const styles = StyleSheet.create({

  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: 'orange',
    justifyContent: 'top',
    marginTop: 0,
    marginLeft: 0,
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight,
  },
  tableTitle: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  tableCollumnTitile: {
    textAlign: 'center',
    fontSize: 15,
    justifyContent: 'center'
  },
  tableBorder: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'gray',

  },
  fromContainer: {
    flex: .4,
    flexDirection: 'column',
    width: screenWidth * 0.85,
    height: screenHeight * 0.40,
    marginTop: 24,

  },
  popupContainer: {
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    alignSelf: 'center',
    marginVertical: screenWidth * 0.50,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popupContent: {
    fontSize: 25,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#4e85bf',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: screenHeight * 0.05
  },
});
