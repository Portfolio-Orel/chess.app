import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loading = (color) => (
  <ActivityIndicator animating={true} color={color ?? MD2Colors.red800} />
);

export default Loading;