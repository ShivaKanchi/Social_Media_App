import { getPosts } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));

describe('getPosts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of posts', async () => {
    const mockData = [{ title: 'Post 1' }, { title: 'Post 2' }];
    const mockSnapshot = {
      docs: mockData.map(data => ({
        data: () => data
      }))
    };
    const mockCol = { id: 'posts-collection' };
    collection.mockReturnValue(mockCol);
    getDocs.mockResolvedValue(mockSnapshot);

    const db = {}; // dummy db object
    const posts = await getPosts(db);

    expect(collection).toHaveBeenCalledWith(db, 'posts');
    expect(getDocs).toHaveBeenCalledWith(mockCol);
    expect(posts).toEqual(mockData);
  });

  it('should return an empty list if there are no posts', async () => {
    const mockSnapshot = {
      docs: []
    };
    collection.mockReturnValue({ id: 'empty-collection' });
    getDocs.mockResolvedValue(mockSnapshot);

    const db = {};
    const posts = await getPosts(db);

    expect(posts).toEqual([]);
  });

  it('should throw an error if getDocs fails', async () => {
    const mockError = new Error('Permission denied');
    getDocs.mockRejectedValue(mockError);

    const db = {};
    await expect(getPosts(db)).rejects.toThrow('Permission denied');
  });
});
