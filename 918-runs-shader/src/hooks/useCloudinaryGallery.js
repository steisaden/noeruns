// Minimal stub to simulate Cloudinary gallery items
export default function useCloudinaryGallery() {
  // In a real app, fetch from Cloudinary API or a JSON manifest
  const items = [
    {
      id: 'demo1',
      url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/sample.jpg',
      thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_400/sample.jpg',
      playerName: 'Jane Doe',
      uploadDate: '2025-09-15T10:30:00.000Z',
    },
    {
      id: 'demo2',
      url: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/park.jpg',
      thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_400/park.jpg',
      playerName: 'Sam Lee',
      uploadDate: '2025-09-08T14:12:00.000Z',
    },
  ]
  return { items }
}
