import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapWidget.module.css';

export default function MapWidget() {
  return (
    <MapContainer
      center={[-24.0084, -46.4129]}
      zoom={13}
      className={styles.leafletContainer}
      zoomControl={false} 
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}