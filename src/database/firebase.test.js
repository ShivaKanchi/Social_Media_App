// Mocking before requiring the module that uses them
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}), { virtual: true });

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signOut: jest.fn(() => Promise.resolve()),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}), { virtual: true });

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
}), { virtual: true });

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}), { virtual: true });

const { signOut } = require('firebase/auth');
const { logOutUser, auth } = require('./firebase');

describe('logOutUser', () => {
  it('should call signOut with the auth instance', async () => {
    await logOutUser();
    expect(signOut).toHaveBeenCalledWith(auth);
  });
});
