import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Pressable } from 'react-native';
import { Input, Button, Text } from '@rneui/base';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Do homework', completed: false },
    { key: '2', description: 'Go to gym', completed: false },
    { key: '3', description: 'Study for test', completed: false }
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (key) => {
    setTasks(
      tasks.map((task) =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() === '') return;

    const newItem = {
      key: Date.now().toString(),
      description: newTask,
      completed: false
    };

    setTasks([...tasks, newItem]);
    setNewTask('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Pressable onPress={() => toggleTask(item.key)} style={styles.checkbox}>
        <Text style={styles.checkboxText}>
          {item.completed ? '☑' : '☐'}
        </Text>
      </Pressable>

      <Text style={item.completed ? styles.completed : styles.text}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Input
        placeholder="Enter task"
        value={newTask}
        onChangeText={setNewTask}
      />

      <Button title="Add" onPress={addTask} />

      <FlatList
        data={tasks}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 22,
  },
  text: {
    fontSize: 18,
  },
  completed: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});