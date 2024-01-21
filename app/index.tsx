import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, ScrollView, Stack, Text, YStack } from 'tamagui';

import db from '~/db';
import { RequestRoom, Room, roomTable } from '~/db/schema';

export default function Page() {
  const [rooms, setRooms] = useState<Room[]>();
  useEffect(() => {
    getRoomData();
  }, []);

  async function getRoomData() {
    const data = await db.select().from(roomTable);
    setRooms(data);
    console.log(data);
    
  }

  async function addRoom(params?: RequestRoom) {
    await db.insert(roomTable).values({
      name: 'Room 1',
      description: 'My room',
      type: 'bedroom',
    });
    getRoomData();
  }

  return (
    <ScrollView flex={1}>
      {rooms?.map((room) => (
        <Stack key={room.id}>
          <Text>{room.name}</Text>
        </Stack>
      ))}

      <Button theme="green"  onPress={() => addRoom()}>添加房间</Button>
    </ScrollView>
  );
}
