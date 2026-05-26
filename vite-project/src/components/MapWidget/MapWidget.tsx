import styles from './MapWidget.module.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { QRCodeSVG } from 'qrcode.react';
import mapaService from '../../services/mapaService';
import type { Camera, Alagamento } from '../../types/api.types';

interface ReporteForm {
  descricao: string;
  foto: File | null;
  latitude: number | null;
  longitude: number | null;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const posicaoPadrao: [number, number] = [-24.0084, -46.4129];
const zoomPadrao = 13;

function ResetView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function criarIconeCamera(status: string, classes: Record<string, string>): L.DivIcon {
  const statusLimpo = status?.toLowerCase() || 'ativa';
  const classeCor = classes[`iconeCamera_${statusLimpo}`] || classes.iconeCamera_ativa;

  return L.divIcon({
    className: '',
    html: `
      <div class="${classes.iconeCameraContainer} ${classeCor}">
        <svg class="${classes.iconeCameraSvg}" width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
        </svg>
      </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
  });
}

function criarIconeReporte(classes: Record<string, string>): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `
      <div class="${classes.iconeReporteContainer}">
        <svg class="${classes.iconeReporteSvg}" width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -36],
  });
}

function getCorRisco(nivel: number): string {
  if (nivel >= 1.5) return '#E74C3C';
  if (nivel >= 1.0) return '#E67E22';
  if (nivel >= 0.5) return '#F1C40F';
  return '#2ECC71';
}

function getNivelLabel(nivel: number): string {
  if (nivel >= 1.5) return 'Crítico';
  if (nivel >= 1.0) return 'Alto';
  if (nivel >= 0.5) return 'Médio';
  return 'Baixo';
}

