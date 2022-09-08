export const NEW_PLAYER = 'NEW_PLAYER';

export function addPlayer(payload) {
  return {
    type: 'NEW_PLAYER',
    payload,
  };
}
