import { onValue, push, ref, serverTimestamp, set, update } from 'firebase/database';
import { ensureAnonymousUser, getRealtimeDatabase } from './firebase';

const roomPath = (roomId) => `rooms/${roomId}`;

export function subscribeToRoom(roomId, callback) {
  const database = getRealtimeDatabase();
  if (!database) return () => {};
  return onValue(ref(database, roomPath(roomId)), (snapshot) => callback(snapshot.val()));
}

export async function joinRoom(roomId, player) {
  const database = getRealtimeDatabase();
  if (!database) return false;
  const user = await ensureAnonymousUser();
  if (!user) return false;
  await update(ref(database, `${roomPath(roomId)}/players/${user.uid}`), { name: player.name, points: player.points ?? 0, joinedAt: serverTimestamp() });
  return user.uid;
}

export async function sendRoomMessage(roomId, author, body) {
  const database = getRealtimeDatabase();
  if (!database) return false;
  await set(push(ref(database, `${roomPath(roomId)}/messages`)), { author, body, createdAt: serverTimestamp() });
  return true;
}

export async function submitRoomScore(roomId, playerId, points) {
  const database = getRealtimeDatabase();
  if (!database) return false;
  await update(ref(database, `${roomPath(roomId)}/players/${playerId}`), { points, updatedAt: serverTimestamp() });
  return true;
}