function getNivelClasseStr(label: string): string {
  return label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function isMobile(): boolean {
  return window.innerWidth <= 768;
}

function MapClickHandler({
  ativo,
  onClique,
}: {
  ativo: boolean;
  onClique: (lat: number, lng: number) => void;
}) {
  const map = useMap();
  useEffect(() => {
    if (!ativo) return;
    const handler = (e: L.LeafletMouseEvent) => onClique(e.latlng.lat, e.latlng.lng);
    map.on('click', handler);
    return () => {
      map.off('click', handler);
    };
  }, [ativo, map, onClique]);
  return null;
}

interface MapWidgetProps {
  usuarioLogado?: boolean;
  urlBase?: string;
}

export default function MapWidget({
  usuarioLogado = false,
  urlBase = window.location.origin,
}: MapWidgetProps) {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [alagamentos, setAlagamentos] = useState<Alagamento[]>([]);

  const [acordeoes, setAcordeoes] = useState({
    cameras: true,
    alagamentos: true,
    reportes: true,
  });

  const [reportes, setReportes] = useState<
    Array<{ id: string; latitude: number; longitude: number; descricao: string }>
  >([]);
  const [modoReporte, setModoReporte] = useState(false);
  const [formReporte, setFormReporte] = useState<ReporteForm>({
    descricao: '',
    foto: null,
    latitude: null,
    longitude: null,
  });
  const [mostrarFormReporte, setMostrarFormReporte] = useState(false);
  const fotoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mapaService.getCameras().then(setCameras).catch(console.error);
    mapaService.getAlagamentosAtivos().then(setAlagamentos).catch(console.error);
  }, []);

  function toggleAcordeao(chave: keyof typeof acordeoes) {
    setAcordeoes(prev => ({ ...prev, [chave]: !prev[chave] }));
  }

  const handleCliqueMapa = useCallback(
    (lat: number, lng: number) => {
      if (!modoReporte || !usuarioLogado) return;
      setFormReporte(prev => ({ ...prev, latitude: lat, longitude: lng }));
      setMostrarFormReporte(true);
      setModoReporte(false);
    },
    [modoReporte, usuarioLogado]
  );

  function handleEnviarReporte() {
    if (!formReporte.latitude || !formReporte.longitude) return;
    const novo = {
      id: Date.now().toString(),
      latitude: formReporte.latitude,
      longitude: formReporte.longitude,
      descricao: formReporte.descricao,
    };
    setReportes(prev => [...prev, novo]);
    setFormReporte({ descricao: '', foto: null, latitude: null, longitude: null });
    setMostrarFormReporte(false);
  }

  const mobile = isMobile();

  return (
    <div className={styles.wrapper}>
      <MapContainer
        center={posicaoPadrao}
        zoom={zoomPadrao}
        className={`${styles.leafletContainer} ${modoReporte ? styles.cursorMira : ''}`}
        zoomControl={false}
      >
        <ResetView center={posicaoPadrao} zoom={zoomPadrao} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler ativo={modoReporte} onClique={handleCliqueMapa} />

        {cameras.map(camera => (
          <Marker
            key={camera.id}
            position={[camera.latitude, camera.longitude]}
            icon={criarIconeCamera(camera.status, styles)}
          >
            <Popup className={styles.popup}>
              {mobile ? (
                <div className={styles.popupConteudo}>
                  <p className={styles.popupTitulo}> Câmera #{camera.id}</p>
                  <p>
                    <span>Bairro</span> {camera.bairro}
                  </p>
                  <p>
                    <span>Status</span>
                    <span
                      className={`${styles.badge} ${
                        styles[`badge_${camera.status?.toLowerCase()}`]
                      }`}
                    >
                      {camera.status}
                    </span>
                  </p>
                  <p>
                    <span>Município</span> {camera.municipio}
                  </p>
                  {usuarioLogado && (
                    <button
                      className={styles.btnReportarPopup}
                      onClick={() => {
                        setFormReporte(prev => ({
                          ...prev,
                          latitude: camera.latitude,
                          longitude: camera.longitude,
                        }));
                        setMostrarFormReporte(true);
                      }}
                    >
                      + Reportar problema
                    </button>
                  )}
                </div>
              ) : (
                <div className={styles.popupConteudo}>
                  <p className={styles.popupTitulo}> Câmera #{camera.id}</p>
                  <p>
                    <span>Bairro</span> {camera.bairro}
                  </p>
                  <p>
                    <span>Status</span>
                    <span
                      className={`${styles.badge} ${
                        styles[`badge_${camera.status?.toLowerCase()}`]
                      }`}
                    >
                      {camera.status}
                    </span>
                  </p>
                  <p>
                    <span>Município</span> {camera.municipio}
                  </p>
                  <div className={styles.qrSection}>
                    <p className={styles.qrHint}> Escaneie para reportar pelo celular</p>
                    <QRCodeSVG
                      value={`${urlBase}/camera/${camera.id}/reportar`}
                      size={60}
                      bgColor="#ffffff"
                      fgColor="#1E3A5F"
                      level="M"
                      className={styles.qrCode}
                    />
                    <p className={styles.qrUrl}>
                      {urlBase}/camera/{camera.id}/reportar
                    </p>
                  </div>
                </div>
              )}
            </Popup>
          </Marker>
        ))}

        {alagamentos.map(a => (
          <Circle
            key={a.id}
            center={[a.latitude, a.longitude]}
            radius={200}
            pathOptions={{
              color: getCorRisco(a.nivel_agua),
              fillColor: getCorRisco(a.nivel_agua),
              fillOpacity: 0.45,
              weight: 2,
            }}
          >
            <Popup className={styles.popup}>
              <div className={styles.popupConteudo}>
                <p className={styles.popupTitulo}>Alagamento #{a.id}</p>
                <p>
                  <span>Bairro</span> {a.bairro}
                </p>
                <p>
                  <span>Nível</span> {a.nivel_agua}m
                </p>
                <p>
                  <span>Risco</span>
                  <span
                    className={`${styles.badge} ${
                      styles[`badgeRisco_${getNivelClasseStr(getNivelLabel(a.nivel_agua))}`]
                    }`}
                  >
                    {getNivelLabel(a.nivel_agua)}
                  </span>
                </p>
                <p>
                  <span>IA</span> {(a.confianca * 100).toFixed(0)}% confiança
                </p>
              </div>
            </Popup>
          </Circle>
        ))}

        {reportes.map(r => (
          <Marker
            key={r.id}
            position={[r.latitude, r.longitude]}
            icon={criarIconeReporte(styles)}
          >
            <Popup className={styles.popup}>
              <div className={styles.popupConteudo}>
                <p className={styles.popupTitulo}>Reporte de morador</p>
                <p>{r.descricao || 'Sem descrição'}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className={styles.legenda}>
        <p className={styles.legendaTitulo}>Legenda</p>

        <div className={styles.acordeaoBloco}>
          <button
            className={styles.acordeaoHeader}
            onClick={() => toggleAcordeao('cameras')}
          >
            <span>Câmeras</span>
            <span
              className={`${styles.chevron} ${acordeoes.cameras ? styles.chevronAberto : ''}`}
            >
              ›
            </span>
          </button>
          {acordeoes.cameras && (
            <div className={styles.acordeaoBody}>
              {[
                { chave: 'cameras_ativa', label: 'Ativa' },
                { chave: 'cameras_manutencao', label: 'Manutenção' },
                { chave: 'cameras_inativa', label: 'Inativa' },
              ].map(({ chave, label }) => (
                <div key={chave} className={styles.legendaItem}>
                  <span className={`${styles.bolinha} ${styles[`bolinha_${chave}`]}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.acordeaoBloco}>
          <button
            className={styles.acordeaoHeader}
            onClick={() => toggleAcordeao('alagamentos')}
          >
            <span>Alagamentos</span>
            <span
              className={`${styles.chevron} ${
                acordeoes.alagamentos ? styles.chevronAberto : ''
              }`}
            >
              ›
            </span>
          </button>
          {acordeoes.alagamentos && (
            <div className={styles.acordeaoBody}>
              {[
                { chave: 'alagamentos_critico', label: 'Crítico' },
                { chave: 'alagamentos_alto', label: 'Alto' },
                { chave: 'alagamentos_medio', label: 'Médio' },
                { chave: 'alagamentos_baixo', label: 'Baixo' },
              ].map(({ chave, label }) => (
                <div key={chave} className={styles.legendaItem}>
                  <span className={`${styles.bolinha} ${styles[`bolinha_${chave}`]}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.acordeaoBloco}>
          <button
            className={styles.acordeaoHeader}
            onClick={() => toggleAcordeao('reportes')}
          >
            <span>Reportes</span>
            <span
              className={`${styles.chevron} ${acordeoes.reportes ? styles.chevronAberto : ''}`}
            >
              ›
            </span>
          </button>
          {acordeoes.reportes && (
            <div className={styles.acordeaoBody}>
              <div className={styles.legendaItem}>
                <span className={`${styles.bolinha} ${styles.bolinha_reportes}`} />
                <span>Reporte de morador</span>
              </div>

              {usuarioLogado ? (
                <button
                  className={`${styles.btnReportar} ${
                    modoReporte ? styles.btnReportarAtivo : ''
                  }`}
                  onClick={() => setModoReporte(prev => !prev)}
                >
                  {modoReporte ? '✕ Cancelar' : '+ Adicionar reporte'}
                </button>
              ) : (
                <p className={styles.avisoLogin}>Faça login para reportar</p>
              )}

              {modoReporte && (
                <p className={styles.dicaReporte}>Clique no mapa para marcar o local</p>
              )}
            </div>
          )}
        </div>
      </div>

      {mostrarFormReporte && usuarioLogado && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitulo}>Novo Reporte</h3>
            {formReporte.latitude && (
              <p className={styles.modalCoordenadas}>
                📍 {formReporte.latitude.toFixed(5)},{' '}
                {formReporte.longitude?.toFixed(5)}
              </p>
            )}
            <textarea
              className={styles.modalTextarea}
              placeholder="Descreva o problema (ex: câmera com imagem ruim, alagamento na rua...)"
              value={formReporte.descricao}
              onChange={e =>
                setFormReporte(prev => ({ ...prev, descricao: e.target.value }))
              }
              rows={4}
            />
            <label
              className={styles.modalFotoLabel}
              onClick={() => fotoRef.current?.click()}
            >
              {' '}
              {formReporte.foto ? formReporte.foto.name : 'Adicionar foto (opcional)'}
            </label>
            <input
              ref={fotoRef}
              type="file"
              accept="image/*"
              capture="environment"
              className={styles.inputEscondido}
              onChange={e =>
                setFormReporte(prev => ({
                  ...prev,
                  foto: e.target.files?.[0] ?? null,
                }))
              }
            />
            <div className={styles.modalBotoes}>
              <button
                className={styles.modalBtnCancelar}
                onClick={() => {
                  setMostrarFormReporte(false);
                  setModoReporte(false);
                }}
              >
                Cancelar
              </button>
              <button className={styles.modalBtnEnviar} onClick={handleEnviarReporte}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}