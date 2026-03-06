import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const createStyles = (colors: any) => StyleSheet.create({
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
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden', 
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: colors.cardbg,
  },
  // Stripe Logic
  stripesContainer: {
    position: 'absolute',
    top: -width, 
    left: -width / 2,
    width: width * 2,
    height: width * 2,
    flexDirection: 'row',
    transform: [{ rotate: '45deg' }], 
    backgroundColor: colors.cardbg,
  },
  stripe: {
    width: 25,
    height: '100%',
    backgroundColor: colors.button, 
    marginRight: 25,
    opacity: 0.15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  removeButton: {
    backgroundColor: 'rgba(77, 54, 130, 0.79)', 
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.oppositetext,
    fontWeight: '600',
    textAlign: 'center',
  },
});