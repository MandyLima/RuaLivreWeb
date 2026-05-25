import styles from './MapWidget.module.css';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapaService from '../../services/mapaService';
import type { Camera, Alagamento } from '../../types/api.types';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const iconeCamera = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function getCorRisco(nivel: number): string {
  if (nivel >= 1.5) return '#E74C3C'; 
  if (nivel >= 1.0) return '#E67E22'; 
  if (nivel >= 0.5) return '#F1C40F'; 
  return '#2ECC71';                   
}

export default function MapWidget() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [alagamentos, setAlagamentos] = useState<Alagamento[]>([]);

useEffect(() => {
    mapaService.getCameras()
      .then(data => {
        console.log('Câmeras:', data); // ← adicione
        setCameras(data);
      })
      .catch(console.error);
      
    mapaService.getAlagamentosAtivos()
      .then(data => {
        console.log('Alagamentos:', data); // ← adicione
        setAlagamentos(data);
      })
      .catch(console.error);
}, []);

  return (
    <MapContainer
      center={[-24.0084, -46.4129]}
      zoom={13}
      className={styles.leafletContainer}
      zoomControl={false} 
    >
      {cameras.map((camera) => (
        <Marker
          key={camera.id}
          position={[camera.latitude, camera.longitude]}
          icon={iconeCamera}
        >
          <Popup>
            <strong>Câmera #{camera.id}</strong><br />
            Bairro: {camera.bairro}<br />
            Status: {camera.status}<br />
            Município: {camera.municipio}
          </Popup>
        </Marker>
      ))}

      {alagamentos.map((a) => (
        <Circle
          key={a.id}
          center={[a.latitude, a.longitude]}
          radius={200}
          pathOptions={{
            color: getCorRisco(a.nivel_agua),
            fillColor: getCorRisco(a.nivel_agua),
            fillOpacity: 0.5
          }}
        >
          <Popup>
            <strong>Alagamento #{a.id}</strong><br />
            Bairro: {a.bairro}<br />
            Nível da água: {a.nivel_agua}m<br />
            Confiança IA: {(a.confianca * 100).toFixed(0)}%<br />
            Status: {a.status}
          </Popup>
        </Circle>
      ))}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>

  );
}