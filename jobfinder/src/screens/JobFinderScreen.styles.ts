import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: colors.cardbg,
  },

  card: {
    backgroundColor: colors.cardbg,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden', 
    position: 'relative',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  bgCircleOuter: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    top: -40,
    left: -60,
  },
  bgCircleInner: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: 0,
    left: -30,
  },
  stripesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'stretch',
    opacity: 0.06,
    pointerEvents: 'none',
  },
  stripe: {
    width: 8,
    marginRight: 8,
    backgroundColor: '#000',
    transform: [{ rotate: '-12deg' }],
    opacity: 0.06,
  },
  // ----------------------------
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', 
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8, 
  },
  saveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  savedButton: {
    backgroundColor: 'gray',
  },
  applyButton: {
    backgroundColor: '#fff', 
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  applyText: {
    color: '#4E9F70',
    fontWeight: 'bold',
    fontSize: 12,
  }
});