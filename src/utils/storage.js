// LocalStorage persistence helpers for AR DRIVE

const FAVORITES_KEY = 'ar_drive_favorites';
const BOOKINGS_KEY = 'ar_drive_test_drive_bookings';

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['bmw-3-series', 'tesla-model-3']; // Default sample favorites
  } catch (e) {
    console.error('Failed to read favorites', e);
    return ['bmw-3-series', 'tesla-model-3'];
  }
}

export function saveFavorites(favIds) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favIds));
  } catch (e) {
    console.error('Failed to save favorites', e);
  }
}

export function toggleFavorite(carId) {
  const current = getFavorites();
  let updated;
  if (current.includes(carId)) {
    updated = current.filter(id => id !== carId);
  } else {
    updated = [...current, carId];
  }
  saveFavorites(updated);
  return updated;
}

export function isFavorite(carId) {
  const favs = getFavorites();
  return favs.includes(carId);
}

export function saveTestDriveBooking(bookingData) {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    const bookings = raw ? JSON.parse(raw) : [];
    const newBooking = {
      ...bookingData,
      id: 'BK-' + Date.now().toString().slice(-6),
      timestamp: new Date().toISOString(),
      status: 'Confirmed'
    };
    bookings.push(newBooking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    return newBooking;
  } catch (e) {
    console.error('Failed to save booking', e);
    return null;
  }
}
