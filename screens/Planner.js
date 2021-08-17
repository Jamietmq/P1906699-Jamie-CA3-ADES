import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './../components/Task';
// import { StatusBar } from 'expo-status-bar';


// BELOW IS ALL FOR TASK PLANNER PAGE 
export default function App() {
  { /* State is for things that change often in app, so we dont need create new variable every time.*/ }
  const [task, setTask] = useState(); {/* To track the tasks created & function to set tasks*/ }
  const [taskItems, setTaskItems] = useState([]); {/* So that we can store the newly added tasks to task list */ }


  const handleAddTask = () => {
    Keyboard.dismiss(); {/* after typing in new item, keyboard will go back down */ }
    setTaskItems([...taskItems, task])
    setTask(null);
  }
  {/* use console.log(task); if you want to only log the task that we have stored in the state */ }

  {/* For removing that 1 item from the array and store the result back in itemsCopy */ }
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

         {/* Added this scroll view to enable scrolling when list gets longer than the page */}
  return (
    <View style={styles.container}>
       <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/*Today's Tasks */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}> Today's tasks: </Text>


        {/* Bottom is for all the tasks that will be created */}
        <View style={styles.items}>
          {/* This is where the tasks will go! after user created/added/submitted */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      </ScrollView>

      {/* Write a task function */}
      {/* - KeyboardAvoidingView = keyboard function and it will move nicely 
            with elements when it is activated. 
          - TextInput = write a task element for user to click and type in.
          - onChangeText = every time the text in here changes, it will grab the 
            text & set the task to be that text. 
          - value = task is for us to see the real time changes. 
          - TouchableOpacity = is a button to submit the task added.*/}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'}
          value={task} onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 260,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#ffe7ea',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontWeight: 'bold',
  },
});
