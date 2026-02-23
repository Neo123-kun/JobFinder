import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 6,
  },
  applyButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
  },
});