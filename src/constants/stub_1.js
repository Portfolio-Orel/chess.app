const gameFormats = [
  {
    id: "11ea2674-6416-48a6-92ba-54dd09bd9196",
    name: "Swiss",
    description: null,
    is_active: true,
    created_at: "2023-03-31T12:04:17.355Z",
    updated_at: "2023-03-31T12:04:17.355Z",
  },
  {
    id: "be9af93a-0015-4dfb-bbd6-0bc229ac0927",
    name: "Scheveningen",
    description: null,
    is_active: true,
    created_at: "2023-03-31T12:04:17.355Z",
    updated_at: "2023-03-31T12:04:17.355Z",
  },
  {
    id: "af765c60-c664-4936-8913-d97decbb86e2",
    name: "Group Duel",
    description: null,
    is_active: true,
    created_at: "2023-03-31T12:04:17.355Z",
    updated_at: "2023-03-31T12:04:17.355Z",
  },
  {
    id: "16aa25c1-179f-46a9-8d60-63d6eda23880",
    name: "Weinstein",
    description: null,
    is_active: true,
    created_at: "2023-03-31T12:04:17.355Z",
    updated_at: "2023-03-31T12:04:17.355Z",
  },
  {
    id: "45a0baaf-5820-4bbd-88b7-4da0e7c1a706",
    name: "Levin",
    description: null,
    is_active: true,
    created_at: "2023-03-31T12:04:17.355Z",
    updated_at: "2023-03-31T12:04:17.355Z",
  },
];

const games = [
  {
    id: "8126a0bc-46cd-4daa-bc79-d5338030383f",
    time_start_min: 1,
    increment_before_time_control_sec: 0,
    moves_num_to_time_control: 0,
    time_bump_after_time_control_min: 0,
    increment_after_time_control_sec: 0,
    is_active: true,
    type: "Bullet",
  },
  {
    id: "a0423ba2-23f5-4854-9834-af2c4dcb0b49",
    time_start_min: 1,
    increment_before_time_control_sec: 1,
    moves_num_to_time_control: 0,
    time_bump_after_time_control_min: 0,
    increment_after_time_control_sec: 0,
    is_active: true,
    type: "Bullet",
  },
  {
    id: "83e74117-a387-400c-a543-b8536f2c9305",
    time_start_min: 3,
    increment_before_time_control_sec: 0,
    moves_num_to_time_control: 0,
    time_bump_after_time_control_min: 0,
    increment_after_time_control_sec: 0,
    is_active: true,
    type: "Blitz",
  },
  {
    id: "693024f7-ea23-426b-91b4-7c723cd76270",
    time_start_min: 5,
    increment_before_time_control_sec: 0,
    moves_num_to_time_control: 0,
    time_bump_after_time_control_min: 0,
    increment_after_time_control_sec: 0,
    is_active: true,
    type: "Blitz",
  },
  {
    id: "8f61035d-5973-45e6-bb35-c07979e866a5",
    time_start_min: 10,
    increment_before_time_control_sec: 0,
    moves_num_to_time_control: 0,
    time_bump_after_time_control_min: 0,
    increment_after_time_control_sec: 0,
    is_active: true,
    type: "Rapid",
  },
  {
    id: "00483317-b104-41bd-b86d-a96cedd85256",
    time_start_min: 60,
    increment_before_time_control_sec: 30,
    moves_num_to_time_control: 0,
    time_bump_after_time_control_min: 0,
    increment_after_time_control_sec: 0,
    is_active: true,
    type: "Classical",
  },
  {
    id: "201f8e7e-fb78-46f3-b940-a73d6ef73144",
    time_start_min: 3,
    increment_before_time_control_sec: 2,
    moves_num_to_time_control: 0,
    time_bump_after_time_control_min: 0,
    increment_after_time_control_sec: 0,
    is_active: true,
    type: "Blitz",
  },
  {
    id: "1500456c-76f4-4e59-bee2-e71c2975fbfb",
    time_start_min: 5,
    increment_before_time_control_sec: 3,
    moves_num_to_time_control: 0,
    time_bump_after_time_control_min: 0,
    increment_after_time_control_sec: 0,
    is_active: true,
    type: "Blitz",
  },
  {
    id: "56dd6765-e196-4bf0-a981-ecb6e6bb2842",
    time_start_min: 10,
    increment_before_time_control_sec: 5,
    moves_num_to_time_control: 0,
    time_bump_after_time_control_min: 0,
    increment_after_time_control_sec: 0,
    is_active: true,
    type: "Rapid",
  },
];

// Event example:
/*
  {
    id: "88a714b6-c966-4e26-9ce3-2389ba7ed8d1",
    date: "2023-03-31T21:12:43.047Z",
    name: "Orel1",
    description: "Description1",
    price: 23.0,
    currency: "ILS",
    round_number: 1,
    game_format_id: "be9af93a-0015-4dfb-bbd6-0bc229ac0927",
    is_rating_israel: true,
    is_rating_fide: false,
    is_active: true,
    created_at: "2023-03-31T21:14:22.844Z",
    updated_at: "2023-03-31T21:14:22.844Z",
    game_id: "8126a0bc-46cd-4daa-bc79-d5338030383f",
  },
  
*/
// This const defines a list of events that have a corresponding game in the games stub and a game format in the gameFormats stub.
// The name, description, price and dates are random.
// 5 events:

const events = [];

for (let i = 0; i < 20; i++) {
  const game = games[Math.floor(Math.random() * games.length)];
  const gameFormat = gameFormats[Math.floor(Math.random() * gameFormats.length)];
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 30));
  const event = {
    id:`${i + 1}`,
    name: `Event ${i + 1}`,
    description: `Description for event ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 1,
    currency: 'ILS',
    date: date.toISOString(),
    game_id: game.id,
    game_format_id: gameFormat.id,
    is_rating_israel: true,
    is_rating_fide: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  events.push(event);
}


const StubData = {
  events,
  games,
  gameFormats,
};

export default StubData;
